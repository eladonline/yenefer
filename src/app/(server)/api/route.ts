import { NextRequest, NextResponse } from "next/server";

export async function test(req: NextRequest) {
  try {
  } catch (err: any) {
    console.log(err.stack);
  }
  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
