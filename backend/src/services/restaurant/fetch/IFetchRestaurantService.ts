import { Restaurant } from "@prisma/client";

export interface IFetchRestaurantService {
    fetchAll(): Promise<Restaurant[]>;
    fetchByUser(userId: string): Promise<Restaurant[]>;
}
