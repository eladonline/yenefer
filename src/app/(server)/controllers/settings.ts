import { NextRequest, NextResponse } from "next/server";
import SettingsModel from "@/app/(server)/models/Settings";
import errorHandler from "@/app/(server)/handlers/errorHandler";

async function userController(req: NextRequest): Promise<NextResponse> {
  const id = req.headers.get("id");
  const settings = await SettingsModel.findOne({ users_id: id });
  if (settings) {
    return NextResponse.json(settings.config, { status: 200 });
  } else throw new Error();
}

export const user = async (...args: any) => errorHandler(userController, args);
