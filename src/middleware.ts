import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authService from "@/app/service/authentication";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(request.nextUrl.pathname);
  if (token) {
    await authService.tokenValidation(token);
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|.+.svg).*)",
};
