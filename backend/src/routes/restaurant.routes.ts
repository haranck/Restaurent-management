import { Router } from "express";
import { restaurantController, authMiddleware } from "../DI/resolver";
import { upload } from "../middleware/uploadMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { createRestaurantBodySchema, updateRestaurantBodySchema, restaurantIdParamSchema } from "../validation/restaurant.validation";
import { RESTAURANT_ROUTES } from "../constants/routes.constant";

const router = Router();

router.post(
    RESTAURANT_ROUTES.CREATE,
    authMiddleware.authenticate,
    upload.single("image"),
    validateRequest(createRestaurantBodySchema),
    restaurantController.create
);

router.get(RESTAURANT_ROUTES.GET_ALL, restaurantController.fetchAll);

router.get(RESTAURANT_ROUTES.GET_MINE, authMiddleware.authenticate, restaurantController.fetchMine);

router.put(
    RESTAURANT_ROUTES.UPDATE,
    authMiddleware.authenticate,
    upload.single("image"),
    validateRequest(restaurantIdParamSchema, "params"),
    validateRequest(updateRestaurantBodySchema),
    restaurantController.update
);

router.delete(
    RESTAURANT_ROUTES.DELETE,
    authMiddleware.authenticate,
    validateRequest(restaurantIdParamSchema, "params"),
    restaurantController.delete
);

export default router;
