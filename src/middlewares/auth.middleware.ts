import { NextFunction, Response, Request } from "express";
import createError from "http-errors";
import { IRequest, IUser } from "../interfaces/request.interface";
import { verify } from "../config/jwt";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(createError(401, "Invalid or missing token"));

  const decoded = verify(token) as IUser;

  (req as IRequest).user = decoded || {};
  next();
};

export default authMiddleware;
