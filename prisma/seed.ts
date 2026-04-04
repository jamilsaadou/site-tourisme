import { PrismaClient, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

type Localized = {
  fr: string;
  en: string;
  ha: string;
};

const t = (fr: string, en: string, ha: string): Localized => ({ fr, en, ha });

async function seedUsers() {
  const email = process.env.ADMIN_EMAIL ?? "admin@tourisme.gouv.ne";
  const rawPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: UserRole.ADMIN },
    create: { email, passwordHash, role: UserRole.ADMIN },
  });
}

async function seedDestinations() {
  const now = new Date();

  const entries = [
    {
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
      publishedAt: now,
    },
    {
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
      publishedAt: now,
    },
    {
      slug: "air-tenere",
      titleI18n: t("Massif de l'Air et Tenere", "Air Mountains and Tenere", "Dutsen Air da Tenere"),
      summaryI18n: t(
        "Paysages grandioses pour expeditions et tourisme d'aventure.",
        "Epic landscapes for expeditions and adventure tourism.",
        "Kyawawan wurare don balaguron bincike da yawon kasada."
      ),
      bodyI18n: t(
        "Formations rocheuses, dunes et rencontres avec les communautes nomades.",
        "Rock formations, dunes, and encounters with nomadic communities.",
        "Duwatsu, hamada, da haduwa da al'ummomin makiyaya."
      ),
      heroImage: "/media/paysage-aerien.jpg",
      mapLat: 18.7376,
      mapLng: 8.9751,
      publishedAt: now,
    },
  ];

  for (const entry of entries) {
    await prisma.destination.upsert({
      where: { slug: entry.slug },
      update: entry,
      create: entry,
    });
  }
}

async function seedCircuits() {
  const now = new Date();

  const entries = [
    {
      slug: "circuit-sahara-5j",
      titleI18n: t("Circuit Sahara 5 jours", "Sahara circuit 5 days", "Shirin Sahara kwana 5"),
      durationDays: 5,
      bodyI18n: t(
        "Decouverte des oasis, bivouac et immersion culturelle.",
        "Discover oases, bivouac, and cultural immersion.",
        "Ziyartar maruru, kwanan sansani, da nutsuwa cikin al'adu."
      ),
      coverImage: "/media/destination-chameau.jpg",
      publishedAt: now,
    },
    {
      slug: "circuit-riverain-3j",
      titleI18n: t("Circuit riverain 3 jours", "Riverside circuit 3 days", "Shirin bakin kogi kwana 3"),
      durationDays: 3,
      bodyI18n: t(
        "Parcours nature et patrimoine autour du fleuve Niger.",
        "Nature and heritage route around the Niger River.",
        "Yawon dabi'a da tarihi kusa da Kogin Niger."
      ),
      coverImage: "/media/niamey-river.jpg",
      publishedAt: now,
    },
  ];

  for (const entry of entries) {
    await prisma.circuit.upsert({
      where: { slug: entry.slug },
      update: entry,
      create: entry,
    });
  }
}

async function seedEvents() {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);

  const entries = [
    {
      slug: "festival-des-savoirs",
      titleI18n: t("Festival des savoirs nomades", "Nomadic heritage festival", "Bikin ilimin makiyaya"),
      startsAt: nextMonth,
      endsAt: new Date(nextMonth.getTime() + 2 * 24 * 60 * 60 * 1000),
      locationI18n: t("Agadez", "Agadez", "Agadez"),
      bodyI18n: t(
        "Artisanat, musique et rencontres avec les cooperatives locales.",
        "Craft, music, and meetings with local cooperatives.",
        "Sana'a, kiɗa, da haduwa da kungiyoyin gida."
      ),
      publishedAt: now,
    },
    {
      slug: "semaine-gastronomie-nigerienne",
      titleI18n: t("Semaine de la gastronomie", "Gastronomy week", "Makon abinci"),
      startsAt: new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000),
      endsAt: new Date(nextMonth.getTime() + 9 * 24 * 60 * 60 * 1000),
      locationI18n: t("Niamey", "Niamey", "Niamey"),
      bodyI18n: t(
        "Mise en avant des terroirs et talents culinaires du Niger.",
        "Celebration of Niger terroirs and culinary talents.",
        "Baje kolin dandanon yankuna da fasahar girki ta Nijar."
      ),
      publishedAt: now,
    },
  ];

  for (const entry of entries) {
    await prisma.event.upsert({
      where: { slug: entry.slug },
      update: entry,
      create: entry,
    });
  }
}

async function seedArticles() {
  const now = new Date();

  const entries = [
    {
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
      publishedAt: now,
    },
    {
      slug: "artisanat-et-destination",
      titleI18n: t("Artisanat et attractivite", "Craft and destination appeal", "Sana'a da jan hankalin wurin yawon bude ido"),
      excerptI18n: t(
        "Comment les metiers d'art soutiennent l'economie touristique.",
        "How craft industries support the tourism economy.",
        "Yadda sana'o'in hannu ke tallafawa tattalin yawon bude ido."
      ),
      bodyI18n: t(
        "Le ministere accompagne les cooperatives pour valoriser les savoir-faire.",
        "The ministry supports cooperatives to amplify local know-how.",
        "Ma'aikatar na taimaka wa kungiyoyi wajen habaka ilimin gargajiya."
      ),
      coverImage: "/media/culture-artisanat.jpg",
      publishedAt: now,
    },
  ];

  for (const entry of entries) {
    await prisma.article.upsert({
      where: { slug: entry.slug },
      update: entry,
      create: entry,
    });
  }
}

async function seedGallery() {
  const now = new Date();
  const entries = [
    {
      imageUrl: "/media/desert-night.webp",
      captionI18n: t("Caravane au coucher du soleil", "Caravan at sunset", "Ayari yayin faduwar rana"),
      category: "culture",
      publishedAt: now,
    },
    {
      imageUrl: "/media/culture-artisanat.jpg",
      captionI18n: t("Atelier de tissage traditionnel", "Traditional weaving workshop", "Taron dinki na gargajiya"),
      category: "artisanat",
      publishedAt: now,
    },
    {
      imageUrl: "/media/paysage-aerien.jpg",
      captionI18n: t("Paysage de dunes du Tenere", "Tenere dune landscape", "Yanayin hamadar Tenere"),
      category: "nature",
      publishedAt: now,
    },
  ];

  await prisma.galleryItem.deleteMany({});
  await prisma.galleryItem.createMany({ data: entries });
}

async function seedSettings() {
  await prisma.siteSetting.upsert({
    where: { key: "global" },
    update: {
      valueJson: {
        seoTitle: "Ministere du Tourisme du Niger",
        seoDescription: "Plateforme officielle de promotion du tourisme nigerien.",
        social: {
          facebook: "",
          instagram: "",
          youtube: "",
        },
        contacts: {
          email: "contact@tourisme.gouv.ne",
          phone: "+227 00000000",
        },
      },
    },
    create: {
      key: "global",
      valueJson: {
        seoTitle: "Ministere du Tourisme du Niger",
        seoDescription: "Plateforme officielle de promotion du tourisme nigerien.",
        social: {
          facebook: "",
          instagram: "",
          youtube: "",
        },
        contacts: {
          email: "contact@tourisme.gouv.ne",
          phone: "+227 00000000",
        },
      },
    },
  });
}

async function main() {
  await seedUsers();
  await seedDestinations();
  await seedCircuits();
  await seedEvents();
  await seedArticles();
  await seedGallery();
  await seedSettings();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
