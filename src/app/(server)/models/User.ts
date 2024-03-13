import { Schema, model, models } from "mongoose";

type UserType = {
  email: string;
  password: string;
  license?: string;
};

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  license: String,
});

export default models.users || model("users", schema);
