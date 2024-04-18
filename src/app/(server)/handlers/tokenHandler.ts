import { NextRequest } from "next/server";
import Jwt, { clientTokenProps } from "@/app/(server)/services/Jwt";
import { ErrorType } from "@/types/globalTypes";
import { JwtPayload } from "jsonwebtoken";

const tokenHandler = (
  callback: Function,
  args: [NextRequest & { tokenPayload?: JwtPayload }],
) => {
  const [request, ...rest] = args;
  const token = request.cookies.get("token")?.value;
  const jwtService = new Jwt();
  const tokenPayload = jwtService.decode(token as string);

  if (typeof tokenPayload === "string" || !tokenPayload?.usr) {
    const err: ErrorType = new Error("Valid authorization expected");
    err.statusCode = 417;
    throw err;
  }

  request.tokenPayload = tokenPayload;
  return [callback, [request, ...rest]];
};

export default tokenHandler;
