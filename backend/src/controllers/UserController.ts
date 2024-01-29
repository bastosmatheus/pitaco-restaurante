import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response | undefined> {
    const { name, lastname, username, email, password } = req.body;

    if (!name) {
      return res.status(422).json({ message: "O campo de nome é obrigatório" });
    }

    if (!lastname) {
      return res.status(200).json({ message: "O campo de sobrenome é obrigatório" });
    }

    if (!username) {
      return res.status(200).json({ message: "O campo de nome de usuário é obrigatório" });
    }

    const usernameExists = await User.findOne({ username: username });

    if (usernameExists) {
      return res.status(422).json({ message: "Username já está em uso" });
    }

    if (!email) {
      return res.status(200).json({ message: "O campo de email é obrigatório" });
    }

    if (!password) {
      return res.status(200).json({ message: "O campo de senha é obrigatório" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Email já está em uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      lastname,
      username,
      email,
      password: passwordHash,
    };

    const user = User.create(newUser);

    return res.status(201).json({
      message: "O usuário foi criado com sucesso",
    });
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
      return res.status(404).json({ message: "Email inválido" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_PASS ?? "", {
      expiresIn: "3h",
    });

    return res.status(200).json({ message: "Autenticação realizada com sucesso", token: token });
  }
}

export default new UserController();
