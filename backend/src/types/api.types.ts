import { HttpStatus } from "../constants/httpStatus.enum";

export interface IApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface IErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}
