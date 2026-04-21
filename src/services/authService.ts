import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export const registerUser = async (userData: Partial<IUser>) => {
  const { name, email, password } = userData;

  //Check if essential data is provided
  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  //Check if the user is existed
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
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
