import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname.startsWith("/account") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const role = ((req.auth?.user as { role?: string })?.role) || "";
    if (role !== "ADMIN" && role !== "COMPLIANCE_OFFICER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/auth/:path*"],
};
