import { Request, Response, NextFunction } from "express";

// Nhận vào một hàm async (Controller) và trả về một hàm bọc nó, tự động đẩy lỗi vào next()
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
