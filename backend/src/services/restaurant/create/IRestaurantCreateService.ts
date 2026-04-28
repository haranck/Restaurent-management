import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../../DTO/RestaurantDTO";

export interface IRestaurantCreateService {
    create(data: CreateRestaurantDTO): Promise<Restaurant>;
}
