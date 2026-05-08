import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { injectable, inject } from "tsyringe";
import { IRestaurantCreateService } from "../services/restaurant/create/IRestaurantCreateService";
import { IRestaurantUpdateService } from "../services/restaurant/update/IRestaurantUpdateService";
import { IRestaurantDeleteService } from "../services/restaurant/delete/IRestaurantDeleteService";
import { IFetchRestaurantService } from "../services/restaurant/fetch/IFetchRestaurantService";
import { HttpStatus } from "../constants/httpStatus.enum";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages.constant";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { AppError } from "../errors";

@injectable()
export class RestaurantController {
    constructor(
        @inject("IRestaurantCreateService") private readonly _createService: IRestaurantCreateService,
        @inject("IRestaurantUpdateService") private readonly _updateService: IRestaurantUpdateService,
        @inject("IRestaurantDeleteService") private readonly _deleteService: IRestaurantDeleteService,
        @inject("IFetchRestaurantService") private readonly _fetchService: IFetchRestaurantService
    ) {}

    create = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.USER_NOT_AUTHENTICATED);
                return;
            }

            const { name, description, phone, foodType, nearestPlace, address } = req.body;

            const restaurant = await this._createService.create({
                name,
                description,
                phone,
                foodType,
                nearestPlace,
                address,
                userId,
            }, req.file);

            sendSuccess(res, HttpStatus.CREATED, SUCCESS_MESSAGES.RESTAURANT_CREATED, { restaurant });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            const { name, description, phone, foodType, nearestPlace, address } = req.body;

            const restaurant = await this._updateService.update(id, {
                name,
                description,
                phone,
                foodType,
                nearestPlace,
                address,
            }, req.file);

            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.RESTAURANT_UPDATED, { restaurant });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            await this._deleteService.delete(id);
            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.RESTAURANT_DELETED);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    fetchAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const restaurants = await this._fetchService.fetchAll();
            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.RESTAURANTS_FETCHED, { restaurants });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }

    fetchMine = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                sendError(res, HttpStatus.UNAUTHORIZED, ERROR_MESSAGES.USER_NOT_AUTHENTICATED);
                return;
            }
            const restaurants = await this._fetchService.fetchByUser(userId);
            sendSuccess(res, HttpStatus.OK, SUCCESS_MESSAGES.USER_RESTAURANTS_FETCHED, { restaurants });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                sendError(res, error.statusCode, error.message);
                return;
            }
            const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            sendError(res, HttpStatus.INTERNAL_SERVER_ERROR, message);
        }
    }
}
