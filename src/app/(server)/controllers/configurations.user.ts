import { NextRequest, NextResponse } from "next/server";
import ConfigurationsModel from "@/app/(server)/models/Configurations";
import errorHandler from "@/app/(server)/handlers/errorHandler";

async function userController(request: NextRequest): Promise<NextResponse> {
  const id = request.headers.get("id");
  const configs = await ConfigurationsModel.findOne({ users_id: id }).select(
    "-settings.user._id",
  );

  if (configs) {
    return NextResponse.json(configs.settings.user, { status: 200 });
  } else throw new Error();
}

export const user = async (...args: any) => errorHandler(userController, args);
