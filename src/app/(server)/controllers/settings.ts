import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";
import { headers } from "next/headers";
import SettingsModel from "@/app/(server)/models/Settings";

export async function user(req: NextRequest): Promise<NextResponse> {
  console.log(req.headers.get("id"));

  const authorization = headers().get("authorization");
  const jwtService = new Jwt();

  const [, token] = String(authorization).split(" ");
  const payload = jwtService.verify(token);

  if (typeof payload === "object") {
    const settings = await SettingsModel.findOne({ users_id: payload.id });

    if (settings) {
      return NextResponse.json(settings.config, { status: 200 });
    }
  }

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 },
  );
}
