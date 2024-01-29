import { Router } from "express";
import UserController from "../controllers/UserController";

const routerUsers = Router();

routerUsers.post("/register", UserController.createUser);
routerUsers.post("/login", UserController.loginUser);

export { routerUsers };
