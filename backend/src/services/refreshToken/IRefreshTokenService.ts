export interface IRefreshTokenService {
    refreshToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }>
}