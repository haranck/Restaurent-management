import { Router } from "express";
import { userController, authMiddleware } from "../DI/resolver";
import { validateRequest } from "../middleware/validateRequest";
import { signupSchema, loginSchema } from "../validation/user.validation";
import { AUTH_ROUTES } from "../constants/routes.constant";

const router = Router();

router.post(AUTH_ROUTES.SIGNUP, validateRequest(signupSchema), userController.signup);
router.post(AUTH_ROUTES.LOGIN, validateRequest(loginSchema), userController.login);
router.post(AUTH_ROUTES.REFRESH_TOKEN, userController.refreshToken);
router.post(AUTH_ROUTES.LOGOUT, authMiddleware.authenticate, userController.logout);

export default router;
