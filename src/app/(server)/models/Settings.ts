import { Schema, model, models } from "mongoose";

type SettingsType = {
  users_id: string;
  config: {
    user: { name: string };
  };
};

const schema = new Schema<SettingsType>({
  users_id: { type: String, required: true },
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
