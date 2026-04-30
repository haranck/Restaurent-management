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
    imageUrl?: string;
    imageId?: string;
    phone: string;
    foodType: FoodType;
    nearestPlace?: string;
    address: AddressInput;
    userId: string;
}

export interface UpdateRestaurantDTO {
    name?: string;
    description?: string;
    imageUrl?: string;
    imageId?: string;
    phone?: string;
    foodType?: FoodType;
    nearestPlace?: string;
    address?: AddressInput;
}
