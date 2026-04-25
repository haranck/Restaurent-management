import { Restaurant } from "@prisma/client";

export interface IFetchRestaurantService {
    fetchAll(): Promise<Restaurant[]>;
}
