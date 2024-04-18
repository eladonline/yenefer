import { NextRequest, NextResponse } from "next/server";
// import cloudinaryService from "@/app/(server)/services/cloudinary";
import tokenHandler from "@/app/(server)/handlers/tokenHandler";
import errorHandler from "@/app/(server)/handlers/errorHandler";

export async function test(req: NextRequest & { tokenPayload: {} }) {
  try {
    // const res = await cloudinaryService.api.upload("./test.png", {
    //   folder: "foo",
    // });
    console.log(req.tokenPayload);
  } catch (err: any) {
    console.log(err.stack);
  }

  return NextResponse.json({ message: "All good" }, { status: 200 });
}

const wrapped = async (...args: any) =>
  errorHandler(...(tokenHandler(test, args) as [Function, []]));

export { wrapped as GET };
