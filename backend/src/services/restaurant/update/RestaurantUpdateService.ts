import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantUpdateService } from "./IRestaurantUpdateService";
import { Restaurant } from "@prisma/client";
import { UpdateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantUpdateService implements IRestaurantUpdateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
        return this.restaurantRepo.update(id, data);
    }
}
