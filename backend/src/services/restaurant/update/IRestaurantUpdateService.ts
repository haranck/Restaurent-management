import { Restaurant } from "@prisma/client";
import { UpdateRestaurantDTO } from "../../../DTO/RestaurantDTO";

export interface IRestaurantUpdateService {
    update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant>;
}
