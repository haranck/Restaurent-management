import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { injectable, inject } from "tsyringe";
import { IRestaurantCreateService } from "../services/restaurant/create/IRestaurantCreateService";
import { IRestaurantUpdateService } from "../services/restaurant/update/IRestaurantUpdateService";
import { IRestaurantDeleteService } from "../services/restaurant/delete/IRestaurantDeleteService";
import { IFetchRestaurantService } from "../services/restaurant/fetch/IFetchRestaurantService";

@injectable()
export class RestaurantController {
    constructor(
        @inject("IRestaurantCreateService") private createService: IRestaurantCreateService,
        @inject("IRestaurantUpdateService") private updateService: IRestaurantUpdateService,
        @inject("IRestaurantDeleteService") private deleteService: IRestaurantDeleteService,
        @inject("IFetchRestaurantService") private fetchService: IFetchRestaurantService
    ) {}

    create = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            let { name, description, phone, foodType, nearestPlace, address } = req.body;
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({ message: "User not authenticated" });
                return;
            }

            // Handle address if it's sent as a string (common with multipart/form-data)
            if (typeof address === "string") {
                try {
                    address = JSON.parse(address);
                } catch (e) {
                    res.status(400).json({ message: "Invalid address format" });
                    return;
                }
            }

            const restaurant = await this.createService.create({ 
                name, 
                description, 
                phone, 
                foodType, 
                nearestPlace, 
                address,
                userId
            }, req.file);
            res.status(201).json({ message: "Restaurant created successfully", restaurant });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ message: "Failed to create restaurant", error: message });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            let { name, description, phone, foodType, nearestPlace, address } = req.body;

            // Handle address if it's sent as a string
            if (typeof address === "string") {
                try {
                    address = JSON.parse(address);
                } catch (e) {
                    res.status(400).json({ message: "Invalid address format" });
                    return;
                }
            }

            const restaurant = await this.updateService.update(id as string, { 
                name, 
                description, 
                phone, 
                foodType, 
                nearestPlace, 
                address 
            }, req.file);
            res.status(200).json({ message: "Restaurant updated successfully", restaurant });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ message: "Failed to update restaurant", error: message });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.deleteService.delete(id as string);
            res.status(200).json({ message: "Restaurant deleted successfully" });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ message: "Failed to delete restaurant", error: message });
        }
    }

    fetchAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurants = await this.fetchService.fetchAll();
            res.status(200).json({ message: "Restaurants fetched successfully", restaurants });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ message: "Failed to fetch restaurants", error: message });
        }
    }

    fetchMine = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ message: "User not authenticated" });
                return;
            }
            const restaurants = await this.fetchService.fetchByUser(userId);
            res.status(200).json({ message: "Your restaurants fetched successfully", restaurants });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ message: "Failed to fetch your restaurants", error: message });
        }
    }
}
