import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.config";
import { API_PREFIX } from "./constants/routes.constant";
import { globalErrorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";

const app = express();

const corsOrigins = ENV.CORS_ORIGINS.split(",").map((origin) => origin.trim());

app.use(cors({
    origin: corsOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(API_PREFIX.AUTH, userRoutes);
app.use(API_PREFIX.RESTAURANT, restaurantRoutes);

app.use(globalErrorHandler);

async function startServer(): Promise<void> {
    try {
        app.listen(ENV.PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${ENV.PORT}`);
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown startup error";
        console.error("❌ Failed to start server:", message);
        process.exit(1);
    }
}

startServer();
