import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ObjectId } from "mongoose";

type JwtPayload = {
  id: ObjectId;
};

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { name, lastname, username, email, password } = req.body;

    if (!name || name === "") {
      return res.status(422).json({
        message: "O campo de nome é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!lastname || lastname === "") {
      return res.status(422).json({
        message: "O campo de sobrenome é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!username || username === "") {
      return res.status(422).json({
        message: "O campo de nome de usuário é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const usernameExists = await User.findOne({ username: username });

    if (usernameExists) {
      return res.status(409).json({
        message: "Esse nome de usuário já existe",
        type: "Conflict",
        statusCode: 409,
      });
    }

    if (!email || email === "") {
      return res.status(422).json({
        message: "O campo de email é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!password || password === "") {
      return res.status(422).json({
        message: "O campo de senha é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({
        message: "Esse email já foi cadastrado",
        type: "Conflict",
        statusCode: 409,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: passwordHash,
    };

    const user = await User.create(newUser);

    if (!user) {
      return res.status(400).json({
        message: "Não foi possível criar o usuário",
        type: "Bad Request",
        statusCode: 400,
      });
    }

    return res.status(201).json({
      message: "O usuário foi criado com sucesso",
      type: "Created",
      statusCode: 201,
      user: user,
    });
  }

  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || email === "") {
      return res.status(422).json({
        message: "O campo de email é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!password || password === "") {
      return res.status(422).json({
        message: "O campo de senha é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email inválido", type: "Not Found", statusCode: 404 });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(404)
        .json({ message: "Senha inválida", type: "Not Found", statusCode: 404 });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_PASS ?? "", {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Autenticação realizada com sucesso",
      type: "OK",
      statusCode: 200,
      token: token,
    });
  }

  public async addDishesInCart(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    if (!token || token === "") {
      return res
        .status(422)
        .json({ message: "O token é obrigatório", type: "Unprocessable Entity", statusCode: 422 });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token inválido", type: "Unauthorized", statusCode: 401 });
      }

      return jwt.decode(token) as JwtPayload;
    });

    const user = await User.findOne({ _id: verifiedToken.id });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado", type: "Not Found", statusCode: 404 });
    }

    const { nameDish, image, valueTotal, quantityOfOrder } = req.body;

    if (!nameDish || nameDish === "") {
      return res.status(422).json({
        message: "O nome do prato é obrigatório",
        type: " Entity Entity",
        statusCode: 422,
      });
    }

    if (!image || image === "") {
      return res.status(422).json({
        message: "A imagem é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!valueTotal || valueTotal === "") {
      return res.status(422).json({
        message: "O valor total é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!quantityOfOrder || quantityOfOrder === "") {
      return res.status(422).json({
        message: "A quantidade do pedido é obrigatória",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const cart = user.cart;
    const dishes = cart.dishes;

    const existsDish = dishes.find((dish) => dish.nameDish === nameDish);

    if (existsDish !== undefined) {
      existsDish.image = image;
      existsDish.quantityOfOrder = quantityOfOrder;
      existsDish.valueTotal = valueTotal;

      const updateCart = await User.findOneAndUpdate({ _id: user._id }, { cart: cart });

      return res.status(200).json({ message: "Carrinho atualizado", type: "OK", statusCode: 200 });
    }

    cart.dishes.push({
      nameDish: nameDish,
      image: image,
      valueTotal: valueTotal,
      quantityOfOrder: quantityOfOrder,
    });

    const updateCart = await User.findOneAndUpdate({ _id: user._id }, { cart: cart });

    return res.status(200).json({
      message: "Prato adicionado ao carrinho",
      type: "OK",
      statusCode: 200,
    });
  }

  public async getDishesInCart(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    if (!token || token === "") {
      return res
        .status(422)
        .json({ message: "O token é obrigatório", type: "Unprocessable Entity", statusCode: 422 });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token inválido", type: "Unauthorized", statusCode: 401 });
      }

      return jwt.decode(token) as JwtPayload;
    });

    const user = await User.findOne({ _id: verifiedToken.id });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado", type: "Not Found", statusCode: 404 });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      cart: user.cart,
    });
  }
}

export default new UserController();
