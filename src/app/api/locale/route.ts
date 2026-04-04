import { NextResponse } from "next/server";
import { isLocale } from "@/lib/locales";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { locale?: string } | null;

  if (!payload?.locale || !isLocale(payload.locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("locale", payload.locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
