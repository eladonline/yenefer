"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenValidator } from "@/app/(server)/services/token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);

  const token = request.cookies.get("token")?.value;
  let isValidToken = false;
  if (token) isValidToken = await tokenValidator(token);

  if (isValidToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isValidToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.+.svg).*)",
};
