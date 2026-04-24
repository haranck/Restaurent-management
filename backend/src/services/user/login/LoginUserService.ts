import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { User } from "@prisma/client";
import { ILoginUserService } from "./ILoginUserService";
import { comparePassword } from "../../../utils/hash";

@injectable()
export class LoginUserService implements ILoginUserService {
    constructor(
        @inject('IUserRepository') private userRepo: IUserRepository
    ) { }

    async login(data: { email: string; password: string }): Promise<User> {
        const { email, password } = data;
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return user;
    }
}