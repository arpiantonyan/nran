import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["hy", "en"] as const;
type Locale = (typeof locales)[number];

function preferredLocale(header: string | null): Locale {
  if (!header) return "hy";

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((item) => item.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((item) => item.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const item of ranked) {
    if (item.tag.startsWith("hy")) return "hy";
    if (item.tag.startsWith("en")) return "en";
  }

  return "hy";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";

  if (locales.includes(segment as Locale)) {
    return NextResponse.next();
  }

  const locale = preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
