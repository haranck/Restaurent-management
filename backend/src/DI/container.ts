import { RepositoryModule } from "./RepositoryModule";
import { ServiceModule } from "./ServiceModule";

export class ContainerSetup {
    static registerAll():void {
        RepositoryModule.registerModules();
        ServiceModule.registerModules();
    }
}

