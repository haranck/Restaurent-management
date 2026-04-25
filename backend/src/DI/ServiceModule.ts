import { container } from "tsyringe";
import { IRegisterUserService } from "../services/user/register/IRegisterUserService";
import { RegisterUserService } from "../services/user/register/RegisterUserService";
import { ILoginUserService } from "../services/user/login/ILoginUserService";
import { LoginUserService } from "../services/user/login/LoginUserService";
import { ILogoutUserService } from "../services/user/logout/ILogoutUserService";
import { LogoutUserService } from "../services/user/logout/LogoutUserService";
import { IRestaurantCreateService } from "../services/restaurant/create/IRestaurantCreateService";
import { RestaurantCreateService } from "../services/restaurant/create/RestaurantCreateService";
import { IRestaurantUpdateService } from "../services/restaurant/update/IRestaurantUpdateService";
import { RestaurantUpdateService } from "../services/restaurant/update/RestaurantUpdateService";
import { IRestaurantDeleteService } from "../services/restaurant/delete/IRestaurantDeleteService";
import { RestaurantDeleteService } from "../services/restaurant/delete/RestaurantDeleteService";
import { IFetchRestaurantService } from "../services/restaurant/fetch/IFetchRestaurantService";
import { FetchRestaurantService } from "../services/restaurant/fetch/FetchRestaurantService";

export class ServiceModule {
    static registerModules(): void {
        container.register<IRegisterUserService>("IRegisterUserService", {
            useClass: RegisterUserService
        });
        container.register<ILoginUserService>("ILoginUserService", {
            useClass: LoginUserService
        });
        container.register<ILogoutUserService>("ILogoutUserService", {
            useClass: LogoutUserService
        });

        container.register<IRestaurantCreateService>("IRestaurantCreateService", {
            useClass: RestaurantCreateService
        });

        container.register<IRestaurantUpdateService>("IRestaurantUpdateService", {
            useClass: RestaurantUpdateService
        });

        container.register<IRestaurantDeleteService>("IRestaurantDeleteService", {
            useClass: RestaurantDeleteService
        });

        container.register<IFetchRestaurantService>("IFetchRestaurantService", {
            useClass: FetchRestaurantService
        });
    }
}