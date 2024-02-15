import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: ObjectId;
  isAdmin: boolean;
};

class AuthMiddleware {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;

    if (!token || token === "") {
      return res.redirect("/login");
    }

    if (typeof token === "string") {
      const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err) => {
        if (err) {
          return res.redirect("/register");
        }

        return jwt.decode(token) as JwtPayload;
      });

      if (verifiedToken !== undefined) {
        if (!verifiedToken.isAdmin) {
          return res.redirect("/");
        }
      }
    }

    next();
  }
}

export default new AuthMiddleware();
