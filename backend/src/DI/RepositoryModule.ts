import { container } from "tsyringe";
import { IUserRepository } from "../repositories/user/IUserRepository";
import { UserRepository } from "../repositories/user/UserRepository";

export class RepositoryModule{
    static registerModules():void {

        container.register<IUserRepository>("IUserRepository",{
            useClass:UserRepository
        });
    
    }
}