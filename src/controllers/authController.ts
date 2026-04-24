import { Request, Response } from "express";
import * as authService from "../services/authService";
import { RegisterInput } from "../schemas/authSchema";
import { catchAsync } from "../utils/catchAsync";

type RegisterRequest = Request<Record<string, never>, any, RegisterInput>;

export const register = catchAsync(
  async (req: RegisterRequest, res: Response) => {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      user,
    });
  },
);
