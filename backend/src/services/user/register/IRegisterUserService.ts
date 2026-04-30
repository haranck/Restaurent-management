import { User } from "@prisma/client";
import { CreateUserInput } from "../../../DTO/UserDTO";

export interface IRegisterUserService {
    signup(data: CreateUserInput): Promise<User>;
}