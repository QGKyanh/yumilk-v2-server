import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Mở rộng interface Request của Express để chứa biến "user"
declare global {
  namespace Express {
    interface Request {
      user?: any; //Nên thay any bằng Interface, ví dụ IUser
    }
  }
}

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

//Authentication first
export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    //Lấy token từ header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Bạn chưa đăng nhập.", 401));
    }

    //Verify token
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;

      //1. Kiểm tra user có tồn tại trong DB không?
      //2. Giả sử tài khoản đã bị Admin xóa, nhưng token (trong tay user) vẫn còn hạn thì sao?
      //3. Chặn ngay từ DB
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError("Người dùng không còn tồn tại", 401));
      }

      //Cấp quyền đi tiếp
      req.user = currentUser;
      next();
    } catch (error) {
      return next(new AppError("Token không hợp lệ hoặc đã hết hạn", 401));
    }
  },
);

//Authorization
export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    //Nếu role của user hiện tại không nằm trong danh sách cho phép
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("Bạn không có quyền thực hiện hành động này", 403),
      );
    }
    next();
  };
};
