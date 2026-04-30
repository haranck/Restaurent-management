export interface UploadFile {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

export interface CloudinaryUploadResponse {
    imageUrl: string;
    imageId: string;
}

export interface ICloudinaryService {
    uploadImage(file: UploadFile): Promise<CloudinaryUploadResponse>;
    deleteImage(imageId: string): Promise<void>;
    updateImage(oldImageId: string, file: UploadFile): Promise<CloudinaryUploadResponse>;
}
