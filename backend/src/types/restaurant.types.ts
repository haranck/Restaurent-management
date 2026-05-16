export enum FoodType {
    VEG = "VEG",
    NON_VEG = "NON_VEG",
    BOTH = "BOTH"
}

export interface IAddress {
    id: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    restaurantId: string | null;
}

export interface IRestaurant {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    imageId: string | null;
    phone: string;
    foodType: FoodType;
    nearestPlace: string | null;
    address?: IAddress | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
