import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  createResource,
  isAdminResource,
  listResource,
} from "@/lib/admin-service";
import { authOptions } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const items = await listResource(resource);
  return NextResponse.json({ items });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const payload = await request.json();
    const item = await createResource(resource, payload);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Creation failed" },
      { status: 400 }
    );
  }
}
