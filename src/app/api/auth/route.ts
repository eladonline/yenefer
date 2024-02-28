import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username, password } = await req.json();
  console.log(username, password);
  return NextResponse.json({ message: "POST OK" }, { status: 200 });
};

export const GET = async (req: Request) => {
  console.log("AUTHHHHHHHH");
  return NextResponse.json({ message: "GET OK" }, { status: 200 });
};
