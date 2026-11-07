import { NextResponse } from "next/server";

// Protected routes: product details + profile pages.
// Only checks that a Better Auth session cookie exists (fast, edge-safe);
// the cookie itself is validated by Better Auth on every API call.
function hasSessionCookie(request) {
  return Boolean(
    request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token")
  );
}

export function middleware(request) {
  if (!hasSessionCookie(request)) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/product/:path*", "/profile/:path*", "/profile"] };
