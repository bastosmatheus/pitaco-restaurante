import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const routerOrders = Router();

routerOrders.get("/orders", OrdersController.getAllOrders);

export { routerOrders };
