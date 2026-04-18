import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
