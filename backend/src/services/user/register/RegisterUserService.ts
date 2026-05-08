import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { hashPassword } from "../../../utils/hash";
import { IRegisterUserService } from "./IRegisterUserService";
import { User } from "@prisma/client";
import { CreateUserInput } from "../../../DTO/UserDTO";
import { ConflictError } from "../../../errors";
import { ERROR_MESSAGES } from "../../../constants/messages.constant";

@injectable()
export class RegisterUserService implements IRegisterUserService {
    constructor(
        @inject('IUserRepository') private readonly _userRepo: IUserRepository
    ) { }

    async signup(data: CreateUserInput): Promise<User> {
        const { email, name, password } = data;

        const existingUser = await this._userRepo.findByEmail(email);
        if (existingUser) {
            throw new ConflictError(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }

        const hashedPassword = await hashPassword(password);
        return this._userRepo.create({ email, name, password: hashedPassword });
    }
}