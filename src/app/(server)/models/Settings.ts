import { Schema, model, models } from "mongoose";

type SettingsType = {
  pointer: string;
  config: {
    user: {};
  };
};

const schema = new Schema<SettingsType>({
  pointer: { type: String, required: true },
  config: {
    type: {
      user: {
        name: String,
      },
    },
    required: true,
  },
});

export default models.settings || model("settings", schema);
