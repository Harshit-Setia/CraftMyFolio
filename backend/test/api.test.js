import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "test-secret";
process.env.CORS_ORIGIN = "http://localhost";
process.env.REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let mongo, server, base, redisClient, User, hasRedis;

const request = async (path, { method = "GET", headers = {}, body } = {}) => {
  const res = await fetch(base + path, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body && JSON.stringify(body),
  });
  return { status: res.status, body: await res.json().catch(() => null) };
};

const newUser = (overrides = {}) => ({
  name: "Test User",
  email: `u${Math.random().toString(36).slice(2)}@example.com`,
  password: "password123",
  dob: "2000-01-01",
  address: "Some Street",
  phone: "1234567890",
  ...overrides,
});

const signUpAndLogin = async (overrides) => {
  const user = newUser(overrides);
  await request("/signup", { method: "POST", body: user });
  const login = await request("/signin", {
    method: "POST",
    body: { email: user.email, password: user.password },
  });
  return { user, auth: { Authorization: `Bearer ${login.body.data.token}` } };
};

before(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MongoDB_URI = mongo.getUri();
  const { app } = await import("../src/app.js");
  redisClient = (await import("../src/config/redisClient.js")).default;
  ({ User } = await import("../src/models/userModel.js"));
  await mongoose.connect(process.env.MongoDB_URI);
  await new Promise((resolve) => setTimeout(resolve, 500));
  hasRedis = redisClient.isReady;
  server = app.listen(0);
  base = `http://localhost:${server.address().port}`;
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongo?.stop();
  if (redisClient?.isOpen) redisClient.destroy();
});

test("signup ignores privileged fields", async () => {
  const user = newUser({
    isAdmin: true,
    folio_id: "507f1f77bcf86cd799439011",
    skills: ["node"],
  });
  const res = await request("/signup", { method: "POST", body: user });
  assert.equal(res.status, 201);

  const saved = await User.findOne({ email: user.email }).lean();
  assert.equal(saved.isAdmin, false);
  assert.equal(saved.folio_id, undefined);
  assert.deepEqual(saved.skills, ["node"]);
});

test("signup rejects missing required fields and duplicate emails", async () => {
  const missing = await request("/signup", {
    method: "POST",
    body: { ...newUser(), phone: "" },
  });
  assert.equal(missing.status, 400);

  const user = newUser();
  await request("/signup", { method: "POST", body: user });
  const duplicate = await request("/signup", { method: "POST", body: user });
  assert.equal(duplicate.status, 409);
});

test("signin rejects wrong passwords", async () => {
  const user = newUser();
  await request("/signup", { method: "POST", body: user });
  const res = await request("/signin", {
    method: "POST",
    body: { email: user.email, password: "wrong-password" },
  });
  assert.equal(res.status, 401);
});

test("protected routes require a token", async () => {
  assert.equal((await request("/me")).status, 401);
  assert.equal((await request("/folio/me")).status, 401);
});

test("public portfolio hides private fields", async () => {
  const { user, auth } = await signUpAndLogin({ isAdmin: true });
  const slug = `pub-${Date.now()}`;
  await request("/folio", {
    method: "POST",
    headers: auth,
    body: { slug, template_id: "classic" },
  });

  const res = await request(`/folio/${slug}`);
  assert.equal(res.status, 200);
  const owner = res.body.user_id;
  for (const hidden of ["dob", "isAdmin", "folio_id", "password"]) {
    assert.equal(hidden in owner, false, `${hidden} must not be public`);
  }
  assert.equal(owner.name, user.name);
  assert.equal(owner.email, user.email);
});

test("slug availability and duplicate slugs", async () => {
  const { auth } = await signUpAndLogin();
  const slug = `slug-${Date.now()}`;
  assert.equal((await request(`/folio/check-slug/${slug}`)).body.available, true);

  await request("/folio", {
    method: "POST",
    headers: auth,
    body: { slug, template_id: "classic" },
  });
  assert.equal((await request(`/folio/check-slug/${slug}`)).body.available, false);

  const other = await signUpAndLogin();
  const clash = await request("/folio", {
    method: "POST",
    headers: other.auth,
    body: { slug, template_id: "classic" },
  });
  assert.equal(clash.status, 400);
});

