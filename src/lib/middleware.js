// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const userId = req.cookies.get("user_id")?.value;

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
