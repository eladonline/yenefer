import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";
import UserModel from "@/app/(server)/models/User";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import { AccessControlLevelType } from "@/types/accessControl.def";

async function signInController(req: NextRequest) {
  const { username, password } = await req.json();

  const userDoc = await UserModel.findOne({ email: username });

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
          id: userDoc.id,
        }),
      },
      { status: 200 },
    );
  } else
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 },
    );
}

async function signUpController(req: NextRequest) {
  const { username: email, password } = await req.json();
  const license: AccessControlLevelType = "seller";

  const alreadyExists = await UserModel.findOne({ email });
  if (alreadyExists)
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 },
    );

  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  const hash = await bcrypt.hash(password, salt);

  const user = new UserModel({
    email,
    password: hash,
    license,
    configurations: {
      settings: {
        user: { username: email },
      },
    },
  });

  await user.save();

  const jwtUtil = new Jwt();
  const token = jwtUtil.sign({ usr: email, license, id: user._id });

  return NextResponse.json({ token }, { status: 200 });
}

export const signIn = async (...args: any) =>
  errorHandler(signInController, args);

export const signUp = async (...args: any) =>
  errorHandler(signUpController, args);
