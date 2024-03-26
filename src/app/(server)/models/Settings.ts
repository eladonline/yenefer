import { Schema, model, models } from "mongoose";
import productSchema from "@/app/(server)/models/subModels/products";
import userSettingsSchema from "@/app/(server)/models/subModels/user";

const schema = new Schema({
  users_id: { type: String, required: true },
  config: {
    type: {
      user: userSettingsSchema,
      products: { type: [productSchema] },
    },
    required: true,
  },
});

export default models.settings || model("settings", schema);
