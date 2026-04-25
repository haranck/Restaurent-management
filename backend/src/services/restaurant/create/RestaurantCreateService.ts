import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantCreateService } from "./IRestaurantCreateService";
import { Restaurant } from "@prisma/client";

@injectable()
export class RestaurantCreateService implements IRestaurantCreateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async create(data: { name: string; address: string; contact: string }): Promise<Restaurant> {
        return this.restaurantRepo.create(data);
    }
}
