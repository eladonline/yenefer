type SettingsForm = {
  name: string;
  type: "text" | "number" | "textarea" | "select";
  options?: string[];
};

type SettingsType = {
  pointer: string;
  type: "text" | "number" | "textarea" | "select";
  config: {
    forms?: SettingsForm[];
  };
  options?: string[];
};
import { Schema, model, models } from "mongoose";

const schema = new Schema<SettingsType>({
  pointer: { type: String, required: true },
  config: {
    type: {
      forms: {
        type: [
          {
            name: String,
            type: { type: { type: String, required: true } },
            options: [String],
          },
        ],
        default: undefined,
      },
    },
    required: true,
  },
});

export default models.settings || model("settings", schema);
