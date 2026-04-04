"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/admin/logout-button";

type AdminShellProps = {
  children: React.ReactNode;
  role: UserRole;
  locale: Locale;
};

type AdminNavItem = {
  href: string;
  label: string;
  meta: string;
  eyebrow: string;
  icon: "dashboard" | "destination" | "circuit" | "event" | "article" | "gallery" | "lead";
  color: string;
};

function AdminNavGlyph({ icon }: { icon: AdminNavItem["icon"] }) {
  if (icon === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M4 5.5h7v5H4zM13 5.5h7v8h-7zM4 12.5h7V20H4zM13 15h7v5h-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

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

export function AdminShell({ children, role, locale }: AdminShellProps) {
  const dictionary = getDictionary(locale);
  const pathname = usePathname();

  const nav: AdminNavItem[] = [
    {
      href: "/admin",
      label: dictionary.admin.dashboard,
      meta: "Vue d'ensemble, pilotage et activite recente",
      eyebrow: "Pilotage",
      icon: "dashboard",
      color: "#137b50",
    },
    {
      href: "/admin/content/destinations",
      label: "Destinations",
      meta: "Sites, patrimoines et contenus geolocalises",
      eyebrow: "Contenu",
      icon: "destination",
      color: "#137b50",
    },
    {
      href: "/admin/content/circuits",
      label: "Circuits",
      meta: "Parcours, durees et experiences proposees",
      eyebrow: "Contenu",
      icon: "circuit",
      color: "#c8860a",
    },
    {
      href: "/admin/content/events",
      label: "Evenements",
      meta: "Agenda, lieux et dates institutionnelles",
      eyebrow: "Contenu",
      icon: "event",
      color: "#1e3a5f",
    },
    {
      href: "/admin/content/articles",
      label: "Actualites",
      meta: "Communiques, annonces et informations publiques",
      eyebrow: "Contenu",
      icon: "article",
      color: "#7a4f1a",
    },
    {
      href: "/admin/content/gallery",
      label: "Galerie",
      meta: "Visuels, categories et mediatheque",
      eyebrow: "Contenu",
      icon: "gallery",
      color: "#c0392b",
    },
    {
      href: "/admin/leads",
      label: dictionary.admin.leads,
      meta: "Demandes entrantes, suivi et traitement",
      eyebrow: "Relations",
      icon: "lead",
      color: "#0d6b3e",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="admin-shell-bg">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <header className="admin-panel p-5 md:p-6">
          <div className="texture-overlay" />
          <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="admin-nav-icon h-14 w-14 rounded-[1.2rem]"
                style={{ color: "#137b50" }}
              >
                <AdminNavGlyph icon="dashboard" />
              </div>
              <div className="max-w-2xl">
                <span className="section-kicker">Administration securisee</span>
                <h1 className="mt-4 text-3xl font-bold text-[#123b28] md:text-4xl">{dictionary.admin.title}</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#2d6a4f] md:text-[0.95rem]">
                  Pilotage editorial, gestion des contenus publics et suivi des demandes institutionnelles.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[440px]">
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Role</p>
                <p className="mt-2 text-lg font-bold text-[#123b28]">{role}</p>
                <p className="mt-1 text-xs text-[#2d6a4f]">Controle des droits et actions sensibles.</p>
              </div>
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Sections</p>
                <p className="mt-2 text-lg font-bold text-[#123b28]">7 modules</p>
                <p className="mt-1 text-xs text-[#2d6a4f]">Contenus, media et demandes en un seul espace.</p>
              </div>
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Session</p>
                <p className="mt-2 text-lg font-bold text-[#123b28]">Active</p>
                <p className="mt-1 text-xs text-[#2d6a4f]">Interface protegee par authentification.</p>
              </div>
            </div>

            <div className="xl:self-start">
              <LogoutButton label={dictionary.admin.logout} />
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 xl:grid-cols-[310px_1fr]">
          <aside className="admin-panel h-fit p-4 md:p-5 xl:sticky xl:top-6">
            <div className="texture-overlay" />
            <div className="relative z-10">
              <span className="section-kicker">Navigation</span>
              <nav className="mt-4 grid gap-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("admin-nav-link", isActive(item.href) && "admin-nav-link-active")}
                  >
                    <span className="admin-nav-icon" style={{ color: item.color }}>
                      <AdminNavGlyph icon={item.icon} />
                    </span>
                    <span>
                      <span className="admin-nav-eyebrow">{item.eyebrow}</span>
                      <span className="admin-nav-title">{item.label}</span>
                      <span className="admin-nav-meta">{item.meta}</span>
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-5 admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Bon usage</p>
                <p className="mt-2 text-sm leading-relaxed text-[#2d6a4f]">
                  Verifiez les slugs, les dates de publication et les champs i18n avant toute mise en ligne.
                </p>
              </div>
            </div>
          </aside>

          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
