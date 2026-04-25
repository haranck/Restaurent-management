import { Router } from "express";
import { userController } from "../DI/resolver";

const router = Router()

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/logout',userController.logout)

export default router
