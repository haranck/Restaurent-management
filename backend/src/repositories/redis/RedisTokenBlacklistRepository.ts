import { ITokenBlacklistRepository } from "./IRedisTokenBlacklistRepository";
import { injectable } from "tsyringe";
import { redisClient } from "../../cache/redisClient";

@injectable()
export class RedisTokenBlacklistRepository implements ITokenBlacklistRepository {
  async blacklist(token: string, expiresAfterSeconds: number): Promise<void> {
    await redisClient.set(
      `blacklist:${token}`,
      "true",
      "EX",
      expiresAfterSeconds
    );
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await redisClient.get(`blacklist:${token}`)
    return result === 'true'
  }
} 
