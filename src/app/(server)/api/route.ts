import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Readable } from "stream";

const { CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function test(req: NextRequest) {
  try {
    const buffer = fs.readFileSync("./test.png");
    const stream = Readable.from(buffer);

    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "foo",
      },
      function (error, result) {
        console.log(error, result);
      },
    );
    stream.pipe(cld_upload_stream);
  } catch (err: any) {
    console.log(err.stack);
  }

  return NextResponse.json({ message: "All good" }, { status: 200 });
}

export { test as GET };
