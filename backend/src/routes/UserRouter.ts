import { Router } from "express";
import UserController from "../controllers/UserController";

const routerUsers = Router();

routerUsers.post("/user/register", UserController.createUser);
routerUsers.post("/user/login", UserController.loginUser);
routerUsers.post("/user/cart/:token", UserController.addItemsInCart);
routerUsers.get("/user/cart/:token", UserController.getItemsInCart);

export { routerUsers };
