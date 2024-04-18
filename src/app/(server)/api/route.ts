import { NextRequest, NextResponse } from "next/server";
import cloudinaryService from "@/app/(server)/services/cloudinary";

export async function test(req: NextRequest) {
  try {
    const res = await cloudinaryService.api.upload("./test.png", {
      folder: "foo",
    });
    console.log(res);
  } catch (err: any) {
    console.log(err.stack);
  }

  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
