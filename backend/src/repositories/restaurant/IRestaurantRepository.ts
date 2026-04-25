import { Restaurant } from "@prisma/client"

export interface IRestaurantRepository {
    create(data: { name: string; address: string; contact: string }): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findById(id: string): Promise<Restaurant | null>;
    update(id: string, data: { name: string; address: string; contact: string }): Promise<Restaurant>;
    delete(id: string): Promise<void>;
}