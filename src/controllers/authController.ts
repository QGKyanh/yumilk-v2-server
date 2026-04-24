import type { Request, Response } from "express";
import * as authService from "../services/authService.js";
import type { RegisterInput } from "../schemas/authSchema.js";
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
