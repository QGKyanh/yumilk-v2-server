import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true }, //index for faster searching
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
