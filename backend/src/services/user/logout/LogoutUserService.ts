import { inject, injectable } from "tsyringe";
import { ILogoutUserService } from "./ILogoutUserService";
import { ITokenBlacklistRepository } from "../../../repositories/redis/IRedisTokenBlacklistRepository";
import { IJwtService } from "../../jwt/IJwtServices";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class LogoutUserService implements ILogoutUserService {
    constructor(
        @inject("ITokenBlacklistRepository") private _blacklistRepository: ITokenBlacklistRepository,
        @inject("IJwtService") private _jwtService: IJwtService
    ) {}

    async logout(accesstoken: string): Promise<void> {
        const payload = this._jwtService.verifyAccessToken(accesstoken);
        if(!payload) throw new Error("Invalid token")

        const decoded = payload as JwtPayload
        if(!decoded.exp) throw new Error('invalid token')
        const exp = decoded.exp
        
        const ttl = exp - Math.floor(Date.now() / 1000)
        if(ttl>0){
            await this._blacklistRepository.blacklist(accesstoken, ttl)
        }
    }
}