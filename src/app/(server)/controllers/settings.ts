import { NextRequest, NextResponse } from "next/server";
import Jwt from "@/app/(server)/services/Jwt";
import HeadersHandler from "@/app/(server)/handlers/Headers";

export async function forms(req: NextRequest): Promise<NextResponse> {
  const headersHandler = new HeadersHandler();
  const authorization = headersHandler.authorization;
  const [, token] = authorization.split(" ");
  const jwtService = new Jwt();
  const payload = jwtService.verify(token);
  console.log("payload", payload);
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
