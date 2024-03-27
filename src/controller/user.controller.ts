import { Request, Response } from "express";
import User from "../models/user.model";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const isFound = await User.findOne({ email });

  if (isFound) throw createError(400, "Email already exists");

  const user = await User.create(req.body);
  res.status(201).json(user);
});

export { createUser };
