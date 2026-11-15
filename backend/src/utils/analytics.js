import crypto from "crypto";
import jwt from "jsonwebtoken";

export const PAGE_KEYS = ["home", "about", "projects", "experience", "contact"];
export const CLICK_KINDS = ["social", "project", "resume", "email", "phone", "link"];

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|curl|wget|python-requests|httpclient|monitor|pingdom/i;

export const isBot = (userAgent) => !userAgent || BOT_PATTERN.test(userAgent);

export const todayKey = (date = new Date()) => date.toISOString().slice(0, 10);

export const deviceType = (userAgent) => {
  if (/ipad|tablet/i.test(userAgent)) return "tablet";
  if (/mobi|android|iphone|ipod/i.test(userAgent)) return "mobile";
  return "desktop";
};

export const visitorHash = (ip, userAgent, date = todayKey()) => {
  const salt = process.env.ANALYTICS_SALT || process.env.JWT_SECRET || "cmf";
  return crypto
    .createHash("sha256")
    .update(`${salt}:${date}:${ip}:${userAgent}`)
    .digest("hex")
    .slice(0, 16);
};

export const safeKey = (value) =>
  String(value)
    .replace(/[\u0000-\u001f]/g, "")
    .trim()
    .slice(0, 80)
    .replace(/\./g, "%2E")
    .replace(/\$/g, "%24");

export const readKey = (key) => String(key).replace(/%2E/g, ".").replace(/%24/g, "$");

export const referrerHost = (referrer, originHeader) => {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    const own = originHeader ? new URL(originHeader).hostname.replace(/^www\./, "").toLowerCase() : null;
    if (!host || host === own) return null;
    return host;
  } catch {
    return null;
  }
};

export const viewerUserId = (req) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  try {
    return String(jwt.verify(header.split(" ")[1], process.env.JWT_SECRET).id);
  } catch {
    return null;
  }
};

const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 120;
const hits = new Map();

export const allowEvent = (ip, now = Date.now()) => {
  const entry = hits.get(ip);
  if (!entry || entry.reset <= now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [key, value] of hits) if (value.reset <= now) hits.delete(key);
    }
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_EVENTS_PER_WINDOW;
};
