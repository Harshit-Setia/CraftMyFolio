import { Folio } from "../models/folioModel.js";
import { FolioStats } from "../models/folioStatsModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  PAGE_KEYS,
  CLICK_KINDS,
  allowEvent,
  deviceType,
  isBot,
  readKey,
  referrerHost,
  safeKey,
  todayKey,
  viewerUserId,
  visitorHash,
} from "../utils/analytics.js";

const stats = () => FolioStats.collection;

const incrementDay = async (folioId, date, increments) => {
  const run = () =>
    stats().updateOne(
      { folio_id: folioId, date },
      { $inc: increments, $setOnInsert: { uniques: 0 } },
      { upsert: true },
    );
  try {
    await run();
  } catch (error) {
    if (error.code === 11000) await run();
    else throw error;
  }
};

export const recordEvent = asyncHandler(async (req, res) => {
  const done = () => res.status(204).end();

  if (!allowEvent(req.ip)) return res.status(429).end();
  if (req.get("dnt") === "1" || req.get("sec-gpc") === "1") return done();

  const userAgent = req.get("user-agent");
  if (isBot(userAgent)) return done();

  const { type, page, kind, label, initial, referrer } = req.body || {};
  if (type !== "view" && type !== "click") return done();

  const folio = await Folio.findOne({ slug: String(req.params.slug).toLowerCase() }, "_id user_id").lean();
  if (!folio) return done();
  if (viewerUserId(req) === String(folio.user_id)) return done();

  const date = todayKey();

  if (type === "view") {
    const increments = {
      views: 1,
      [`pages.${PAGE_KEYS.includes(page) ? page : "home"}`]: 1,
      [`devices.${deviceType(userAgent)}`]: 1,
    };
    if (initial === true) {
      const host = typeof referrer === "string" ? referrerHost(referrer, req.get("origin")) : null;
      increments[`referrers.${safeKey(host || "direct")}`] = 1;
    }
    await incrementDay(folio._id, date, increments);

    const hash = visitorHash(req.ip, userAgent, date);
    await stats().updateOne(
      { folio_id: folio._id, date, visitors: { $ne: hash } },
      { $inc: { uniques: 1 }, $push: { visitors: hash } },
    );
    return done();
  }

  if (!CLICK_KINDS.includes(kind)) return done();
  const text = typeof label === "string" && label.trim() ? label : kind;
  await incrementDay(folio._id, date, { [`clicks.${safeKey(`${kind}:${text}`)}`]: 1 });
  return done();
});

const sortedCounts = (totals) =>
  Object.entries(totals)
    .map(([key, count]) => ({ key: readKey(key), count }))
    .sort((a, b) => b.count - a.count);

const addInto = (target, source = {}) => {
  for (const [key, value] of Object.entries(source)) target[key] = (target[key] || 0) + value;
};

export const getMyAnalytics = asyncHandler(async (req, res) => {
  const folio = await Folio.findOne({ user_id: req.user._id }, "_id slug").lean();
  if (!folio) {
    res.status(404);
    throw new Error("You do not have a folio yet.");
  }

  const requested = parseInt(req.query.days, 10);
  const days = Math.min(Math.max(Number.isNaN(requested) ? 30 : requested, 1), 90);

  const end = new Date();
  const dates = Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
    return todayKey(d);
  });

  const docs = await FolioStats.find({ folio_id: folio._id, date: { $gte: dates[0] } }).lean();
  const byDate = new Map(docs.map((doc) => [doc.date, doc]));

  const pages = {};
  const referrers = {};
  const devices = {};
  const clicks = {};
  const series = dates.map((date) => {
    const doc = byDate.get(date);
    addInto(pages, doc?.pages);
    addInto(referrers, doc?.referrers);
    addInto(devices, doc?.devices);
    addInto(clicks, doc?.clicks);
    return { date, views: doc?.views || 0, uniques: doc?.uniques || 0 };
  });

  res.status(200).json({
    data: {
      slug: folio.slug,
      range: { from: dates[0], to: dates[dates.length - 1], days },
      totals: {
        views: series.reduce((sum, d) => sum + d.views, 0),
        uniques: series.reduce((sum, d) => sum + d.uniques, 0),
        clicks: Object.values(clicks).reduce((sum, n) => sum + n, 0),
      },
      series,
      pages: sortedCounts(pages),
      referrers: sortedCounts(referrers),
      devices: sortedCounts(devices),
      clicks: sortedCounts(clicks).map(({ key, count }) => {
        const [kind, ...rest] = key.split(":");
        return { kind, label: rest.join(":"), count };
      }),
    },
  });
});

export const purgeVisitorHashes = () =>
  stats().updateMany(
    { date: { $lt: todayKey() }, visitors: { $exists: true } },
    { $unset: { visitors: "" } },
  );
