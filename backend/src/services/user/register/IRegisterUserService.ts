import { IUser } from "../../../types";
import { CreateUserInput } from "../../../DTO/UserDTO";

export interface IRegisterUserService {
    signup(data: CreateUserInput): Promise<IUser>;
}