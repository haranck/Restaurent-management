import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import prisma from "./src/config/prisma";
import bcrypt from "bcryptjs";

// Health Check / Basic Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Restaurant Management API is running",
    version: "1.0.0",
  });
});

// Simple route to check and create a user
app.get("/test-create-user", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash("1234", 10);
    const email = `haran@gmail.com`
    
    const user = await prisma.user.create({
      data: {
        email: email,
        name: "Haran",
        password: hashedPassword,
      },
    });

    res.json({
      status: "success",
      message: "✅ User saved to database!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "❌ Failed to save user",
      error: error.message,
    });
  }
});

// NEW: Route to see all users currently in the database
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });
    
    res.json({
      status: "success",
      count: users.length,
      users: users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Could not fetch users",
      error: error.message,
    });
  }
});

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
