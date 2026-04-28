import { Restaurant } from "@prisma/client"
import { CreateRestaurantDTO, UpdateRestaurantDTO } from "../../DTO/RestaurantDTO";


export interface IRestaurantRepository {
    create(data:CreateRestaurantDTO): Promise<Restaurant>;

    findAll(): Promise<Restaurant[]>;

    findById(id: string): Promise<Restaurant | null>;

    update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant>;

    delete(id: string): Promise<void>;
}