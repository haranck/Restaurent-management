import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes";
import restaurantRoutes from "./src/routes/restaurant.routes";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174", "http://127.0.0.1:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
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
