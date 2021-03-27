import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  isAuth: boolean;
  userId?: number;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader: string = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token: string = authHeader.split(" ")[1];
  let decodedToken: { userId: number };
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
