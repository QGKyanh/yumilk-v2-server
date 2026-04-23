import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Nếu lỗi có status code thì dùng, không thì 500
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    //In lỗi khi dev, prod thì giấu
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
