import redisClient from "../config/redisClient.js";

const TTL_SECONDS = 3600;

const cacheKey = (slug) => `folio:v3:${String(slug).toLowerCase()}`;

export const getCachedFolio = async (slug) => {
  if (!redisClient.isReady) return null;
  try {
    const cached = await redisClient.get(cacheKey(slug));
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    console.error("Redis get failed, falling back to database:", err.message);
    return null;
  }
};

export const setCachedFolio = async (slug, folio) => {
  if (!redisClient.isReady) return;
  try {
    await redisClient.setEx(cacheKey(slug), TTL_SECONDS, JSON.stringify(folio));
  } catch (err) {
    console.error("Redis set failed:", err.message);
  }
};

export const invalidateFolioCache = async (slug) => {
  if (!slug || !redisClient.isReady) return;
  try {
    await redisClient.del(cacheKey(slug));
  } catch (err) {
    console.error("Redis delete failed:", err.message);
  }
};
