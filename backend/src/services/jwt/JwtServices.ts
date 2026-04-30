import jwt from 'jsonwebtoken'
import { IJwtService, JwtPayload } from './IJwtServices'

export class JwtService implements IJwtService {
    private _ACCESS_SECRET: string
    private _REFRESH_SECRET: string

    constructor() {
        this._ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string
        this._REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string
    }

    signAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, this._ACCESS_SECRET, { expiresIn: '30m' })
    }

    signRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, this._REFRESH_SECRET, { expiresIn: "7d" })
    }

    verifyAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this._ACCESS_SECRET) as JwtPayload
        } catch {
            throw new Error("Invalid Access Token")
        }
    }

    verifyRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this._REFRESH_SECRET) as JwtPayload
        } catch {
            throw new Error('Invalid Refresh Token')
        }
    }
}
