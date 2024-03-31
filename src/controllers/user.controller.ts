import { Request, Response } from "express";
import User, { UserStatus } from "../models/user.model";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import * as userService from "../services/user.service";
import { IRequest } from "../interfaces/request.interface";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const isFound = await userService.findOne({ email });
  if (isFound) throw createError(400, "Email already exists");

  const user = await userService.create(req.body);
  res.status(201).json(user);
});

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.findAll();
  res.status(201).json({ total: users.length, data: users });
});

const findOne = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.findOne({ _id: id });
  res.status(200).json({ user });
});

const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const isDeleted = await userService.deleteOne(id);
  if (!isDeleted) throw createError(404, "User not found");
  res.status(200).json({ message: "User deleted successfully" });
});

const updateOne = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.updateOne(id, { ...req.body });
  res.status(200).json({ user });
});

const blockUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.updateOne(id, { status: UserStatus.blocked });
  res.status(200).json({ user });
});

const unblockUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.updateOne(id, { status: UserStatus.active });
  res.status(200).json({ user });
});

export { createUser, findAll, findOne, deleteOne, updateOne, blockUser, unblockUser };
