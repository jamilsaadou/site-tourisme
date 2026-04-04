import { Prisma, type LeadStatus, type LeadType, type UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  type AdminResource,
  createSchemas,
  resourceTemplates,
  updateSchemas,
} from "@/lib/validation/content";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { leadStatusSchema } from "@/lib/validation/leads";

export const adminResources: AdminResource[] = [
  "destinations",
  "circuits",
  "events",
  "articles",
  "gallery",
];

export function isAdminResource(value: string): value is AdminResource {
  return adminResources.includes(value as AdminResource);
}

export function getResourceTemplate(resource: AdminResource) {
  return resourceTemplates[resource];
}

function applyPublished(published: boolean | undefined) {
  if (published === undefined) {
    return {};
  }

  return {
    publishedAt: published ? new Date() : null,
  };
}

function toJson(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

function mergeLocalized(current: unknown, patch: unknown): Prisma.InputJsonValue | undefined {
  if (patch === undefined) {
    return undefined;
  }

  if (!patch || typeof patch !== "object") {
    return toJson(current);
  }

  if (!current || typeof current !== "object") {
    return toJson(patch);
  }

  return toJson({
    ...(current as Record<string, unknown>),
    ...(patch as Record<string, unknown>),
  });
}

export async function listResource(resource: AdminResource) {
  if (resource === "destinations") {
    return prisma.destination.findMany({ orderBy: { createdAt: "desc" } });
  }

  if (resource === "circuits") {
    return prisma.circuit.findMany({ orderBy: { createdAt: "desc" } });
  }

  if (resource === "events") {
    return prisma.event.findMany({ orderBy: { createdAt: "desc" } });
  }

  if (resource === "articles") {
    return prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  }

  return prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getResource(resource: AdminResource, id: string) {
  if (resource === "destinations") {
    return prisma.destination.findUnique({ where: { id } });
  }

  if (resource === "circuits") {
    return prisma.circuit.findUnique({ where: { id } });
  }

  if (resource === "events") {
    return prisma.event.findUnique({ where: { id } });
  }

  if (resource === "articles") {
    return prisma.article.findUnique({ where: { id } });
  }

  return prisma.galleryItem.findUnique({ where: { id } });
}

export async function createResource(resource: AdminResource, payload: unknown) {
  if (resource === "destinations") {
    const data = createSchemas.destinations.parse(payload);
    return prisma.destination.create({
      data: {
        slug: data.slug,
        titleI18n: toJson(data.titleI18n),
        summaryI18n: toJson(data.summaryI18n),
        bodyI18n: toJson(data.bodyI18n),
        heroImage: data.heroImage,
        mapLat: data.mapLat,
        mapLng: data.mapLng,
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "circuits") {
    const data = createSchemas.circuits.parse(payload);
    return prisma.circuit.create({
      data: {
        slug: data.slug,
        titleI18n: toJson(data.titleI18n),
        durationDays: data.durationDays,
        bodyI18n: toJson(data.bodyI18n),
        coverImage: data.coverImage,
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "events") {
    const data = createSchemas.events.parse(payload);
    return prisma.event.create({
      data: {
        slug: data.slug,
        titleI18n: toJson(data.titleI18n),
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        locationI18n: toJson(data.locationI18n),
        bodyI18n: toJson(data.bodyI18n),
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "articles") {
    const data = createSchemas.articles.parse(payload);
    return prisma.article.create({
      data: {
        slug: data.slug,
        titleI18n: toJson(data.titleI18n),
        excerptI18n: toJson(data.excerptI18n),
        bodyI18n: toJson(data.bodyI18n),
        coverImage: data.coverImage,
        ...applyPublished(data.published),
      },
    });
  }

  const data = createSchemas.gallery.parse(payload);
  return prisma.galleryItem.create({
    data: {
      imageUrl: data.imageUrl,
      captionI18n: toJson(data.captionI18n),
      category: data.category,
      ...applyPublished(data.published),
    },
  });
}

export async function updateResource(resource: AdminResource, id: string, payload: unknown) {
  if (resource === "destinations") {
    const current = await prisma.destination.findUnique({ where: { id } });
    if (!current) {
      return null;
    }

    const data = updateSchemas.destinations.parse(payload);
    return prisma.destination.update({
      where: { id },
      data: {
        slug: data.slug,
        titleI18n: mergeLocalized(current.titleI18n, data.titleI18n),
        summaryI18n: mergeLocalized(current.summaryI18n, data.summaryI18n),
        bodyI18n: mergeLocalized(current.bodyI18n, data.bodyI18n),
        heroImage: data.heroImage,
        mapLat: data.mapLat,
        mapLng: data.mapLng,
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "circuits") {
    const current = await prisma.circuit.findUnique({ where: { id } });
    if (!current) {
      return null;
    }

    const data = updateSchemas.circuits.parse(payload);
    return prisma.circuit.update({
      where: { id },
      data: {
        slug: data.slug,
        titleI18n: mergeLocalized(current.titleI18n, data.titleI18n),
        durationDays: data.durationDays,
        bodyI18n: mergeLocalized(current.bodyI18n, data.bodyI18n),
        coverImage: data.coverImage,
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "events") {
    const current = await prisma.event.findUnique({ where: { id } });
    if (!current) {
      return null;
    }

    const data = updateSchemas.events.parse(payload);
    return prisma.event.update({
      where: { id },
      data: {
        slug: data.slug,
        titleI18n: mergeLocalized(current.titleI18n, data.titleI18n),
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        locationI18n: mergeLocalized(current.locationI18n, data.locationI18n),
        bodyI18n: mergeLocalized(current.bodyI18n, data.bodyI18n),
        ...applyPublished(data.published),
      },
    });
  }

  if (resource === "articles") {
    const current = await prisma.article.findUnique({ where: { id } });
    if (!current) {
      return null;
    }

    const data = updateSchemas.articles.parse(payload);
    return prisma.article.update({
      where: { id },
      data: {
        slug: data.slug,
        titleI18n: mergeLocalized(current.titleI18n, data.titleI18n),
        excerptI18n: mergeLocalized(current.excerptI18n, data.excerptI18n),
        bodyI18n: mergeLocalized(current.bodyI18n, data.bodyI18n),
        coverImage: data.coverImage,
        ...applyPublished(data.published),
      },
    });
  }

  const current = await prisma.galleryItem.findUnique({ where: { id } });
  if (!current) {
    return null;
  }

  const data = updateSchemas.gallery.parse(payload);
  return prisma.galleryItem.update({
    where: { id },
    data: {
      imageUrl: data.imageUrl,
      captionI18n: mergeLocalized(current.captionI18n, data.captionI18n),
      category: data.category,
      ...applyPublished(data.published),
    },
  });
}

export async function deleteResource(resource: AdminResource, id: string) {
  if (resource === "destinations") {
    return prisma.destination.delete({ where: { id } });
  }

  if (resource === "circuits") {
    return prisma.circuit.delete({ where: { id } });
  }

  if (resource === "events") {
    return prisma.event.delete({ where: { id } });
  }

  if (resource === "articles") {
    return prisma.article.delete({ where: { id } });
  }

  return prisma.galleryItem.delete({ where: { id } });
}

export async function getDashboardMetrics() {
  const [destinations, circuits, events, articles, gallery, leads] = await Promise.all([
    prisma.destination.count(),
    prisma.circuit.count(),
    prisma.event.count(),
    prisma.article.count(),
    prisma.galleryItem.count(),
    prisma.lead.count(),
  ]);

  return {
    destinations,
    circuits,
    events,
    articles,
    gallery,
    leads,
  };
}

type LeadFilters = {
  type?: LeadType;
  status?: LeadStatus;
  dateFrom?: Date;
  dateTo?: Date;
};

export async function listLeads(filters: LeadFilters = {}) {
  return prisma.lead.findMany({
    where: {
      type: filters.type,
      status: filters.status,
      createdAt:
        filters.dateFrom || filters.dateTo
          ? {
              gte: filters.dateFrom,
              lte: filters.dateTo,
            }
          : undefined,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateLeadStatus(id: string, status: string) {
  const validatedStatus = leadStatusSchema.parse(status);

  return prisma.lead.update({
    where: { id },
    data: { status: validatedStatus },
  });
}

export function canDelete(role: UserRole) {
  return role === "ADMIN";
}

export function previewTitle(resource: AdminResource, item: Record<string, unknown>, locale: Locale) {
  if (resource === "gallery") {
    return getLocalizedText(item.captionI18n, locale);
  }

  return getLocalizedText(item.titleI18n, locale);
}
