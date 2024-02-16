import { Router } from "express";
import FoodController from "../controllers/FoodController";

const routerFood = Router();

routerFood.get("/dishes", FoodController.getAllDishes);
routerFood.get("/dishes/:id", FoodController.getDishById);
routerFood.post("/dishes", FoodController.createDish);
routerFood.post("/dishes/dishexists", FoodController.dishExists);
routerFood.delete("/dishes/:id", FoodController.deleteDish);
routerFood.put("/dishes/:id", FoodController.updateDish);

export { routerFood };
