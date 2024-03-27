import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";

export const urlNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(createError(404, `Route not found`));
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const isDev = process.env.NODE_ENV?.trim() !== "production";

  if (err instanceof HttpError) statusCode = err.statusCode;

  res.status(statusCode).json({
    status: "error",
    url: isDev ? req.url : undefined,
    message: err.message,
    stack: isDev ? err?.stack : undefined,
  });
};
