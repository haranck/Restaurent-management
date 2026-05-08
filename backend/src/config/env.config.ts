import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    REDIS_URL: z.string().min(1, "REDIS_URL is required"),

    JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
    JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
    ACCESS_TOKEN_EXPIRY: z.string().default("30m"),
    REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
    REFRESH_TOKEN_MAX_AGE: z.coerce.number().default(604800000),

    CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
    CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
    CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

    CORS_ORIGINS: z.string().default("http://localhost:5173"),
    MAX_FILE_SIZE: z.coerce.number().default(5242880),
    BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
});

export type EnvConfig = z.infer<typeof envSchema>;

const parsedResult = envSchema.safeParse(process.env);

if (!parsedResult.success) {
    console.error("❌ Environment variable validation failed:");
    console.error(parsedResult.error.flatten().fieldErrors);
    process.exit(1);
}

export const ENV: EnvConfig = parsedResult.data;
