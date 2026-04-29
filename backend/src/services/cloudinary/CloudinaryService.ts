import { v2 as cloudinary } from "cloudinary";
import { injectable } from "tsyringe";
import { ICloudinaryService, CloudinaryUploadResponse, UploadFile } from "./ICloudinaryService";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

@injectable()
export class CloudinaryService implements ICloudinaryService {
    async uploadImage(file: UploadFile): Promise<CloudinaryUploadResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "restaurants" },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Cloudinary upload failed"));
                    resolve({
                        imageUrl: result.secure_url,
                        imageId: result.public_id
                    });
                }
            );
            uploadStream.end(file.buffer);
        });
    }

    async deleteImage(imageId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(imageId);
        } catch (error) {
            console.error("Cloudinary delete error:", error);
            throw new Error("Failed to delete image from Cloudinary");
        }
    }

    async updateImage(oldImageId: string, file: UploadFile): Promise<CloudinaryUploadResponse> {
        // Delete old image first
        if (oldImageId) {
            await this.deleteImage(oldImageId);
        }
        // Upload new image
        return this.uploadImage(file);
    }
}
