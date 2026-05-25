import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
