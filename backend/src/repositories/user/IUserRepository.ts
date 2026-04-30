import { User } from "@prisma/client";
import { CreateUserInput } from "../../DTO/UserDTO";

export interface IUserRepository {
    create(data: CreateUserInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}