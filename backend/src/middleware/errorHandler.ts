import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { HttpStatus } from "../constants/httpStatus.enum";
import { ERROR_MESSAGES } from "../constants/messages.constant";

export const globalErrorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    console.error("Unexpected Error:", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
};
