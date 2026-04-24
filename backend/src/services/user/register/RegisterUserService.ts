import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { hashPassword } from "../../../utils/hash";
import { IRegisterUserService } from "./IRegisterUserService";
import { User } from "@prisma/client";

@injectable()
export class RegisterUserService implements IRegisterUserService {
    constructor(
        @inject('IUserRepository') private userRepo: IUserRepository
    ) { }

    async signup(data: { email: string; name: string; password: string }): Promise<User> {
        const { email, name, password } = data;

        const existingUser = await this.userRepo.findByEmail(email)
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await hashPassword(password);
        const user = await this.userRepo.create({ email, name, password: hashedPassword });
        console.log('User :', user)
        return user;
    }
}