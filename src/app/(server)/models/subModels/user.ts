import { Schema } from "mongoose";

const userSettingsSchema = new Schema({
  user: { type: { username: String } },
});

export default userSettingsSchema;
