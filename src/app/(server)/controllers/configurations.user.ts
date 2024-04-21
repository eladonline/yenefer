import { NextRequest, NextResponse } from "next/server";
import User from "@/app/(server)/models/User";
import errorHandler from "@/app/(server)/handlers/errorHandler";

async function userController(request: NextRequest): Promise<NextResponse> {
  const id = request.headers.get("id");
  const user = await User.findById(id, "configurations -_id");

  if (user.configurations) {
    return NextResponse.json(user.configurations.settings.user, {
      status: 200,
    });
  } else throw new Error();
}

export const user = async (...args: any) => errorHandler(userController, args);
