import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth/session";
import { adminRoutes } from "@/lib/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === adminRoutes.login;
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!isLoginPage && !session) {
    const loginUrl = new URL(adminRoutes.login, request.url);

    if (pathname !== adminRoutes.dashboard) {
      loginUrl.searchParams.set("from", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL(adminRoutes.dashboard, request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-route", isLoginPage ? "login" : "panel");

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
