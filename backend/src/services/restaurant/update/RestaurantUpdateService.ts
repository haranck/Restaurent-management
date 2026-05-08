import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantUpdateService } from "./IRestaurantUpdateService";
import { ICloudinaryService, UploadFile } from "../../cloudinary/ICloudinaryService";
import { Restaurant } from "@prisma/client";
import { UpdateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantUpdateService implements IRestaurantUpdateService {
    constructor(
        @inject("IRestaurantRepository") private readonly _restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private readonly _cloudinaryService: ICloudinaryService
    ) {}

    async update(id: string, data: UpdateRestaurantDTO, file?: UploadFile): Promise<Restaurant> {
        const updateData = { ...data };

        if (file) {
            const existingRestaurant = await this._restaurantRepo.findById(id);
            if (existingRestaurant?.imageId) {
                await this._cloudinaryService.deleteImage(existingRestaurant.imageId);
            }
            const uploadResult = await this._cloudinaryService.uploadImage(file);
            updateData.imageUrl = uploadResult.imageUrl;
            updateData.imageId = uploadResult.imageId;
        }

        return this._restaurantRepo.update(id, updateData);
    }
}
