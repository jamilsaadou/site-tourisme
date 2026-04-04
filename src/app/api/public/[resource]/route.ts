import { NextRequest, NextResponse } from "next/server";
import { getLocalizedContent, type PublicResource } from "@/lib/content-service";
import { coerceLocale } from "@/lib/locales";

const resources: PublicResource[] = ["destinations", "circuits", "events", "articles", "gallery"];

function isPublicResource(resource: string): resource is PublicResource {
  return resources.includes(resource as PublicResource);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;

  if (!isPublicResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const locale = coerceLocale(request.nextUrl.searchParams.get("locale"));
  const data = await getLocalizedContent(resource, locale);

  return NextResponse.json({
    resource,
    locale,
    items: data,
  });
}
