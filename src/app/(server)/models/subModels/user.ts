import { Schema } from "mongoose";
import { SettingsUserType } from "@/types/apis/settings";

const userSettingsSchema = new Schema<SettingsUserType>({
  user: { type: { username: String } },
});

export default userSettingsSchema;
