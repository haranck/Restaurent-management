import { AxiosInstance } from "../../axios/axios";

interface SignupPayload {
    email: string,
    name: string,
    password: string
}

interface LoginPayload {
    email: string,
    password: string
}

export const signupUser = async (userData: SignupPayload) => {
    const response = await AxiosInstance.post('/auth/signup', userData);
    return response.data;
}

export const loginUser = async (userData: LoginPayload) => {
    const response = await AxiosInstance.post('/auth/login', userData);
    return response.data;
}

export const logoutUser = async () => {
    const response = await AxiosInstance.post('/auth/logout');
    return response.data;
}
