import type { Request, Response } from "express";
import * as authService from "../services/authService.js";
import type { LoginInput, RegisterInput } from "../schemas/authSchema.js";
import { catchAsync } from "../utils/catchAsync.js";

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

type LoginRequest = Request<Record<string, never>, any, LoginInput>;

export const login = catchAsync(async (req: LoginRequest, res: Response) => {
  const { user, token } = await authService.loginUser(req.body);

  return res.status(200).json({
    success: true,
    token,
    user,
  });
});
