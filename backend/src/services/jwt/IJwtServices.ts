export interface JwtPayload{
    userId:string;
    email:string;
    exp?: number;
}

export interface IJwtService {
  signAccessToken(payload: JwtPayload): string;
  signRefreshToken(payload: JwtPayload): string;
  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string): JwtPayload | null;
}
