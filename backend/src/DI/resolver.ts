import { container } from "tsyringe";
import { ContainerSetup } from "./container";

import { UserController } from "../controllers/UserController";
import { RestaurantController } from "../controllers/RestaurantController";

ContainerSetup.registerAll()

export const userController = container.resolve(UserController)
export const restaurantController = container.resolve(RestaurantController)
