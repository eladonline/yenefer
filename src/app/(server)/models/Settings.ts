type SettingsForm = {
  name: string;
  fields: {
    fieldType: "text" | "number" | "textarea" | "select";
    options?: string[];
    label: string;
  }[];
};

type SettingsType = {
  pointer: string;
  config: {
    forms?: SettingsForm[];
  };
};
import { Schema, model, models } from "mongoose";

const schema = new Schema<SettingsType>({
  pointer: { type: String, required: true },
  config: {
    type: {
      forms: {
        type: [
          {
            name: { type: String, required: true },
            fields: [
              {
                label: { type: String, required: true },
                fieldType: { type: String, required: true },
                options: { type: [String], default: undefined },
              },
            ],
          },
        ],
        required: true,
        default: undefined,
      },
    },
    required: true,
    default: undefined,
  },
});

export default models.settings || model("settings", schema);

export const modelConfigExample = {
  forms: [
    {
      name: "example",
      fields: [
        {
          label: "my text label",
          fieldType: "text",
        },
        {
          label: "my select label",
          fieldType: "select",
          options: ["banana", "orange"],
        },
        {
          label: "my textArea label",
          fieldType: "textArea",
        },
        {
          label: "my number label",
          fieldType: "number",
        },
      ],
    },
  ],
};
