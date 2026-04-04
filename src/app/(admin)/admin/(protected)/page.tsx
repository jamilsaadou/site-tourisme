import Link from "next/link";
import { getDashboardMetrics } from "@/lib/admin-service";

type CardIconName = "destination" | "circuit" | "event" | "article" | "gallery" | "lead";

function DashboardGlyph({ icon }: { icon: CardIconName }) {
  if (icon === "destination") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M12 20s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (icon === "circuit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M6 18.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm12-8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM8.3 14.4l7.4-3.8M8 11.5V6.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "event") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.6" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "article") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="4" y="4.5" width="16" height="15" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "gallery") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="3.5" y="5" width="17" height="14" rx="2.6" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M6 16l3.5-3 2.4 2 2.5-2.5L18 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path d="M4 7.5h16M4 12h10M4 16.5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18.2 18.5a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics().catch(() => ({
    destinations: 0,
    circuits: 0,
    events: 0,
    articles: 0,
    gallery: 0,
    leads: 0,
  }));

  const totalContent = metrics.destinations + metrics.circuits + metrics.events + metrics.articles + metrics.gallery;

  const cards = [
    {
      key: "destinations",
      label: "Destinations",
      value: metrics.destinations,
      href: "/admin/content/destinations",
      description: "Patrimoines, sites touristiques et fiches geolocalisees.",
      icon: "destination" as const,
      color: "#137b50",
    },
    {
      key: "circuits",
      label: "Circuits",
      value: metrics.circuits,
      href: "/admin/content/circuits",
      description: "Parcours, durees, itineraires et experiences organises.",
      icon: "circuit" as const,
      color: "#c8860a",
    },
    {
      key: "events",
      label: "Evenements",
      value: metrics.events,
      href: "/admin/content/events",
      description: "Agenda, lieux, temps forts et programmation officielle.",
      icon: "event" as const,
      color: "#1e3a5f",
    },
    {
      key: "articles",
      label: "Actualites",
      value: metrics.articles,
      href: "/admin/content/articles",
      description: "Communiques, annonces et messages institutionnels.",
      icon: "article" as const,
      color: "#7a4f1a",
    },
    {
      key: "gallery",
      label: "Galerie",
      value: metrics.gallery,
      href: "/admin/content/gallery",
      description: "Mediatheque, visuels promotionnels et categories photo.",
      icon: "gallery" as const,
      color: "#c0392b",
    },
    {
      key: "leads",
      label: "Leads",
      value: metrics.leads,
      href: "/admin/leads",
      description: "Demandes de contact et besoins de circuits a traiter.",
      icon: "lead" as const,
      color: "#0d6b3e",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="admin-hero-panel p-6 md:p-7">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.2fr_0.88fr] xl:items-end">
          <div>
            <span className="section-kicker border-white/15 bg-white/10 text-white">Pilotage</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Tableau de bord editorial</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/76 md:text-[0.95rem]">
              Suivi centralise des contenus publies, des medias et des demandes entrantes du ministere.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Contenus</p>
              <p className="admin-mini-value">{totalContent}</p>
              <p className="admin-mini-text">Elements disponibles dans les cinq rubriques editoriales.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Demandes</p>
              <p className="admin-mini-value">{metrics.leads}</p>
              <p className="admin-mini-text">Leads collectes via les formulaires publics.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Statut</p>
              <p className="admin-mini-value">Actif</p>
              <p className="admin-mini-text">Espace d'administration pret pour mise a jour.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.key} href={card.href} className="admin-stat-card group">
            <div className="flex items-start justify-between gap-4">
              <span className="admin-card-icon" style={{ color: card.color }}>
                <DashboardGlyph icon={card.icon} />
              </span>
              <span className="surface-chip">Gerer</span>
            </div>
            <p className="mt-6 text-[0.74rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">{card.label}</p>
            <p className="mt-3 admin-stat-value">{card.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#2d6a4f]">{card.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#123b28] transition group-hover:text-[#137b50]">
              Ouvrir le module
              <span aria-hidden>+</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
