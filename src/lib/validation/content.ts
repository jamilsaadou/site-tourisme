import { z } from "zod";

const localizedTextSchema = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
  ha: z.string().min(1),
});

const localizedTextPatchSchema = z.object({
  fr: z.string().optional(),
  en: z.string().optional(),
  ha: z.string().optional(),
});

const commonSchema = {
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  published: z.boolean().optional().default(false),
};

export const destinationCreateSchema = z.object({
  ...commonSchema,
  titleI18n: localizedTextSchema,
  summaryI18n: localizedTextSchema,
  bodyI18n: localizedTextSchema,
  heroImage: z.string().min(1),
  mapLat: z.coerce.number(),
  mapLng: z.coerce.number(),
});

export const destinationUpdateSchema = z.object({
  slug: commonSchema.slug.optional(),
  titleI18n: localizedTextPatchSchema.optional(),
  summaryI18n: localizedTextPatchSchema.optional(),
  bodyI18n: localizedTextPatchSchema.optional(),
  heroImage: z.string().min(1).optional(),
  mapLat: z.coerce.number().optional(),
  mapLng: z.coerce.number().optional(),
  published: z.boolean().optional(),
});

export const circuitCreateSchema = z.object({
  ...commonSchema,
  titleI18n: localizedTextSchema,
  durationDays: z.coerce.number().int().min(1),
  bodyI18n: localizedTextSchema,
  coverImage: z.string().min(1),
});

export const circuitUpdateSchema = z.object({
  slug: commonSchema.slug.optional(),
  titleI18n: localizedTextPatchSchema.optional(),
  durationDays: z.coerce.number().int().min(1).optional(),
  bodyI18n: localizedTextPatchSchema.optional(),
  coverImage: z.string().min(1).optional(),
  published: z.boolean().optional(),
});

export const eventCreateSchema = z.object({
  ...commonSchema,
  titleI18n: localizedTextSchema,
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  locationI18n: localizedTextSchema,
  bodyI18n: localizedTextSchema,
});

export const eventUpdateSchema = z.object({
  slug: commonSchema.slug.optional(),
  titleI18n: localizedTextPatchSchema.optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
  locationI18n: localizedTextPatchSchema.optional(),
  bodyI18n: localizedTextPatchSchema.optional(),
  published: z.boolean().optional(),
});

export const articleCreateSchema = z.object({
  ...commonSchema,
  titleI18n: localizedTextSchema,
  excerptI18n: localizedTextSchema,
  bodyI18n: localizedTextSchema,
  coverImage: z.string().min(1),
});

export const articleUpdateSchema = z.object({
  slug: commonSchema.slug.optional(),
  titleI18n: localizedTextPatchSchema.optional(),
  excerptI18n: localizedTextPatchSchema.optional(),
  bodyI18n: localizedTextPatchSchema.optional(),
  coverImage: z.string().min(1).optional(),
  published: z.boolean().optional(),
});

export const galleryCreateSchema = z.object({
  imageUrl: z.string().min(1),
  captionI18n: localizedTextSchema,
  category: z.string().min(2),
  published: z.boolean().optional().default(false),
});

export const galleryUpdateSchema = z.object({
  imageUrl: z.string().min(1).optional(),
  captionI18n: localizedTextPatchSchema.optional(),
  category: z.string().min(2).optional(),
  published: z.boolean().optional(),
});

export const resourceTemplates = {
  destinations: {
    slug: "nouvelle-destination",
    titleI18n: { fr: "", en: "", ha: "" },
    summaryI18n: { fr: "", en: "", ha: "" },
    bodyI18n: { fr: "", en: "", ha: "" },
    heroImage: "/media/destination-desert.jpg",
    mapLat: 13.5116,
    mapLng: 2.1254,
    published: false,
  },
  circuits: {
    slug: "nouveau-circuit",
    titleI18n: { fr: "", en: "", ha: "" },
    durationDays: 3,
    bodyI18n: { fr: "", en: "", ha: "" },
    coverImage: "/media/destination-chameau.jpg",
    published: false,
  },
  events: {
    slug: "nouvel-evenement",
    titleI18n: { fr: "", en: "", ha: "" },
    startsAt: new Date().toISOString(),
    endsAt: new Date().toISOString(),
    locationI18n: { fr: "", en: "", ha: "" },
    bodyI18n: { fr: "", en: "", ha: "" },
    published: false,
  },
  articles: {
    slug: "nouvel-article",
    titleI18n: { fr: "", en: "", ha: "" },
    excerptI18n: { fr: "", en: "", ha: "" },
    bodyI18n: { fr: "", en: "", ha: "" },
    coverImage: "/media/hero-tourisme.jpg",
    published: false,
  },
  gallery: {
    imageUrl: "/media/desert-night.webp",
    captionI18n: { fr: "", en: "", ha: "" },
    category: "culture",
    published: false,
  },
};

export const createSchemas = {
  destinations: destinationCreateSchema,
  circuits: circuitCreateSchema,
  events: eventCreateSchema,
  articles: articleCreateSchema,
  gallery: galleryCreateSchema,
};

export const updateSchemas = {
  destinations: destinationUpdateSchema,
  circuits: circuitUpdateSchema,
  events: eventUpdateSchema,
  articles: articleUpdateSchema,
  gallery: galleryUpdateSchema,
};

export type AdminResource = keyof typeof createSchemas;
