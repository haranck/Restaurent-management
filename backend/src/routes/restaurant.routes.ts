import { Router } from "express";
import { restaurantController, authMiddleware } from "../DI/resolver";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.post("/create", authMiddleware.authenticate, upload.single("image"), restaurantController.create);
router.get("/get-restaurant", restaurantController.fetchAll);
router.get("/get-my-restaurant", authMiddleware.authenticate, restaurantController.fetchMine);
router.put("/update/:id", authMiddleware.authenticate, upload.single("image"), restaurantController.update);
router.delete("/delete/:id", authMiddleware.authenticate, restaurantController.delete);

export default router;
