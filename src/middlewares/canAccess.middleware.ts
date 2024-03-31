import { NextFunction, Response } from "express";
import createError from "http-errors";
import { IRequest } from "../interfaces/request.interface";
import { UserRole } from "../models/user.model";

const canAccess = (req: any, res: Response, next: NextFunction) => {
  const id = req.params.id;

  if (req.user.role !== UserRole.admin && req.user.id !== id) {
    return next(createError(403, "You are not authorized to access this resource"));
  }

  next();
};

export default canAccess;
