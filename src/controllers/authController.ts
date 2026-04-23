import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import { RegisterInput } from "../schemas/authSchema";

type RegisterRequest = Request<Record<string, never>, any, RegisterInput>;

export const register = async (req: RegisterRequest, res: Response) => {
  const user = await authService.registerUser(req.body);

  return res.status(201).json({
    success: true,
    user,
  });
};
