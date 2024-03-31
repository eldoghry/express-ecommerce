import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import * as userService from "../services/user.service";
import User, { UserStatus } from "../models/user.model";
import * as JWT from "../config/jwt";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const isFound = await userService.findOne({ email });

  if (isFound) throw createError(400, "Email already exists");

  const user = await userService.create(req.body);

  const payload = {
    id: user._id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
  };

  const tokens = {
    accessToken: JWT.sign(payload),
    refreshToken: JWT.refreshToken(payload),
  };

  res.status(201).json({ tokens });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).populate("password");

  if (!user) throw createError(401, "Invalid credentials");
  else if (user.status === UserStatus.blocked) throw createError(403, "Your account is blocked");

  const isPasswordConfirmed = await user.isPasswordMatched(password);
  if (!isPasswordConfirmed) throw createError(401, "Invalid credentials");

  const payload = {
    id: user._id,
    role: user.role,
    status: user.status,
  };

  const tokens = {
    accessToken: JWT.sign(payload),
    refreshToken: JWT.refreshToken(payload),
  };

  res.status(200).json({ user: payload, tokens });
});

export { register, login };
