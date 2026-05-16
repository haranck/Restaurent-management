import { Response } from "express";
import { HttpStatus } from "../constants/httpStatus.enum";
import { IApiResponse } from "../types/api.types";

export const sendSuccess = <T>(
    res: Response,
    statusCode: HttpStatus,
    message: string,
    data?: T
): void => {
    const response: IApiResponse<T> = { success: true, message };
    if (data !== undefined) {
        response.data = data;
    }
    res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    statusCode: HttpStatus,
    message: string
): void => {
    const response: IApiResponse = { success: false, message };
    res.status(statusCode).json(response);
};
