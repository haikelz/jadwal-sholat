import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A book without a hadith number has no page. Dotted paths such as
  // /hadith/sitemap.xml are files and pass through.
  const hadithBookOnlyMatch = /^\/hadith\/[^/.]+$/;
  if (hadithBookOnlyMatch.test(pathname)) {
    return NextResponse.redirect(new URL("/hadith", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/hadith/:path*",
};
