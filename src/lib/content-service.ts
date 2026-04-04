import { prisma } from "@/lib/prisma";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

export type PublicResource =
  | "destinations"
  | "circuits"
  | "events"
  | "articles"
  | "gallery";

type I18n = {
  fr: string;
  en: string;
  ha: string;
};

const t = (fr: string, en: string, ha: string): I18n => ({ fr, en, ha });

type DestinationRow = {
  id: string;
  slug: string;
  titleI18n: I18n;
  summaryI18n: I18n;
  bodyI18n: I18n;
  heroImage: string;
  mapLat: number;
  mapLng: number;
  publishedAt: Date | null;
};

type CircuitRow = {
  id: string;
  slug: string;
  titleI18n: I18n;
  durationDays: number;
  bodyI18n: I18n;
  coverImage: string;
  publishedAt: Date | null;
};

type EventRow = {
  id: string;
  slug: string;
  titleI18n: I18n;
  startsAt: Date;
  endsAt: Date;
  locationI18n: I18n;
  bodyI18n: I18n;
  publishedAt: Date | null;
};

type ArticleRow = {
  id: string;
  slug: string;
  titleI18n: I18n;
  excerptI18n: I18n;
  bodyI18n: I18n;
  coverImage: string;
  publishedAt: Date | null;
};

type GalleryRow = {
  id: string;
  imageUrl: string;
  captionI18n: I18n;
  category: string;
  publishedAt: Date | null;
};

export type DestinationPublic = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  heroImage: string;
  mapLat: number;
  mapLng: number;
  publishedAt: Date | null;
};

export type CircuitPublic = {
  id: string;
  slug: string;
  title: string;
  body: string;
  durationDays: number;
  coverImage: string;
  publishedAt: Date | null;
};

export type EventPublic = {
  id: string;
  slug: string;
  title: string;
  location: string;
  body: string;
  startsAt: Date;
  endsAt: Date;
  publishedAt: Date | null;
};

export type ArticlePublic = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedAt: Date | null;
};

export type GalleryPublic = {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  publishedAt: Date | null;
};

type PublicResourceMap = {
  destinations: DestinationPublic[];
  circuits: CircuitPublic[];
  events: EventPublic[];
  articles: ArticlePublic[];
  gallery: GalleryPublic[];
};

const fallbackDestinations: DestinationRow[] = [
  {
    id: "fallback-destination-1",
    slug: "agadez-gateway",
    titleI18n: t("Agadez, porte du desert", "Agadez, desert gateway", "Agadez, kofar hamada"),
    summaryI18n: t(
      "Ville historique et point de depart des grands circuits sahariens.",
      "Historic city and departure point for major Saharan circuits.",
      "Tsohon gari kuma mashigar yawon bude ido na hamada."
    ),
    bodyI18n: t(
      "Architecture soudano-saharienne, artisanat local et hospitalite touareg.",
      "Sudano-Sahelian architecture, local craft, and Tuareg hospitality.",
      "Gine-ginen gargajiya, sana'o'in hannu, da karbar baki na Tuareg."
    ),
    heroImage: "/media/destination-desert.jpg",
    mapLat: 16.9742,
    mapLng: 7.9865,
    publishedAt: new Date(),
  },
  {
    id: "fallback-destination-2",
    slug: "wadi-niger-niamey",
    titleI18n: t("Niamey et le fleuve Niger", "Niamey and the Niger River", "Niamey da Kogin Niger"),
    summaryI18n: t(
      "Balades fluviales, culture urbaine et gastronomie locale.",
      "River walks, urban culture, and local cuisine.",
      "Yawon kogin ruwa, al'adar birni da abincin gida."
    ),
    bodyI18n: t(
      "Experience au coucher du soleil, marches artisanaux et musique vivante.",
      "Sunset experiences, craft markets, and live music.",
      "Kallon faduwar rana, kasuwannin sana'a, da kidan rayuwa."
    ),
    heroImage: "/media/niamey-river.jpg",
    mapLat: 13.5116,
    mapLng: 2.1254,
    publishedAt: new Date(),
  },
];

