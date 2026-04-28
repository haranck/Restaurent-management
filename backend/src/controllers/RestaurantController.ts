import { Request, Response } from "express";
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

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, phone, foodType, nearestPlace, address } = req.body;
            const restaurant = await this.createService.create({ 
                name, 
                description, 
                phone, 
                foodType, 
                nearestPlace, 
                address 
            });
            res.status(201).json({ message: "Restaurant created successfully", restaurant });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to create restaurant", error: error.message });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { name, description, phone, foodType, nearestPlace, address } = req.body;
            const restaurant = await this.updateService.update(id as string, { 
                name, 
                description, 
                phone, 
                foodType, 
                nearestPlace, 
                address 
            });
            res.status(200).json({ message: "Restaurant updated successfully", restaurant });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to update restaurant", error: error.message });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.deleteService.delete(id as string);
            res.status(200).json({ message: "Restaurant deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to delete restaurant", error: error.message });
        }
    }

    fetchAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurants = await this.fetchService.fetchAll();
            res.status(200).json({ message: "Restaurants fetched successfully", restaurants });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to fetch restaurants", error: error.message });
        }
    }
}
