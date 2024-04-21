import { Schema } from "mongoose";
import { ConfigurationsType } from "@/types/apis/configurations";

const schema = new Schema<ConfigurationsType>({
  settings: {
    type: {
      user: {
        username: String,
      },
    },
    required: true,
  },
});

export default schema;