const fallbackCircuits: CircuitRow[] = [
  {
    id: "fallback-circuit-1",
    slug: "circuit-sahara-5j",
    titleI18n: t("Circuit Sahara 5 jours", "Sahara circuit 5 days", "Shirin Sahara kwana 5"),
    durationDays: 5,
    bodyI18n: t(
      "Decouverte des oasis, bivouac et immersion culturelle.",
      "Discover oases, bivouac, and cultural immersion.",
      "Ziyartar maruru, kwanan sansani, da nutsuwa cikin al'adu."
    ),
    coverImage: "/media/destination-chameau.jpg",
    publishedAt: new Date(),
  },
];

const fallbackEvents: EventRow[] = [
  {
    id: "fallback-event-1",
    slug: "festival-des-savoirs",
    titleI18n: t("Festival des savoirs nomades", "Nomadic heritage festival", "Bikin ilimin makiyaya"),
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    locationI18n: t("Agadez", "Agadez", "Agadez"),
    bodyI18n: t(
      "Artisanat, musique et rencontres avec les cooperatives locales.",
      "Craft, music, and meetings with local cooperatives.",
      "Sana'a, kiɗa, da haduwa da kungiyoyin gida."
    ),
    publishedAt: new Date(),
  },
];

const fallbackArticles: ArticleRow[] = [
  {
    id: "fallback-article-1",
    slug: "vision-tourisme-2030",
    titleI18n: t("Vision tourisme 2030", "Tourism vision 2030", "Hangen yawon bude ido 2030"),
    excerptI18n: t(
      "Les priorites nationales pour une croissance durable du secteur.",
      "National priorities for sustainable tourism growth.",
      "Muhimman manufofin kasa don dorewar bunkasar yawon bude ido."
    ),
    bodyI18n: t(
      "Renforcement des infrastructures, qualite de service et promotion internationale.",
      "Infrastructure improvements, service quality, and international promotion.",
      "Inganta kayayyakin more rayuwa, ingancin hidima, da tallatawa a duniya."
    ),
    coverImage: "/media/hero-tourisme.jpg",
    publishedAt: new Date(),
  },
];

const fallbackGallery: GalleryRow[] = [
  {
    id: "fallback-gallery-1",
    imageUrl: "/media/desert-night.webp",
    captionI18n: t("Caravane au coucher du soleil", "Caravan at sunset", "Ayari yayin faduwar rana"),
    category: "culture",
    publishedAt: new Date(),
  },
  {
    id: "fallback-gallery-2",
    imageUrl: "/media/culture-artisanat.jpg",
    captionI18n: t("Atelier de tissage traditionnel", "Traditional weaving workshop", "Taron dinki na gargajiya"),
    category: "artisanat",
    publishedAt: new Date(),
  },
];

const toI18n = (value: unknown): I18n => {
  if (!value || typeof value !== "object") {
    return { fr: "", en: "", ha: "" };
  }

  const source = value as Partial<I18n>;

  return {
    fr: source.fr ?? "",
    en: source.en ?? "",
    ha: source.ha ?? "",
  };
};

async function getPublishedDestinations(): Promise<DestinationRow[]> {
  try {
    const rows = await prisma.destination.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleI18n: toI18n(row.titleI18n),
      summaryI18n: toI18n(row.summaryI18n),
      bodyI18n: toI18n(row.bodyI18n),
      heroImage: row.heroImage,
      mapLat: row.mapLat,
      mapLng: row.mapLng,
      publishedAt: row.publishedAt,
    }));
  } catch {
    return fallbackDestinations;
  }
}

async function getPublishedCircuits(): Promise<CircuitRow[]> {
  try {
    const rows = await prisma.circuit.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleI18n: toI18n(row.titleI18n),
      durationDays: row.durationDays,
      bodyI18n: toI18n(row.bodyI18n),
      coverImage: row.coverImage,
      publishedAt: row.publishedAt,
    }));
  } catch {
    return fallbackCircuits;
  }
}

