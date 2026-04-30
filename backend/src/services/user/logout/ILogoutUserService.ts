export interface ILogoutUserService {
    logout(accesstoken: string): Promise<void>;
}