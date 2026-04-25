import { User } from "@prisma/client";

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface ILoginUserService {
    login(data: { email: string; password: string }): Promise<LoginResponse>;
}