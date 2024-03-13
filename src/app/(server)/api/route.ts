import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/(server)/models/User";

export async function test(req: NextRequest) {
  try {
    const userDoc = new UserModel({
      email: "test@e.com",
      password: "abc123",
    });
    await userDoc.save();
    const user = await UserModel.findOne({ email: "pro@e.com" });
    console.log(user);
  } catch (err: any) {
    console.log(err.stack);
  }
  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
