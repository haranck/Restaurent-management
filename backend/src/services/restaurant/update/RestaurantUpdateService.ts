import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantUpdateService } from "./IRestaurantUpdateService";
import { Restaurant } from "@prisma/client";

@injectable()
export class RestaurantUpdateService implements IRestaurantUpdateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async update(id: string, data: { name: string; address: string; contact: string }): Promise<Restaurant> {
        return this.restaurantRepo.update(id, data);
    }
}
