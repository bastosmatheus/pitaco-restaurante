import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  public async getAllUser(req: Request, res: Response): Promise<Response> {
    const userService = new UserService();

    const users = await userService.getAll();

    return res.status(200).json(users);
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.getById(id);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(200).json({ type: "OK", statusCode: 200, user: user.value });
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { name, lastname, username, email, password } = req.body;

    const userService = new UserService();

    const user = await userService.create(name, lastname, username, email, password);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "O usuário foi criado com sucesso",
      type: "Created",
      statusCode: 201,
      user: user.value,
    });
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { name, lastname, username, email, password } = req.body;

    const userService = new UserService();

    const user = await userService.update(id, name, lastname, username, email, password);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "O usuário foi atualizado com sucesso",
      type: "OK",
      statusCode: 200,
      user: user.value,
    });
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.delete(id);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "O usuário foi excluido com sucesso",
      type: "OK",
      statusCode: 200,
      user: user.value,
    });
  }

  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userService = new UserService();

    const user = await userService.loginUser(email, password);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Autenticação realizada com sucesso",
      type: "OK",
      statusCode: 200,
      token: user.value,
    });
  }

  public async addDishesInCart(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    const { nameDish, image, valueTotal, quantityOfOrder } = req.body;

    const userService = new UserService();

    const cart = await userService.addDishesInCart(
      token,
      nameDish,
      image,
      valueTotal,
      quantityOfOrder
    );

    if (cart.isFailure()) {
      return res.status(cart.value.statusCode).json({
        message: cart.value.message,
        type: cart.value.type,
        statusCode: cart.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Carrinho atualizado",
      type: "OK",
      statusCode: 200,
    });
  }

  public async getDishesInCart(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    const userService = new UserService();

    const user = await userService.getDishesInCart(token);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json({
        message: user.value.message,
        type: user.value.type,
        statusCode: user.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      cart: user.value.cart,
    });
  }
}

export default new UserController();
