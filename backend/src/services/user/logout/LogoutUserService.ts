import { injectable } from "tsyringe";
import { ILogoutUserService } from "./ILogoutUserService";

@injectable()
export class LogoutUserService implements ILogoutUserService {
    async logout(): Promise<void> {
        
    }
}
