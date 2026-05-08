import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { ENV } from "../config/env.config";
import { ERROR_MESSAGES } from "../constants/messages.constant";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: ENV.MAX_FILE_SIZE,
    },
    fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error(ERROR_MESSAGES.ONLY_IMAGES_ALLOWED));
        }
    },
});
