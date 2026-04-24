import { User } from "@prisma/client";

export interface ILogoutUserService {
    logout(data: { email: string; password: string }): Promise<User>;
}