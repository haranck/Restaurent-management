import { inject, injectable } from "tsyringe";
import { ILogoutUserService } from "./ILogoutUserService";
import { ITokenBlacklistRepository } from "../../../repositories/redis/IRedisTokenBlacklistRepository";
import { IJwtService } from "../../jwt/IJwtServices";
import { UnauthorizedError } from "../../../errors";
import { ERROR_MESSAGES } from "../../../constants/messages.constant";

@injectable()
export class LogoutUserService implements ILogoutUserService {
    constructor(
        @inject("ITokenBlacklistRepository") private readonly _blacklistRepository: ITokenBlacklistRepository,
        @inject("IJwtService") private readonly _jwtService: IJwtService
    ) {}

    async logout(accessToken: string): Promise<void> {
        const payload = this._jwtService.verifyAccessToken(accessToken);
        if (!payload) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN);
        }

        if (!payload.exp) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN);
        }

        const ttl = payload.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
            await this._blacklistRepository.blacklist(accessToken, ttl);
        }
    }
}