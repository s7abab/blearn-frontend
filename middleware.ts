import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { jwtDecode } from "jwt-decode";
import { Roles } from "./@types/user/roles.enum";

const protectedRoute = ["/profile"];

export default function Middleware(req: any) {
  const cookies = parse(req.headers.get("Cookie") || "");
  const userToken = cookies.token;
  let jwt: any = {};
  if (userToken) {
    jwt = jwtDecode(userToken);
  }
  // admin protected route
  if (jwt.role !== Roles.ADMIN && req.nextUrl.pathname.startsWith("/admin")) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  // instructor protected route
  if (
    jwt.role !== Roles.INSTRUCTOR &&
    req.nextUrl.pathname.startsWith("/instructor")
  ) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  // user protected route
  if (!userToken && protectedRoute.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  // redirect to dashboard
  if (jwt.role === Roles.ADMIN && req.nextUrl.pathname.startsWith("/profile")) {
    const absoluteUrl = new URL("/admin/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (
    jwt.role === Roles.INSTRUCTOR &&
    req.nextUrl.pathname.startsWith("/profile")
  ) {
    const absoluteUrl = new URL("/instructor/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  // public route
  if (jwt.role && req.nextUrl.pathname.startsWith("/login")) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (jwt.role && req.nextUrl.pathname.startsWith("/signup")) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}



