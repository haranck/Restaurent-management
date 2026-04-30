import { AxiosInstance } from "../../axios/axios";

interface CreateRestaurantPayload {
    name: string;
    description?: string;
    phone: string;
    foodType: string;
    nearestPlace?: string;
    image?: File;
    address: {
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
}

interface UpdateRestaurantPayload {
    id: string;
    name?: string;
    description?: string;
    phone?: string;
    foodType?: string;
    nearestPlace?: string;
    image?: File;
    address?: {
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
}

export const createRestaurant = async (data: CreateRestaurantPayload) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("phone", data.phone);
    formData.append("foodType", data.foodType);
    if (data.nearestPlace) formData.append("nearestPlace", data.nearestPlace);
    formData.append("address", JSON.stringify(data.address));
    if (data.image) formData.append("image", data.image);

    const response = await AxiosInstance.post("/restaurant/create", formData);
    return response.data;
};

export const updateRestaurant = async (data: UpdateRestaurantPayload) => {
    const { id, image, address, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });
    if (address) formData.append("address", JSON.stringify(address));
    if (image) formData.append("image", image);

    const response = await AxiosInstance.put(`/restaurant/update/${id}`, formData);
    return response.data;
};

export const deleteRestaurant = async (id: string) => {
    const response = await AxiosInstance.delete(`/restaurant/delete/${id}`);
    return response.data;
};

export const fetchAllRestaurant = async () => {
    const response = await AxiosInstance.get("/restaurant/get-restaurant");
    return response.data;
};

export const fetchMyRestaurants = async () => {
    const response = await AxiosInstance.get("/restaurant/get-my-restaurant");
    return response.data;
};