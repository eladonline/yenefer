import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";

export async function test(req: NextRequest) {
  try {
    const jwt = new Jwt();
    const date = new Date();
    delete jwt.defaultOptions.expiresIn;
    console.log(jwt.sign({ int: date.toString() }));
  } catch (err: any) {
    console.log(err.stack);
  }
  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
