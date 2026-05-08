import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantCreateService } from "./IRestaurantCreateService";
import { ICloudinaryService, UploadFile } from "../../cloudinary/ICloudinaryService";
import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantCreateService implements IRestaurantCreateService {
    constructor(
        @inject("IRestaurantRepository") private readonly _restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private readonly _cloudinaryService: ICloudinaryService
    ) {}

    async create(data: CreateRestaurantDTO, file?: UploadFile): Promise<Restaurant> {
        const restaurantData = { ...data };

        if (file) {
            const uploadResult = await this._cloudinaryService.uploadImage(file);
            restaurantData.imageUrl = uploadResult.imageUrl;
            restaurantData.imageId = uploadResult.imageId;
        }

        return this._restaurantRepo.create(restaurantData);
    }
}
