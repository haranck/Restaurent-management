import { Router } from "express";
import { userController, authMiddleware } from "../DI/resolver";

const router = Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/refresh-token',userController.refreshToken)
router.post('/logout', authMiddleware.authenticate, userController.logout)

export default router
