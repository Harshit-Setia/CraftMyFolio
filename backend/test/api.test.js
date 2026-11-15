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
