import { Response } from "express";
import { injectable, inject } from "tsyringe";
import { AuthRequest } from "../middleware/authMiddleware";
import { IRegisterUserService } from "../services/user/register/IRegisterUserService";
import { ILoginUserService } from "../services/user/login/ILoginUserService";
import { ILogoutUserService } from "../services/user/logout/ILogoutUserService";
import { IRefreshTokenService } from "../services/refreshToken/IRefreshTokenService";
import { HttpStatus } from "../constants/httpStatus.enum";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages.constant";
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS, CLEAR_REFRESH_TOKEN_COOKIE_OPTIONS } from "../constants/cookie.constant";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { AppError } from "../errors";

@injectable()
export class UserController {
    constructor(
        @inject('IRegisterUserService') private readonly _registerService: IRegisterUserService,
        @inject('ILoginUserService') private readonly _loginService: ILoginUserService,
        @inject('ILogoutUserService') private readonly _logoutService: ILogoutUserService,
        @inject('IRefreshTokenService') private readonly _refreshTokenService: IRefreshTokenService
    ) { }

    signup = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { email, name, password } = req.body;
            const user = await this._registerService.signup({ email, name, password });
            sendSuccess(res, HttpStatus.CREATED, SUCCESS_MESSAGES.USER_CREATED, { user });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    login = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const response = await this._loginService.login({ email, password });

            res.cookie(REFRESH_TOKEN_COOKIE_NAME, response.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.USER_LOGGED_IN, {
                user: response.user,
                accessToken: response.accessToken,
            });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
        const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if (!token) {
            sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.NO_REFRESH_TOKEN);
            return;
        }

        try {
            const response = await this._refreshTokenService.refreshToken(token);
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, response.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.TOKEN_REFRESHED, {
                accessToken: response.accessToken,
            });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.UNAUTHORIZED, message);
        }
    }

    logout = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.NO_TOKEN_PROVIDED);
                return;
            }

            const token = authHeader.split(" ")[1];
            await this._logoutService.logout(token);

            res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, CLEAR_REFRESH_TOKEN_COOKIE_OPTIONS);
            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.USER_LOGGED_OUT);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }
}