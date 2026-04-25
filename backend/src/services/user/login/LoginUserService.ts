import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { ILoginUserService, LoginResponse } from "./ILoginUserService";
import { comparePassword } from "../../../utils/hash";
import { IJwtService } from "../../jwt/IJwtServices";

@injectable()
export class LoginUserService implements ILoginUserService {
    constructor(
        @inject('IUserRepository') private userRepo: IUserRepository,
        @inject('IJwtService') private jwtService: IJwtService
    ) { }

    async login(data: { email: string; password: string }): Promise<LoginResponse> {
        const { email, password } = data;
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const payload = { userId: user.id, email: user.email };
        const accessToken = this.jwtService.signAccessToken(payload);
        const refreshToken = this.jwtService.signRefreshToken(payload);

        return {
            user,
            accessToken,
            refreshToken
        };
    }
}