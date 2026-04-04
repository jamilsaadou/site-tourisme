import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

const routes = [
  "",
  "/destinations",
  "/evenements",
  "/actualites",
  "/galerie",
  "/contact",
  "/ministere/a-propos",
  "/ministere/publications-officielles",
  "/ministere/partenaires-bailleurs",
  "/ministere/presse-medias",
  "/ministere/accessibilite",
  "/niger/visa-entree",
  "/niger/hebergements",
  "/niger/transport-mobilite",
  "/niger/sante-securite",
  "/niger/faq-voyageurs",
  "/admin/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.BASE_URL ?? "http://localhost:3000";

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.7,
    }))
  );
}
