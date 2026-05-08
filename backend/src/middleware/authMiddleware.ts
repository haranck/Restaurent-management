import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IJwtService, JwtPayload } from "../services/jwt/IJwtServices";
import { IUserRepository } from "../repositories/user/IUserRepository";
import { ITokenBlacklistRepository } from "../repositories/redis/IRedisTokenBlacklistRepository";
import { HttpStatus } from "../constants/httpStatus.enum";
import { ERROR_MESSAGES } from "../constants/messages.constant";
import { sendError } from "../utils/apiResponse";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

@injectable()
export class AuthMiddleware {
    constructor(
        @inject("IJwtService") private readonly _jwtService: IJwtService,
        @inject("IUserRepository") private readonly _userRepository: IUserRepository,
        @inject("ITokenBlacklistRepository") private readonly _blacklistRepository: ITokenBlacklistRepository
    ) {}

    authenticate = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
                return;
            }

            const token = authHeader.split(" ")[1];

            const isBlacklisted = await this._blacklistRepository.isBlacklisted(token);
            if (isBlacklisted) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.TOKEN_BLACKLISTED);
                return;
            }

            const payload = this._jwtService.verifyAccessToken(token);
            if (!payload) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN);
                return;
            }

            const user = await this._userRepository.findById(payload.userId);
            if (!user) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.USER_NOT_FOUND);
                return;
            }

            req.user = payload;
            next();

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.AUTHENTICATION_FAILED;
            sendError(res, HttpStatus.UNAUTHORIZED, message);
        }
    };
}
