import { Restaurant } from "@prisma/client";
import { UpdateRestaurantDTO } from "../../../DTO/RestaurantDTO";
import { UploadFile } from "../../cloudinary/ICloudinaryService";

export interface IRestaurantUpdateService {
    update(id: string, data: UpdateRestaurantDTO, file?: UploadFile): Promise<Restaurant>;
}
