import { User } from "@prisma/client";

export interface ILoginUserService {
    login(data: { email: string; password: string }): Promise<User>;
}