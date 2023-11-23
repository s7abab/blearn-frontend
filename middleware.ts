import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { jwtDecode } from "jwt-decode";

const protectedRoute = ["/profile"];

export default function Middleware(req: any) {
  const cookies = parse(req.headers.get("Cookie") || "");
  const userToken = cookies.token;
  let jwt: any = {};
  if (userToken) {
    jwt = jwtDecode(userToken);
  }
  // admin protected route
  if (jwt.role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  // instructor protected route
  if (
    jwt.role !== "instructor" &&
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
  if (jwt.role === "admin" && req.nextUrl.pathname.startsWith("/profile")) {
    const absoluteUrl = new URL("/admin/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (
    jwt.role === "instructor" &&
    req.nextUrl.pathname.startsWith("/profile")
  ) {
    const absoluteUrl = new URL("/instructor/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
