import { HttpStatus } from "../constants/httpStatus.enum";

export class AppError extends Error {
    public readonly statusCode: HttpStatus;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: HttpStatus, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
