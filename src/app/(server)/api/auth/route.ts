import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  console.log(username, password);
  return NextResponse.json({ message: "POST OK" }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  console.log(req.cookies.get("token"));
  return NextResponse.json({ message: "GET OK" }, { status: 200 });
};
