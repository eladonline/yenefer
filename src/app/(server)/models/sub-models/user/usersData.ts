import { Schema } from "mongoose";
import { ProductType, UsersDataType } from "@/types/apis/usersData";

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  category: { type: String, required: true, lowercase: true },
  description: String,
  price: { type: Number, default: 0 },
  created: { type: Date, default: Date.now() },
  terms: {
    min_price: { type: Number, required: true },
    discount_each_buyer: {
      type: { value: Number, unit: { type: String, default: "NIS" } },
      required: true,
    },
    end_date: { type: Date, required: true },
    quantity: { type: Number, required: true },
  },
  images: {
    type: [
      {
        meta: { signature: String, public_id: String, folder: String },
        src: { url: String, secure_url: String },
      },
    ],
    default: undefined,
  },
});

const schema = new Schema<UsersDataType>({
  products: { type: [productSchema], default: undefined },
});

export default schema;
