import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantDeleteService } from "./IRestaurantDeleteService";
import { ICloudinaryService } from "../../cloudinary/ICloudinaryService";

@injectable()
export class RestaurantDeleteService implements IRestaurantDeleteService {
    constructor(
        @inject("IRestaurantRepository") private readonly _restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private readonly _cloudinaryService: ICloudinaryService
    ) {}

    async delete(id: string): Promise<void> {
        const existingRestaurant = await this._restaurantRepo.findById(id);
        if (existingRestaurant?.imageId) {
            await this._cloudinaryService.deleteImage(existingRestaurant.imageId);
        }
        return this._restaurantRepo.delete(id);
    }
}
