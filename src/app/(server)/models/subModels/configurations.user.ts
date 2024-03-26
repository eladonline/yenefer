import { Schema } from "mongoose";
import { SettingsUserType } from "@/types/apis/configurations";

const userSettingsSchema = new Schema<SettingsUserType>({
  user: { type: { username: String } },
});

export default userSettingsSchema;
