import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.routes";
import restaurantRoutes from "./src/routes/restaurant.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174", "http://127.0.0.1:5173"],
    credentials: true,
}));
app.use(express.json());

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
