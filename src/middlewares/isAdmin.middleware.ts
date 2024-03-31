import { NextFunction, Response } from "express";
import createError from "http-errors";
import { IRequest } from "../interfaces/request.interface";
import { UserRole } from "../models/user.model";

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== UserRole.admin) {
    return next(createError(403, "You are not authorized to access this resource"));
  }
  next();
};

export default isAdmin;
