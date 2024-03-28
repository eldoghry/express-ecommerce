import { Request, Response } from "express";
import User from "../models/user.model";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import * as userService from "../services/user.service";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const isFound = await userService.findOne({ email });
  if (isFound) throw createError(400, "Email already exists");

  const user = await userService.create(req.body);
  res.status(201).json(user);
});

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.findAll();
  res.status(201).json(users);
});

export { createUser, findAll };
