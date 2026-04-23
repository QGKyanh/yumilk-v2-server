import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Tên là bắt buộc" })
      .trim()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự"),

    email: z.email("Email không đúng định dạng").toLowerCase(),

    password: z
      .string({ message: "Mật khẩu là bắt buộc" })
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .refine(
        (pwd) => /[A-Z]/.test(pwd),
        "Mật khẩu phải chứa ít nhất một chữ viết hoa",
      )
      .refine(
        (pwd) => /[0-9]/.test(pwd),
        "Mật khẩu phải chứa ít nhất một chữ số",
      ),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
