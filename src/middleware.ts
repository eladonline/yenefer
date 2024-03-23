"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenDecrypt } from "@/app/(server)/services/joseToken";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);
  const isApiRoute = pathname.startsWith("/api");
  const isPageRoute = !isApiRoute;

  if (isPageRoute) {
    const token = request.cookies.get("token")?.value;
    let isValidToken = false;
    const headers = new Headers(request.headers);

    if (token) {
      let payload = await tokenDecrypt(token);
      isValidToken = Boolean(payload);
      if (payload) {
        headers.set("id", payload.id as string);

        return NextResponse.next({
          request: { headers },
        });
      }
    }

    if (isValidToken && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isValidToken && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isApiRoute) {
    const authorization = request.headers.get("Authorization");
    const headers = new Headers(request.headers);
    if (authorization) {
      const [, token] = authorization.split(" ");
      let payload = await tokenDecrypt(token);
      if (payload) {
        if (!headers.get("id")) headers.set("id", payload.id as string);

        return NextResponse.next({
          request: { headers },
        });
      }
    }

    return NextResponse.json(
      { message: "Valid authorization expected" },
      { status: 417 },
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/auth|_next/static|_next/image|favicon.ico|.+.svg).*)",
};
