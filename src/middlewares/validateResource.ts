import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    //Dùng safeParse để tránh trycatch và tăng hiệu năng
    const result = schema.safeParse(req.body);

    if (!result.success) {
      //Lấy câu thông báo lỗi đầu tiên
      const message = result.error.issues[0]?.message || "Validation failed";

      //Luôn dùng return next() trong Middleware để Express điều hướng lỗi an toàn
      return next(new AppError(message, 400));
    }

    //Gắn lại body bằng dữ liệu đã được làm sạch (trim, lowerCase, loại bỏ rác)
    req.body = result.data;
    next();
  };
};
