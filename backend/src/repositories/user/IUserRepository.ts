import { User } from "@prisma/client";

export interface IUserRepository {
    create(data: { email: string; name: string; password: string }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}