test("deleted portfolio is gone immediately and updates show up", async () => {
  const { auth } = await signUpAndLogin();
  const slug = `del-${Date.now()}`;
  await request("/folio", {
    method: "POST",
    headers: auth,
    body: { slug, template_id: "classic" },
  });

  assert.equal((await request(`/folio/${slug}`)).status, 200);
  await request("/me", { method: "PATCH", headers: auth, body: { bio: "fresh bio" } });
  assert.equal((await request(`/folio/${slug}`)).body.user_id.bio, "fresh bio");

  const del = await request("/folio/me", { method: "DELETE", headers: auth });
  assert.equal(del.status, 200);
  assert.equal((await request(`/folio/${slug}`)).status, 404);
});

test("cache is invalidated on update and delete", async (t) => {
  if (!hasRedis) return t.skip("Redis not available");
  const { auth } = await signUpAndLogin();
  const slug = `cache-${Date.now()}`;
  await request("/folio", {
    method: "POST",
    headers: auth,
    body: { slug, template_id: "classic" },
  });

  await request(`/folio/${slug}`);
  assert.notEqual(await redisClient.get(`folio:v2:${slug}`), null);

  await request("/me", { method: "PATCH", headers: auth, body: { bio: "changed" } });
  assert.equal(await redisClient.get(`folio:v2:${slug}`), null);

  await request(`/folio/${slug}`);
  await request("/folio/me", { method: "DELETE", headers: auth });
  assert.equal(await redisClient.get(`folio:v2:${slug}`), null);
});

test("links must be http(s) URLs", async () => {
  const bad = await request("/signup", {
    method: "POST",
    body: newUser({ social: [{ platform: "x", url: "javascript:alert(1)" }] }),
  });
  assert.equal(bad.status, 400);

  const { auth } = await signUpAndLogin();
  const unsafeProject = await request("/me", {
    method: "PATCH",
    headers: auth,
    body: { projects: [{ title: "p", github: "javascript:alert(1)" }] },
  });
  assert.equal(unsafeProject.status, 400);

  const ok = await request("/me", {
    method: "PATCH",
    headers: auth,
    body: {
      resume: "https://example.com/cv.pdf",
      social: [{ platform: "GitHub", url: "https://github.com/example" }],
      projects: [{ title: "p", github: "https://github.com/example/p", deployed: "http://example.com" }],
    },
  });
  assert.equal(ok.status, 200);
});

