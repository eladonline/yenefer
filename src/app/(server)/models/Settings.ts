import { Schema, model, models } from "mongoose";
import productSchema from "@/app/(server)/models/subModels/product";
import userSettingsSchema from "@/app/(server)/models/subModels/user";
import { SettingsType } from "@/types/apis/settings";

const schema = new Schema<SettingsType>({
  users_id: { type: String, required: true },
  config: {
    type: {
      user: userSettingsSchema,
    },
    required: true,
  },
  products: { type: [productSchema] },
});

export default models.settings || model("settings", schema);
