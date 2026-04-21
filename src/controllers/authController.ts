import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    //Retrieve data from req body
    const { name, email, password } = req.body;

    //Simple validate
    if (!name || !email || !password) {
      res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
      return;
    }

    //Call service
    const user = await authService.registerUser({ name, email, password });

    res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
