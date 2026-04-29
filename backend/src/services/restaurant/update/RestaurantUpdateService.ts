import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantUpdateService } from "./IRestaurantUpdateService";
import { ICloudinaryService, UploadFile } from "../../cloudinary/ICloudinaryService";
import { Restaurant } from "@prisma/client";
import { UpdateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantUpdateService implements IRestaurantUpdateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private cloudinaryService: ICloudinaryService
    ) {}

    async update(id: string, data: UpdateRestaurantDTO, file?: UploadFile): Promise<Restaurant> {
        if (file) {
            const existingRestaurant = await this.restaurantRepo.findById(id);
            if (existingRestaurant?.imageId) {
                await this.cloudinaryService.deleteImage(existingRestaurant.imageId);
            }
            const uploadResult = await this.cloudinaryService.uploadImage(file);
            data.imageUrl = uploadResult.imageUrl;
            data.imageId = uploadResult.imageId;
        }
        return this.restaurantRepo.update(id, data);
    }
}
