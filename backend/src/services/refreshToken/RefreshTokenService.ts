import { IRefreshTokenService } from "./IRefreshTokenService";
import { injectable, inject } from "tsyringe";
import { IJwtService } from "../jwt/IJwtServices";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { UnauthorizedError, NotFoundError } from "../../errors";
import { ERROR_MESSAGES } from "../../constants/messages.constant";

@injectable()
export class RefreshTokenService implements IRefreshTokenService {
    constructor(
        @inject('IJwtService') private readonly _jwtService: IJwtService,
        @inject('IUserRepository') private readonly _userRepository: IUserRepository,
    ) {}

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = this._jwtService.verifyRefreshToken(refreshToken);
        if (!payload) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
        }

        const user = await this._userRepository.findById(payload.userId);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        const newPayload = { userId: user.id, email: user.email };
        const newAccessToken = this._jwtService.signAccessToken(newPayload);
        const newRefreshToken = this._jwtService.signRefreshToken(newPayload);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}