import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../../DTO/RestaurantDTO";
import { UploadFile } from "../../cloudinary/ICloudinaryService";

export interface IRestaurantCreateService {
    create(data: CreateRestaurantDTO, file?: UploadFile): Promise<Restaurant>;
}
