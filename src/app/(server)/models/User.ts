import { Schema, model, models } from "mongoose";
import configurationsSchema from "@/app/(server)/models/sub-models/user/configurations";
import userDataSchema from "@/app/(server)/models/sub-models/user/usersData";
import { UsersDataType } from "@/types/apis/usersData";
import { ConfigurationsType } from "@/types/apis/configurations";

export type UserType = {
  email: string;
  password: string;
  license?: string;
  configurations: ConfigurationsType;
  data?: UsersDataType;
};

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  license: String,
  configurations: configurationsSchema,
  data: userDataSchema,
});

export default models.users || model("users", schema);
