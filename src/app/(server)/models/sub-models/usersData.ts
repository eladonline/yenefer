import { Schema } from "mongoose";
import { ProductType } from "@/types/apis/usersData";

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  created: { type: Date, default: Date.now() },
  terms: {
    min_price: { type: Number, required: true },
    discount_each_buyer: { type: Number, required: true },
    end_date: { type: Date, required: true },
    max_buyers: { type: Number, required: true },
  },
});

export default productSchema;
