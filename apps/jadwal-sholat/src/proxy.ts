import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hadithBookOnlyMatch = /^\/hadith\/[^/]+$/;
  if (hadithBookOnlyMatch.test(pathname)) {
    return NextResponse.redirect(new URL("/hadith", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/hadith/:path*",
};
