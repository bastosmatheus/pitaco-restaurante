import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

type JwtPayload = {
  id: ObjectId;
};

class AuthMiddleware {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json({ user: user });
      next();
    } catch (error) {
      return res.status(400).json({ message: "Token inválido!" });
    }
  }
}

export default new AuthMiddleware();
