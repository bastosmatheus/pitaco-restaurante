import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

type JwtPayload = {
  id: ObjectId;
  isAdmin: boolean;
};

class AuthMiddleware {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token || token === "") {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const { id, isAdmin } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

    if (!isAdmin) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    next();
  }
}

export default new AuthMiddleware();
