import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";

export const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404, `Route not found`));
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const isDev = process.env.NODE_ENV?.trim() !== "production";

  console.log(err, typeof err);
  if (err instanceof HttpError) statusCode = err.statusCode;

  res.status(statusCode).json({
    message: err.message,
    status: "error",
    url: isDev ? req.url : undefined,
    stack: isDev ? err?.stack : undefined,
  });
};

export const validateDtoMiddleware = function <T>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoInstance as object);

    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints!)).join(", ");
      next(createError(400, messages));
    }

    next();
  };
};
