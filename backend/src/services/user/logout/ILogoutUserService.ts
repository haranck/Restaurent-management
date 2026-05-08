export interface ILogoutUserService {
    logout(accessToken: string): Promise<void>;
}