import { CookieOptions } from "express";
import { ENV } from "../config/env.config";

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken" as const;

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ENV.REFRESH_TOKEN_MAX_AGE,
};

export const CLEAR_REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};
