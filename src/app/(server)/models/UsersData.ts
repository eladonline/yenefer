import { Schema, model, models } from "mongoose";
import productSchema from "@/app/(server)/models/subModels/usersData";
import { UsersDataType } from "@/types/apis/usersData";

const schema = new Schema<UsersDataType>({
  users_id: { type: String, required: true },
  products: { type: [productSchema], default: undefined },
});

export default models.usersData || model("usersData", schema, "usersData");
