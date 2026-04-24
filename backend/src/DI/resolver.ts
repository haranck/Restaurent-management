import { container } from "tsyringe";
import { ContainerSetup } from "./container";

import { UserController } from "../controllers/UserController";

ContainerSetup.registerAll()

export const userController = container.resolve(UserController)
