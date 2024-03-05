"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenValidator } from "@/app/(server)/services/token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // skip middleware for this pages
  if (["/login", "/sign-up"].includes(pathname)) return NextResponse.next();

  const token = request.cookies.get("token")?.value;

  const isValidToken = tokenValidator(token);
  if (!isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.+.svg).*)",
};
