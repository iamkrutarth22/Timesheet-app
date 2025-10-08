
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  console.log("Middleware - Token:", pathname,token);

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }


  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (pathname === "/login" || pathname === "/")) {
    console.log("kllsdmk")
    return NextResponse.redirect(new URL("/timesheet", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/timesheet/:path*", "/", "/api/:path*",],
};