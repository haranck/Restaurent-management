import { container } from "tsyringe";
import { IUserRepository } from "../repositories/user/IUserRepository";
import { UserRepository } from "../repositories/user/UserRepository";
import { IRestaurantRepository } from "../repositories/restaurant/IRestaurantRepository";
import { RestaurantRepository } from "../repositories/restaurant/RestaurantRepository";

export class RepositoryModule{
    static registerModules():void {

        container.register<IUserRepository>("IUserRepository",{
            useClass:UserRepository
        });

        container.register<IRestaurantRepository>("IRestaurantRepository",{
            useClass:RestaurantRepository
        });
    
    }
}