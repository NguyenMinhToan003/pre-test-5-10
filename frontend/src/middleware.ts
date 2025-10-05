// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/home","/admin"];
const publicRoutes = ["/login"];

export function middleware(request: NextRequest) {

  const accessToken = request.cookies.get("accessToken")?.value;

  if (privateRoutes.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicRoutes.includes(request.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/login", "/admin/:path*"],
};
