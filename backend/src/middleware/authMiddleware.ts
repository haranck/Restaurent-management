import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IJwtService, JwtPayload } from "../services/jwt/IJwtServices";
import { IUserRepository } from "../repositories/user/IUserRepository";
import { ITokenBlacklistRepository } from "../repositories/redis/IRedisTokenBlacklistRepository";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/constants";

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
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
                    message: ERROR_MESSAGES.UNAUTHORIZED 
                });
                return;
            }

            const token = authHeader.split(" ")[1];

            // 1.5 Check if token is blacklisted
            const isBlacklisted = await this._blacklistRepository.isBlacklisted(token);
            if (isBlacklisted) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
                    message: ERROR_MESSAGES.TOKEN_BLACKLISTED 
                });
                return;
            }

            // 2. Verify JWT token
            const payload = this._jwtService.verifyAccessToken(token);
            if (!payload) {
                // This might be unreachable if verifyAccessToken throws, but good for type safety if it returned null
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
                    message: ERROR_MESSAGES.INVALID_TOKEN 
                });
                return;
            }

            // 3. Verify user still exists in the database
            const user = await this._userRepository.findById(payload.userId);
            if (!user) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
                    message: ERROR_MESSAGES.USER_NOT_FOUND 
                });
                return;
            }

            // 4. Attach user payload to request and proceed
            req.user = payload;
            next();

        } catch (error) {
            console.error("Auth Middleware Error:", error);
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.AUTHENTICATION_FAILED;
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message });
        }
    };
}
