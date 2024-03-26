import { Schema } from "mongoose";
import { SettingsUserType } from "@/types/apis/configurations";

const userSettingsSchema = new Schema<SettingsUserType>({
  username: String,
});

export default userSettingsSchema;
