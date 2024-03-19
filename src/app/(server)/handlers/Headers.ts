import { headers } from "next/headers";
import { NextResponse } from "next/server";

class HeadersHandler {
  get authorization(): NextResponse<{ message: string }> | string {
    const authorization = headers().get("authorization");
    if (!authorization)
      return NextResponse.json(
        { message: "Valid authorization expected" },
        { status: 417 },
      );
    return authorization;
  }
}

export default HeadersHandler;
