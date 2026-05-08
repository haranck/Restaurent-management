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
        
            const body = req.body || {};
            let { name, description, phone, foodType, nearestPlace, address } = body;
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({ message: "User not authenticated" });
                return;
            }

            if (!name || !phone || !foodType) {
                res.status(400).json({ message: "name, phone and foodType are required" });
                return;
            }

            if (typeof address === "string") {
                try {
                    address = JSON.parse(address);
                } catch {
                    res.status(400).json({ message: "Invalid address format - must be valid JSON" });
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
            console.error("Create restaurant error:", message);
            res.status(500).json({ message: "Failed to create restaurant", error: message });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id); // Express 5 params can be string | string[]
            const body = req.body || {};
            let { name, description, phone, foodType, nearestPlace, address } = body;

            if (!id) {
                res.status(400).json({ message: "Restaurant ID is required" });
                return;
            }

            if (typeof address === "string") {
                try {
                    address = JSON.parse(address);
                } catch {
                    res.status(400).json({ message: "Invalid address format - must be valid JSON" });
                    return;
                }
            }

            const restaurant = await this.updateService.update(id, {
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
            console.error("Update restaurant error:", message);
            res.status(500).json({ message: "Failed to update restaurant", error: message });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            await this.deleteService.delete(id);
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
