import { IUser } from "../../../types";

export interface LoginResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface ILoginUserService {
    login(data: { email: string; password: string }): Promise<LoginResponse>;
}