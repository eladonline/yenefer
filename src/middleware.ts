"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenDecrypt, tokenValidator } from "@/app/(server)/services/token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);
  const isApiRoute = pathname.startsWith("/api");
  const isPageRoute = !isApiRoute;

  if (isPageRoute) {
    const token = request.cookies.get("token")?.value;
    let isValidToken = false;
    if (token) isValidToken = await tokenValidator(token);

    if (isValidToken && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isValidToken && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isApiRoute) {
    const authorization = request.headers.get("Authorization");
    let payload = null;
    if (authorization) {
      const [, token] = authorization.split(" ");
      payload = await tokenDecrypt(token);
      console.log(payload);
    }
    if (!payload || payload.license !== "pro") {
      return new Response("Valid authorization expected", { status: 417 });
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/auth|_next/static|_next/image|favicon.ico|.+.svg).*)",
};
