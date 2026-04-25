import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IFetchRestaurantService } from "./IFetchRestaurantService";
import { Restaurant } from "@prisma/client";

@injectable()
export class FetchRestaurantService implements IFetchRestaurantService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async fetchAll(): Promise<Restaurant[]> {
        return this.restaurantRepo.findAll();
    }
}
