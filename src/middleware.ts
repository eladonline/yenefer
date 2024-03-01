import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authService from "@/app/service/authentication";

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  else {
    const isValidToken = await authService.tokenValidation(token);
    if (!isValidToken)
      return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|login|.+.svg).*)",
};
