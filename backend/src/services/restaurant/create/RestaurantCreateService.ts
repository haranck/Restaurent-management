import { injectable, inject } from "tsyringe";
import { IRestaurantRepository } from "../../../repositories/restaurant/IRestaurantRepository";
import { IRestaurantCreateService } from "./IRestaurantCreateService";
import { ICloudinaryService, UploadFile } from "../../cloudinary/ICloudinaryService";
import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../../DTO/RestaurantDTO";

@injectable()
export class RestaurantCreateService implements IRestaurantCreateService {
    constructor(
        @inject("IRestaurantRepository") private restaurantRepo: IRestaurantRepository,
        @inject("ICloudinaryService") private cloudinaryService: ICloudinaryService
    ) {}

    async create(data: CreateRestaurantDTO, file?: UploadFile): Promise<Restaurant> {
        if (file) {
            const uploadResult = await this.cloudinaryService.uploadImage(file);
            data.imageUrl = uploadResult.imageUrl;
            data.imageId = uploadResult.imageId;
        }
        return this.restaurantRepo.create(data);
    }
}
