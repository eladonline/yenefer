import databaseConnect from "@/app/(server)/services/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";

export async function signIn(req: NextRequest) {
  const { username, password } = await req.json();
  const { db } = await databaseConnect();
  const userDoc = await db?.collection("users").findOne({ email: username });
  try {
    if (!userDoc) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 404 },
      );
    }

    const isValidUser = await bcrypt.compare(password, userDoc.password);

    if (isValidUser) {
      const jwtService = new Jwt();
      return NextResponse.json(
        { message: "Success", token: jwtService.sign({ usr: username }) },
        { status: 200 },
      );
    } else
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
  } catch (err: any) {
    throw err;
  }
}

export async function test(req: NextRequest) {
  return NextResponse.json({ message: "All good" }, { status: 200 });
}
