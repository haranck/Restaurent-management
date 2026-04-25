import { Restaurant } from "@prisma/client";

export interface IRestaurantUpdateService {
    update(id: string, data: { name: string; address: string; contact: string }): Promise<Restaurant>;
}
