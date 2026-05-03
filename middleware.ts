import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin and admin API routes.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const cookieHeader = request.headers.get("cookie") || "";
    if (!cookieHeader.includes("sb_admin_token")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
