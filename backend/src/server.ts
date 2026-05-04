import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://dine-map.vercel.app",
        "https://dine-enifu6nfl-harankrishna03-gmailcoms-projects.vercel.app" 
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth",userRoutes);
app.use("/api/restaurant", restaurantRoutes);

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:");
        console.error(error);
        process.exit(1);
    }
}

startServer();
