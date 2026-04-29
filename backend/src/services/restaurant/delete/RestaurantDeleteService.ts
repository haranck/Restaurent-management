import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantDeleteService } from "./IRestaurantDeleteService";
import { ICloudinaryService } from "../../cloudinary/ICloudinaryService";

@injectable()
export class RestaurantDeleteService implements IRestaurantDeleteService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private cloudinaryService: ICloudinaryService
    ) {}

    async delete(id: string): Promise<void> {
        const existingRestaurant = await this.restaurantRepo.findById(id);
        if (existingRestaurant?.imageId) {
            await this.cloudinaryService.deleteImage(existingRestaurant.imageId);
        }
        return this.restaurantRepo.delete(id);
    }
}
