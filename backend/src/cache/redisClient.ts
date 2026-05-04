import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;
export const redisClient = new Redis(REDIS_URL || "redis://localhost:6379");