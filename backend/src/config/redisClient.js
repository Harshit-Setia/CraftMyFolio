import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  disableOfflineQueue: true,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 200, 5000),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err.message));
redisClient.on("ready", () => console.log("Connected to Redis Cache! 🚀"));

redisClient.connect().catch((err) => {
  console.error("Redis initial connection failed, continuing without cache:", err.message);
});

export default redisClient;
