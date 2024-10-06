import { NextRequest, NextResponse } from "next/server";
import { authUserMiddleware } from "./utils/middleware.config";

export function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isLoggedIn = accessToken != undefined && refreshToken != undefined;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    return authUserMiddleware(req, res, accessToken);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
