import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";
import { headers } from "next/headers";
import SettingsModel from "@/app/(server)/models/Settings";

export async function forms(req: NextRequest): Promise<NextResponse> {
  const authorization = headers().get("authorization");
  const jwtService = new Jwt();

  const [, token] = String(authorization).split(" ");
  const payload = jwtService.verify(token);

  if (typeof payload === "object") {
    const settings = await SettingsModel.findOne({ pointer: payload.usr });

    if (settings) {
      return NextResponse.json(settings.config, { status: 200 });
    }
  }

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 },
  );
}
