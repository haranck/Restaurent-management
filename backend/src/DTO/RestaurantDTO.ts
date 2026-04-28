import { FoodType } from "@prisma/client";

export interface AddressInput {
    locality: string;
    city: string;
    state: string;
    pincode: string;
}

export interface CreateRestaurantDTO {
    name: string;
    description?: string;
    phone: string;
    foodType: FoodType;
    nearestPlace?: string;
    address: AddressInput;
}

export interface UpdateRestaurantDTO {
    name?: string;
    description?: string;
    phone?: string;
    foodType?: FoodType;
    nearestPlace?: string;
    address?: AddressInput;
}