const BROWSER = { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AnalyticsTest/1.0" };
const visitor = (ip, extra = {}) => ({ ...BROWSER, "X-Forwarded-For": ip, ...extra });

const createPublicFolio = async (prefix) => {
  const owner = await signUpAndLogin();
  const slug = `${prefix}-${Date.now()}`;
  await request("/folio", { method: "POST", headers: owner.auth, body: { slug, template_id: "Magazine" } });
  return { ...owner, slug };
};

const trackView = (slug, ip, body = {}, extra = {}) =>
  request(`/folio/${slug}/event`, {
    method: "POST",
    headers: visitor(ip, extra),
    body: { type: "view", page: "home", ...body },
  });

const analytics = async (auth, days) =>
  (await request(`/folio/me/analytics${days ? `?days=${days}` : ""}`, { headers: auth })).body.data;

test("analytics counts views and de-duplicates unique visitors", async () => {
  const { slug, auth } = await createPublicFolio("an-views");

  assert.equal((await trackView(slug, "10.0.0.1", { initial: true })).status, 204);
  await trackView(slug, "10.0.0.1", { page: "projects" });
  await trackView(slug, "10.0.0.2", { initial: true });

  const data = await analytics(auth);
  assert.equal(data.totals.views, 3);
  assert.equal(data.totals.uniques, 2);
  assert.equal(data.series.at(-1).views, 3);
  assert.deepEqual(
    data.pages.map((p) => [p.key, p.count]).sort(),
    [["home", 2], ["projects", 1]],
  );
  assert.equal(data.devices.find((d) => d.key === "desktop").count, 3);
});

test("analytics records external referrers once and ignores the site itself", async () => {
  const { slug, auth } = await createPublicFolio("an-ref");

  await trackView(slug, "10.1.0.1", { initial: true, referrer: "https://www.news.ycombinator.com/item?id=1" });
  await trackView(slug, "10.1.0.2", { initial: true, referrer: "https://t.co/abc" });
  await trackView(slug, "10.1.0.3", { initial: true, referrer: "http://localhost:5173/dashboard" }, { Origin: "http://localhost:5173" });
  await trackView(slug, "10.1.0.4", { initial: false, referrer: "https://ignored.example/" });

  const referrers = Object.fromEntries((await analytics(auth)).referrers.map((r) => [r.key, r.count]));
  assert.equal(referrers["news.ycombinator.com"], 1);
  assert.equal(referrers["t.co"], 1);
  assert.equal(referrers.direct, 1);
  assert.equal(referrers["ignored.example"], undefined);
});

test("analytics records link clicks by kind and label", async () => {
  const { slug, auth } = await createPublicFolio("an-click");

  for (const body of [
    { kind: "social", label: "GitHub" },
    { kind: "social", label: "GitHub" },
    { kind: "project", label: "Pulse (code)" },
    { kind: "bogus", label: "ignored" },
  ]) {
    await request(`/folio/${slug}/event`, { method: "POST", headers: visitor("10.2.0.1"), body: { type: "click", ...body } });
  }

  const data = await analytics(auth);
  assert.equal(data.totals.clicks, 3);
  assert.deepEqual(data.clicks[0], { kind: "social", label: "GitHub", count: 2 });
  assert.ok(data.clicks.some((c) => c.kind === "project" && c.label === "Pulse (code)"));
});

test("analytics ignores bots, Do Not Track, the owner and unknown portfolios", async () => {
  const { slug, auth } = await createPublicFolio("an-skip");

  await trackView(slug, "10.3.0.1", {}, { "User-Agent": "Googlebot/2.1" });
  await trackView(slug, "10.3.0.2", {}, { DNT: "1" });
  await trackView(slug, "10.3.0.3", {}, { "Sec-GPC": "1" });
  await trackView(slug, "10.3.0.4", {}, auth);
  assert.equal((await trackView("no-such-portfolio", "10.3.0.5")).status, 204);
  assert.equal(
    (await request(`/folio/${slug}/event`, { method: "POST", headers: visitor("10.3.0.6"), body: { type: "nonsense" } })).status,
    204,
  );

  const data = await analytics(auth);
  assert.equal(data.totals.views, 0);
  assert.equal(data.totals.uniques, 0);
});

test("analytics endpoint requires auth, a portfolio, and clamps the range", async () => {
  assert.equal((await request("/folio/me/analytics")).status, 401);

  const noFolio = await signUpAndLogin();
  assert.equal((await request("/folio/me/analytics", { headers: noFolio.auth })).status, 404);

  const { auth } = await createPublicFolio("an-range");
  assert.equal((await analytics(auth, 7)).series.length, 7);
  assert.equal((await analytics(auth, 9999)).series.length, 90);
  assert.equal((await analytics(auth, "abc")).series.length, 30);
});

test("analytics purge removes stored visitor hashes from past days", async () => {
  const { FolioStats } = await import("../src/models/folioStatsModel.js");
  const { purgeVisitorHashes } = await import("../src/controllers/analyticsController.js");
  const { slug } = await createPublicFolio("an-purge");
  await trackView(slug, "10.4.0.1");

  const { Folio } = await import("../src/models/folioModel.js");
  const folio = await Folio.findOne({ slug }).lean();
  await FolioStats.collection.insertOne({ folio_id: folio._id, date: "2000-01-01", views: 1, uniques: 1, visitors: ["abc"] });

  await purgeVisitorHashes();

  const old = await FolioStats.findOne({ folio_id: folio._id, date: "2000-01-01" }).select("+visitors").lean();
  const today = await FolioStats.findOne({ folio_id: folio._id, date: { $ne: "2000-01-01" } }).select("+visitors").lean();
  assert.equal(old.visitors, undefined);
  assert.equal(old.uniques, 1);
  assert.equal(today.visitors.length, 1);
});

test("deleting a portfolio deletes its analytics", async () => {
  const { FolioStats } = await import("../src/models/folioStatsModel.js");
  const { Folio } = await import("../src/models/folioModel.js");
  const { slug, auth } = await createPublicFolio("an-del");
  await trackView(slug, "10.5.0.1");
  const folio = await Folio.findOne({ slug }).lean();
  assert.equal(await FolioStats.countDocuments({ folio_id: folio._id }), 1);

  await request("/folio/me", { method: "DELETE", headers: auth });
  assert.equal(await FolioStats.countDocuments({ folio_id: folio._id }), 0);
});
