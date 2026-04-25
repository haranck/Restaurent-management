import { Restaurant } from "@prisma/client";

export interface IRestaurantCreateService {
    create(data: { name: string; address: string; contact: string }): Promise<Restaurant>;
}
