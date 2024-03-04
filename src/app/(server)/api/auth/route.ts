import { NextResponse, NextRequest } from "next/server";
import { signIn } from "./controller";

export async function PATCH(req: NextRequest) {
  const { username, password } = await req.json();
  const signInToken = await signIn(username, password);

  return NextResponse.json({ message: "POST OK" }, { status: 200 });
}
