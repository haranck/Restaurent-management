import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IRegisterUserService } from "../services/user/register/IRegisterUserService";
import { ILoginUserService } from "../services/user/login/ILoginUserService";
import { ILogoutUserService } from "../services/user/logout/ILogoutUserService";
import { IRefreshTokenService } from "../services/refreshToken/IRefreshTokenService";

@injectable()
export class UserController {
    constructor(
        @inject('IRegisterUserService') private registerService: IRegisterUserService,
        @inject('ILoginUserService') private loginService: ILoginUserService,
        @inject('ILogoutUserService') private logoutService: ILogoutUserService,
        @inject('IRefreshTokenService') private refreshTokenService: IRefreshTokenService
    ) { }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, name, password } = req.body;
            const user = await this.registerService.signup({ email, name, password });
            res.status(201).json({ message: "User created successfully", user });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to create user", error: error.message });
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const response = await this.loginService.login({ email, password });

            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "User logged in successfully", user: response.user, accessToken: response.accessToken });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to login user", error: error.message });
        }
    }
    refreshToken = async (req: Request, res: Response): Promise<void> => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(401).json({ message: "No refresh token provided" })
            return;
        }

        try {
            const response = await this.refreshTokenService.refreshToken(refreshToken);
            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "Token refreshed successfully", accessToken: response.accessToken });


        } catch (error: any) {
            res.status(500).json({ message: "Failed to refresh token", error: error.message });
        }
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ message: "No token provided" });
                return;
            }
            const token = authHeader.split(" ")[1];
            await this.logoutService.logout(token);

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            res.status(200).json({ message: "User logged out successfully" });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to logout user", error: error.message });
        }
    }
}