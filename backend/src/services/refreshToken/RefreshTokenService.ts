import { IRefreshTokenService } from "./IRefreshTokenService";
import { injectable, inject } from "tsyringe";
import { IJwtService } from "../jwt/IJwtServices";
import { IUserRepository } from "../../repositories/user/IUserRepository";

@injectable()
export class RefreshTokenService implements IRefreshTokenService {
    constructor(
        @inject('IJwtService') private jwtService: IJwtService,
        @inject('IUserRepository') private userRepository: IUserRepository,
    ) {}

    refreshToken = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> => {
        try {
            const payload  = this.jwtService.verifyRefreshToken(refreshToken)
            if(!payload) {
                throw new Error("invalid refresh token")
            }

            const user = await this.userRepository.findById(payload.userId)
            if(!user){
                throw new Error('user not found')
            }

            const newPayload = {userId:user.id!,email:user.email} 
            const newAccessToken = this.jwtService.signAccessToken(newPayload)
            const newRefreshToken = this.jwtService.signRefreshToken(newPayload)

            return { accessToken: newAccessToken, refreshToken: newRefreshToken }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}