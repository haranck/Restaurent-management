import jwt, { SignOptions } from 'jsonwebtoken';
import { IJwtService, JwtPayload } from './IJwtServices';
import { ENV } from '../../config/env.config';

export class JwtService implements IJwtService {
    private readonly _accessSecret: string;
    private readonly _refreshSecret: string;
    private readonly _accessTokenExpiry: string;
    private readonly _refreshTokenExpiry: string;

    constructor() {
        this._accessSecret = ENV.JWT_ACCESS_SECRET;
        this._refreshSecret = ENV.JWT_REFRESH_SECRET;
        this._accessTokenExpiry = ENV.ACCESS_TOKEN_EXPIRY;
        this._refreshTokenExpiry = ENV.REFRESH_TOKEN_EXPIRY;
    }

    signAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, this._accessSecret, {
            expiresIn: this._accessTokenExpiry,
        } as SignOptions);
    }

    signRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, this._refreshSecret, {
            expiresIn: this._refreshTokenExpiry,
        } as SignOptions);
    }

    verifyAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this._accessSecret) as JwtPayload;
        } catch {
            return null;
        }
    }

    verifyRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this._refreshSecret) as JwtPayload;
        } catch {
            return null;
        }
    }
}
