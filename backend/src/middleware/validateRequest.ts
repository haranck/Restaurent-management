import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { HttpStatus } from "../constants/httpStatus.enum";
import { ERROR_MESSAGES } from "../constants/messages.constant";

type RequestSource = "body" | "params" | "query";

export const validateRequest = (schema: ZodSchema, source: RequestSource = "body") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.VALIDATION_FAILED,
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        req[source] = result.data;
        next();
    };
};
