import { Schema, model, models } from "mongoose";
import userConfigurationsSchema from "@/app/(server)/models/subModels/configurations";
import { ConfigurationsType } from "@/types/apis/configurations";

const schema = new Schema<ConfigurationsType>({
  users_id: { type: String, required: true },
  settings: {
    type: {
      user: userConfigurationsSchema,
    },
    required: true,
  },
});

export default models.configurations || model("configurations", schema);
