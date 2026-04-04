import { NextRequest, NextResponse } from "next/server";
import { getLocalizedContent } from "@/lib/content-service";
import { coerceLocale } from "@/lib/locales";

export async function GET(request: NextRequest) {
  const locale = coerceLocale(request.nextUrl.searchParams.get("locale"));
  const data = await getLocalizedContent("destinations", locale);

  const points = data.map((destination) => ({
    id: destination.id,
    slug: destination.slug,
    title: destination.title,
    summary: destination.summary,
    lat: destination.mapLat,
    lng: destination.mapLng,
  }));

  return NextResponse.json({ locale, points });
}
