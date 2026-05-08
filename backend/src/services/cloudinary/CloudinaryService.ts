import { v2 as cloudinary } from "cloudinary";
import { injectable } from "tsyringe";
import { ICloudinaryService, CloudinaryUploadResponse, UploadFile } from "./ICloudinaryService";
import { ENV } from "../../config/env.config";
import { ERROR_MESSAGES } from "../../constants/messages.constant";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

@injectable()
export class CloudinaryService implements ICloudinaryService {
    async uploadImage(file: UploadFile): Promise<CloudinaryUploadResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "restaurants" },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error(ERROR_MESSAGES.CLOUDINARY_UPLOAD_FAILED));
                    resolve({
                        imageUrl: result.secure_url,
                        imageId: result.public_id,
                    });
                }
            );
            uploadStream.end(file.buffer);
        });
    }

    async deleteImage(imageId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(imageId);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.CLOUDINARY_DELETE_FAILED;
            console.error("Cloudinary delete error:", message);
            throw new Error(ERROR_MESSAGES.CLOUDINARY_DELETE_FAILED);
        }
    }

    async updateImage(oldImageId: string, file: UploadFile): Promise<CloudinaryUploadResponse> {
        if (oldImageId) {
            await this.deleteImage(oldImageId);
        }
        return this.uploadImage(file);
    }
}
