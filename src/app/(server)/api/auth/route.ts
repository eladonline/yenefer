import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  console.log(username, password);
  return NextResponse.json({ message: "POST OK" }, { status: 200 });
};
