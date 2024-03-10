import { NextRequest, NextResponse } from "next/server";

export async function test(req: NextRequest) {
  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
