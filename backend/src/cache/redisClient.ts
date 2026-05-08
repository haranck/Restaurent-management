import Redis from "ioredis";
import { ENV } from "../config/env.config";

export const redisClient = new Redis(ENV.REDIS_URL);