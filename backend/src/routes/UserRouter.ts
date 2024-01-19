import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const routerUsers = Router();

routerUsers.post("/register", UserController.createUser);
routerUsers.post("/login", UserController.loginUser);
routerUsers.get("/login", AuthMiddleware.verifyToken);

export { routerUsers };
