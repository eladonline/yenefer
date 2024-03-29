import { Schema } from "mongoose";
import { ProductType } from "@/types/apis/usersData";

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  created: Date,
});

export default productSchema;
