import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantDeleteService } from "./IRestaurantDeleteService";

@injectable()
export class RestaurantDeleteService implements IRestaurantDeleteService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository
    ) {}

    async delete(id: string): Promise<void> {
        return this.restaurantRepo.delete(id);
    }
}
