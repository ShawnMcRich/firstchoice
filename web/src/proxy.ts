import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

// Next.js 16 renamed Middleware to Proxy.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  // Geo default: visitors inside Iran get Persian; everyone else gets English.
  // Cloudflare provides the country via the CF-IPCountry header (proxied origin).
  const country = req.headers.get("cf-ipcountry")?.toUpperCase();
  const insideIran = !country || country === "IR" || country === "XX" || country === "T1";
  const locale = insideIran ? defaultLocale : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
