import { Request, Response } from "express";
import { Orders } from "../models/Orders";

class OrdersController {
  public async getAllOrders(_req: Request, res: Response): Promise<Response> {
    const orders = await Orders.find();

    return res.status(200).send(orders);
  }
}

export default new OrdersController();
