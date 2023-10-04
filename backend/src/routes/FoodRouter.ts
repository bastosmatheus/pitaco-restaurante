import { Router } from "express";
import FoodController from "../controllers/FoodController";

export const routerFood = Router();

routerFood.get("/alldishs", FoodController.getAllDishs);
routerFood.get("/dish/:id", FoodController.getDishById);
routerFood.post("/dish", FoodController.createDish);
routerFood.delete("/dish/:id", FoodController.deleteDish);
routerFood.put("/dish/:id", FoodController.updateDish);
