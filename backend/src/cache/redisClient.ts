import Redis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

export const redisClient = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT)
});