async function getPublishedEvents(): Promise<EventRow[]> {
  try {
    const rows = await prisma.event.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { startsAt: "asc" },
    });

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleI18n: toI18n(row.titleI18n),
      startsAt: row.startsAt,
      endsAt: row.endsAt,
      locationI18n: toI18n(row.locationI18n),
      bodyI18n: toI18n(row.bodyI18n),
      publishedAt: row.publishedAt,
    }));
  } catch {
    return fallbackEvents;
  }
}

async function getPublishedArticles(): Promise<ArticleRow[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleI18n: toI18n(row.titleI18n),
      excerptI18n: toI18n(row.excerptI18n),
      bodyI18n: toI18n(row.bodyI18n),
      coverImage: row.coverImage,
      publishedAt: row.publishedAt,
    }));
  } catch {
    return fallbackArticles;
  }
}

async function getPublishedGallery(): Promise<GalleryRow[]> {
  try {
    const rows = await prisma.galleryItem.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });

    return rows.map((row) => ({
      id: row.id,
      imageUrl: row.imageUrl,
      captionI18n: toI18n(row.captionI18n),
      category: row.category,
      publishedAt: row.publishedAt,
    }));
  } catch {
    return fallbackGallery;
  }
}

export async function getLocalizedContent<K extends PublicResource>(
  resource: K,
  locale: Locale
): Promise<PublicResourceMap[K]> {
  if (resource === "destinations") {
    const rows = await getPublishedDestinations();
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: getLocalizedText(row.titleI18n, locale),
      summary: getLocalizedText(row.summaryI18n, locale),
      body: getLocalizedText(row.bodyI18n, locale),
      heroImage: row.heroImage,
      mapLat: row.mapLat,
      mapLng: row.mapLng,
      publishedAt: row.publishedAt,
    })) as PublicResourceMap[K];
  }

  if (resource === "circuits") {
    const rows = await getPublishedCircuits();
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: getLocalizedText(row.titleI18n, locale),
      body: getLocalizedText(row.bodyI18n, locale),
      durationDays: row.durationDays,
      coverImage: row.coverImage,
      publishedAt: row.publishedAt,
    })) as PublicResourceMap[K];
  }

  if (resource === "events") {
    const rows = await getPublishedEvents();
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: getLocalizedText(row.titleI18n, locale),
      location: getLocalizedText(row.locationI18n, locale),
      body: getLocalizedText(row.bodyI18n, locale),
      startsAt: row.startsAt,
      endsAt: row.endsAt,
      publishedAt: row.publishedAt,
    })) as PublicResourceMap[K];
  }

  if (resource === "articles") {
    const rows = await getPublishedArticles();
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: getLocalizedText(row.titleI18n, locale),
      excerpt: getLocalizedText(row.excerptI18n, locale),
      body: getLocalizedText(row.bodyI18n, locale),
      coverImage: row.coverImage,
      publishedAt: row.publishedAt,
    })) as PublicResourceMap[K];
  }

  const rows = await getPublishedGallery();
  return rows.map((row) => ({
    id: row.id,
    imageUrl: row.imageUrl,
    caption: getLocalizedText(row.captionI18n, locale),
    category: row.category,
    publishedAt: row.publishedAt,
  })) as PublicResourceMap[K];
}

export async function getHomeContent(locale: Locale) {
  const [destinations, circuits, events, articles, gallery] = await Promise.all([
    getLocalizedContent("destinations", locale),
    getLocalizedContent("circuits", locale),
    getLocalizedContent("events", locale),
    getLocalizedContent("articles", locale),
    getLocalizedContent("gallery", locale),
  ]);

  return {
    destinations: destinations.slice(0, 3),
    circuits: circuits.slice(0, 2),
    events: events.slice(0, 2),
    articles: articles.slice(0, 2),
    gallery: gallery.slice(0, 6),
  };
}
