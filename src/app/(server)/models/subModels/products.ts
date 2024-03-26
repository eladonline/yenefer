import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
});

export default productSchema;
