import { generateToken } from "./../utils/jwt.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import type { LoginInput, RegisterInput } from "../schemas/authSchema.js";
import { jwt } from "zod";

export const registerUser = async (userData: RegisterInput) => {
  const { name, email, password } = userData;

  //Check if the user is existed
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email đã tồn tại", 400);
  }

  //Hashing password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //Store user in db
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

export const loginUser = async (loginData: LoginInput) => {
  const { email, password } = loginData;

  //Model cài select: false cho password, findOne mặc định không lấy password ra
  // Phải dùng .select('+password') để ép Mongoose nhả password ra
  const user = await User.findOne({ email }).select("+password");

  //Không bao giờ báo lỗi RIÊNG LẺ để tránh rò rỉ thông tin
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Email hoặc mật khẩu không chính xác", 401);
  }

  const token = generateToken(user._id.toString(), user.role);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
