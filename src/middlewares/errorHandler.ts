import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  //Nếu lỗi có status code thì dùng, không thì 500
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal Server Error";

  if (!isAppError) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    //In lỗi khi dev, prod thì giấu
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
