import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response | undefined> {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(422).json({ message: "O campo de nome é obrigatório" });
    }

    if (!email) {
      return res.status(422).json({ message: "O campo de email é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "O campo de senha é obrigatório" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Email já está em uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      username: username,
      email: email,
      password: passwordHash,
    };

    const user = User.create(newUser);

    return res.status(201).json({ message: "o usuário foi criado com sucesso", user: newUser });
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O campo de email é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "O campo de senha é obrigatório" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_PASS ?? "");

    return res.status(200).json({ message: "Autenticação realizada com sucesso", token: token });
  }
}

export default new UserController();
