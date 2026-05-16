import { AxiosInstance } from "../../axios/axios";
import type { IApiResponse, IAuthResponse, AuthUser } from "@/types";

interface SignupPayload {
    email: string;
    name: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const signupUser = async (userData: SignupPayload): Promise<IApiResponse<{ user: AuthUser }>> => {
    const response = await AxiosInstance.post('/auth/signup', userData);
    return response.data;
}

export const loginUser = async (userData: LoginPayload): Promise<IApiResponse<IAuthResponse>> => {
    const response = await AxiosInstance.post('/auth/login', userData);
    return response.data;
}

export const logoutUser = async (): Promise<IApiResponse> => {
    const response = await AxiosInstance.post('/auth/logout');
    return response.data;
}
