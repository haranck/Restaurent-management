import { container } from "tsyringe";
import { IRegisterUserService } from "../services/user/register/IRegisterUserService";
import { RegisterUserService } from "../services/user/register/RegisterUserService";
import { ILoginUserService } from "../services/user/login/ILoginUserService";
import { LoginUserService } from "../services/user/login/LoginUserService";
// import { ILogoutUserService } from "../services/user/logout/ILogoutUserService";
// import { LogoutUserService } from "../services/user/logout/LogoutUserService";

export class ServiceModule {
    static registerModules(): void {
        container.register<IRegisterUserService>("IRegisterUserService", {
            useClass: RegisterUserService
        });
        container.register<ILoginUserService>("ILoginUserService", {
            useClass: LoginUserService
        });
        // container.register<ILogoutUserService>("ILogoutUserService", {
        //     useClass: LogoutUserService
        // });
    }
}