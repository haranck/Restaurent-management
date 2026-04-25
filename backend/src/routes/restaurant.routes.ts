import { Router } from "express";
import { restaurantController } from "../DI/resolver";

const router = Router();

router.post("/create", restaurantController.create);
router.get("/get-restaurant", restaurantController.fetchAll);
router.put("/update/:id", restaurantController.update);
router.delete("/delete/:id", restaurantController.delete);

export default router;
