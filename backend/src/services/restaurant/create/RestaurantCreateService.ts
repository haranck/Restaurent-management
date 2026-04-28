import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantCreateService } from "./IRestaurantCreateService";
import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantCreateService implements IRestaurantCreateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async create(data: CreateRestaurantDTO): Promise<Restaurant> {
        return this.restaurantRepo.create(data);
    }
}
