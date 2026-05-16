export interface IApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface IAuthResponse {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
}

export type FoodType = "VEG" | "NON_VEG" | "BOTH";

export interface Address {
    locality: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Restaurant {
    id: string;
    name: string;
    description: string;
    phone: string;
    foodType: FoodType;
    nearestPlace: string;
    userId: string;
    imageUrl?: string | null;
    imageId?: string | null;
    address: Address;
    user?: { id: string; name: string; email: string };
    createdAt?: string;
    updatedAt?: string;
}
