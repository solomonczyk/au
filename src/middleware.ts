import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes("next-auth.session-token");
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = isAuthenticated(request);

  if (pathname.startsWith("/account") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/auth/:path*"],
};
