import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { body } = await req.json();
  console.log(body);
  return NextResponse.json({ message: "POST OK" }, { status: 200 });
};

export const GET = async (req: Request) => {
  console.log("AUTHHHHHHHH");
  return NextResponse.json({ message: "GET OK" }, { status: 200 });
};
