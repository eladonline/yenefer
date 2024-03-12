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
        {
          message: "Success",
          token: jwtService.sign({
            usr: userDoc.email,
            license: userDoc.license,
          }),
        },
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

export async function signUp(req: NextRequest) {
  const { username: email, password } = await req.json();
  const license = "basic";
  const { db } = await databaseConnect();

  try {
    const alreadyExists = await db?.collection("users").findOne({ email });
    if (alreadyExists)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );

    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);

    await db?.collection("users").insertOne({ email, password: hash, license });

    const jwtUtil = new Jwt();
    const token = jwtUtil.sign({ usr: email, license });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err: Error | any) {
    console.error(err.stack);
    return NextResponse.json(
      { message: "Something went wrong please try again later..." },
      { status: 500 },
    );
  }
}
