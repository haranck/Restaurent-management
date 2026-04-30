import { container } from "tsyringe";
import { ContainerSetup } from "./container";

import { UserController } from "../controllers/UserController";
import { RestaurantController } from "../controllers/RestaurantController";
import { AuthMiddleware } from "../middleware/authMiddleware";

ContainerSetup.registerAll()

export const userController = container.resolve(UserController)
export const restaurantController = container.resolve(RestaurantController)
export const authMiddleware = container.resolve(AuthMiddleware)
