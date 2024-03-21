import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";
import UserModel from "@/app/(server)/models/User";
import Settings from "@/app/(server)/models/Settings";

export async function signIn(req: NextRequest) {
  const { username, password } = await req.json();
  try {
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
  } catch (err: any) {
    console.error(err.stack);
    return NextResponse.json(
      { message: "Something went wrong please try again later..." },
      { status: 500 },
    );
  }
}

export async function signUp(req: NextRequest) {
  const { username: email, password } = await req.json();
  const license = "basic";

  try {
    const alreadyExists = await UserModel.findOne({ email });
    if (alreadyExists)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );

    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);

    const user = new UserModel({ email, password: hash, license });

    const settingsModel = new Settings({
      users_id: user._id,
      config: {
        user: { name: email },
      },
    });

    const results = await Promise.allSettled([
      user.save(),
      settingsModel.save(),
    ]);
    const isNotFulfilled = results.some(({ status }) => status !== "fulfilled");
    if (isNotFulfilled) {
      // @ts-ignore
      results.forEach(({ status, reason }: PromiseSettledResult<void>) => {
        if (status === "rejected") console.error(reason);
      });

      await user.deleteOne();
      await settingsModel.deleteOne();
      throw new Error("Creating one of the Collections failed");
    }

    const jwtUtil = new Jwt();
    const token = jwtUtil.sign({ usr: email, license, id: user._id });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err: Error | any) {
    console.error(err.stack);
    return NextResponse.json(
      { message: "Something went wrong please try again later..." },
      { status: 500 },
    );
  }
}
