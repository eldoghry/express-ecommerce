import { NextFunction, Response } from "express";
import createError from "http-errors";
import { IRequest } from "../interfaces/request.interface";
import { UserRole } from "../models/user.model";
import mongoose from "mongoose";

const isValidMongoId = (req: any, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) return next(createError(400, "Invalid mongoo id"));

  next();
};

export default isValidMongoId;
