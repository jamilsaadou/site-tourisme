import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { ResourceManager } from "@/components/admin/resource-manager";
import {
  getResourceTemplate,
  isAdminResource,
  listResource,
} from "@/lib/admin-service";
import { authOptions } from "@/lib/auth";

export default async function AdminResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;

  if (!isAdminResource(resource)) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    notFound();
  }

  const [items, template] = await Promise.all([
    listResource(resource),
    Promise.resolve(getResourceTemplate(resource)),
  ]);

  return (
    <ResourceManager
      resource={resource}
      initialItems={items as Array<Record<string, unknown>>}
      template={template}
      role={session.user.role}
    />
  );
}
