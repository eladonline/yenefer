import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import SettingsModel from "@/app/(server)/models/Settings";

export const createProductController = async (request: NextRequest) => {
  const id = request.headers.get("id");

  const settings = await SettingsModel.findOne({ users_id: id });
  console.log(settings);
  return NextResponse.json({ message: "create products" }, { status: 200 });
};

export const createProduct = async (...args: any) =>
  errorHandler(createProductController, args);
