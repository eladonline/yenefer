"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const jwtMiddleware = async (token) => {
  return true;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  if (pathname.startsWith("/api")) {
    const isValidToken = await jwtMiddleware(token);
    if (!isValidToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|login|sign-up|.+.svg).*)",
};
