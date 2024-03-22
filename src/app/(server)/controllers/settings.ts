import { NextRequest, NextResponse } from "next/server";
import SettingsModel from "@/app/(server)/models/Settings";

export async function user(req: NextRequest): Promise<NextResponse> {
  const id = req.headers.get("id");

  const settings = await SettingsModel.findOne({ users_id: id });

  if (settings) {
    return NextResponse.json(settings.config, { status: 200 });
  }

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 },
  );
}
