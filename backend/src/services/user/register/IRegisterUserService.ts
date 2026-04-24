import { User } from "@prisma/client";

export interface IRegisterUserService {
    signup(data: { email: string; name: string; password: string }): Promise<User>;
}