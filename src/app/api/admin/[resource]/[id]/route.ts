import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  canDelete,
  deleteResource,
  getResource,
  isAdminResource,
  updateResource,
} from "@/lib/admin-service";
import { authOptions } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource, id } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const item = await getResource(resource, id);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource, id } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  try {
    const payload = await request.json();
    const item = await updateResource(resource, id, payload);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canDelete(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { resource, id } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  await deleteResource(resource, id);
  return new NextResponse(null, { status: 204 });
}
