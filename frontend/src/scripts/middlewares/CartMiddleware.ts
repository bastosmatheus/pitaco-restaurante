import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class CartMiddleware {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;

    if (!token || token === "") {
      return res.redirect("/loggedout");
    }

    if (typeof token === "string") {
      const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err) => {
        if (err?.message === "jwt malformed") {
          return res.redirect("/loggedout");
        }

        if (err?.message === "jwt expired") {
          return res.redirect("/loginexpired");
        }
      });
    }

    next();
  }
}

export default new CartMiddleware();
