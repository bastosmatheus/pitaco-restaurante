import { Router } from "express";
import DishController from "../controllers/DishController";

const routerDish = Router();

routerDish.get("/dishes", DishController.getAllDishes);
routerDish.get("/dishes/:id", DishController.getDishById);
routerDish.post("/dishes", DishController.createDish);
routerDish.post("/dishes/dishexists", DishController.dishExists);
routerDish.delete("/dishes/:id", DishController.deleteDish);
routerDish.put("/dishes/:id", DishController.updateDish);

export { routerDish };
