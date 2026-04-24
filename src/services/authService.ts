import bcrypt from "bcrypt";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import type { RegisterInput } from "../schemas/authSchema.js";

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
