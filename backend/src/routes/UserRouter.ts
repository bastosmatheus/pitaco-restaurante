import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter {
  public allRoutes() {
    const routerUser = Router();

    routerUser.post("/user/register", UserController.createUser);
    routerUser.post("/user/login", UserController.loginUser);
    routerUser.post("/user/cart/:token", UserController.addDishesInCart);
    routerUser.get("/user/cart/:token", UserController.getDishesInCart);
  }
}

export default new UserRouter();
