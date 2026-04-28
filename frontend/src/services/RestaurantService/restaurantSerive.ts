import { AxiosInstance } from "../../axios/axios";

interface CreateRestaurantPayload {
    name: string,
    description: string,
    phone: string,
    foodType: string,
    nearestPlace: string,
    address: {
        locality: string,
        city: string,
        state: string,
        pincode: string
    }
}

interface UpdateRestaurantPayload {
    id: string,
    name?: string,
    description?: string,
    phone?: string,
    foodType?: string,
    nearestPlace?: string,
    address?: {
        locality: string,
        city: string,
        state: string,
        pincode: string
    }
}

export const createRestaurant = async (data: CreateRestaurantPayload) => {
    const response = await AxiosInstance.post('/restaurant/create', data);
    return response.data;
}

export const updateRestaurant = async (data: UpdateRestaurantPayload) => {
    const { id, ...payload } = data;
    const response = await AxiosInstance.put(`/restaurant/update/${id}`, payload);
    return response.data;
}

export const deleteRestaurant = async (id: string) => {
    const response = await AxiosInstance.delete(`/restaurant/delete/${id}`);
    return response.data;
}

export const fetchAllRestaurant = async () => {
    const response = await AxiosInstance.get('/restaurant/get-restaurant');
    return response.data;
}