import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { ILoginUserService, LoginResponse } from "./ILoginUserService";
import { comparePassword } from "../../../utils/hash";
import { IJwtService } from "../../jwt/IJwtServices";
import { NotFoundError, UnauthorizedError } from "../../../errors";
import { ERROR_MESSAGES } from "../../../constants/messages.constant";

@injectable()
export class LoginUserService implements ILoginUserService {
    constructor(
        @inject('IUserRepository') private readonly _userRepo: IUserRepository,
        @inject('IJwtService') private readonly _jwtService: IJwtService
    ) { }

    async login(data: { email: string; password: string }): Promise<LoginResponse> {
        const { email, password } = data;

        const user = await this._userRepo.findByEmail(email);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_PASSWORD);
        }

        const payload = { userId: user.id, email: user.email };
        const accessToken = this._jwtService.signAccessToken(payload);
        const refreshToken = this._jwtService.signRefreshToken(payload);

        return { user, accessToken, refreshToken };
    }
}