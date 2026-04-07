"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { LocaleSwitcher } from "@/components/public/locale-switcher";

type SiteHeaderProps = {
  locale: Locale;
};

type MenuIconName = "home" | "ministry" | "niger" | "event" | "news" | "contact";

function MenuIcon({ name }: { name: MenuIconName }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.25 9.75V21h13.5V9.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 21v-6.5a2.5 2.5 0 015 0V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "ministry") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 20V10M10 20V10M14 20V10M18 20V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 10L12 4l7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (name === "niger") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3c-2.5 2.8-4 5.6-4 9s1.5 6.2 4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 3c2.5 2.8 4 5.6 4 9s-1.5 6.2-4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "event") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 3v4M17 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="15" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (name === "news") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 9h10M7 13h6M7 17h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
      <path d="M3 8l9-5 9 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6.5V18a2 2 0 002 2h8a2 2 0 002-2V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function FlagCircle() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const dictionary = getDictionary(locale);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const closeOpenNavMenus = () => {
    const scope = headerRef.current ?? document;
    scope.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((detail) => {
      detail.open = false;
    });
  };

  const handleSummaryToggle = (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    const details = event.currentTarget.parentElement;
    if (!(details instanceof HTMLDetailsElement)) return;
    const shouldOpen = !details.open;
    if (details.classList.contains("nav-group")) {
      const scope = headerRef.current ?? document;
      scope.querySelectorAll<HTMLDetailsElement>("details.nav-group[open]").forEach((detail) => {
        detail.open = false;
      });
    }
    details.open = shouldOpen;
  };

  useEffect(() => {
    closeOpenNavMenus();
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target as Node)) closeOpenNavMenus();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOpenNavMenus();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const primaryLinks: Array<{ href: string; label: string; icon: MenuIconName }> = [
    { href: `/${locale}`, label: dictionary.nav.home, icon: "home" },
    { href: `/${locale}/evenements`, label: dictionary.nav.events, icon: "event" },
    { href: `/${locale}/actualites`, label: dictionary.nav.news, icon: "news" },
    { href: `/${locale}/contact`, label: dictionary.nav.contact, icon: "contact" },
  ];

  const ministryLinks: Array<{ href: string; label: string }> = [
    { href: `/${locale}/ministere/a-propos`, label: dictionary.nav.ministryAbout },
    { href: `/${locale}/ministere/publications-officielles`, label: dictionary.nav.ministryPublications },
    { href: `/${locale}/ministere/partenaires-bailleurs`, label: dictionary.nav.ministryPartners },
    { href: `/${locale}/ministere/presse-medias`, label: dictionary.nav.ministryPress },
    { href: `/${locale}/ministere/accessibilite`, label: dictionary.nav.ministryAccessibility },
  ];

  const nigerLinks: Array<{ href: string; label: string }> = [
    { href: `/${locale}/niger/visa-entree`, label: dictionary.nav.nigerVisa },
    { href: `/${locale}/niger/hebergements`, label: dictionary.nav.nigerHotels },
    { href: `/${locale}/niger/transport-mobilite`, label: dictionary.nav.nigerTransport },
    { href: `/${locale}/niger/sante-securite`, label: dictionary.nav.nigerHealth },
    { href: `/${locale}/niger/faq-voyageurs`, label: dictionary.nav.nigerFaq },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-40">
      <div className="trust-bar">
        <div className="page-wrap flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FlagCircle />
            <span className="tracking-wider">
              {locale === "fr"
                ? "Site officiel du Ministère du Tourisme et de l'Artisanat"
                : locale === "en"
                  ? "Official website of the Ministry of Tourism and Crafts"
                  : "Shafin hukuma na Ma'aikatar Yawon Bude Ido"}
            </span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <a href="https://niger.gov.ne" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[0.65rem] tracking-widest opacity-75 hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden><path d="M6 3H3v10h10v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M8 8l5-5M10 3h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              niger.gov.ne
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-[var(--border-light)] bg-[var(--surface-glass-strong)] backdrop-blur-xl">
        <div className="page-wrap">
          <div className="flex items-center gap-4 py-3 md:gap-6">
            <Link href={`/${locale}`} className="flex min-w-0 shrink-0 items-center gap-3 group">
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-light)] bg-white shadow-sm transition-all group-hover:shadow-md group-hover:border-[var(--border-medium)]">
                <Image src="/image%20s/armoirie.png" alt="Armoiries du Niger" fill sizes="48px" className="object-contain p-1.5" />
              </span>
              <div className="min-w-0 hidden sm:block">
                <p className="font-bold leading-tight text-[var(--ink)] text-[0.95rem] md:text-[1.05rem] tracking-tight">{dictionary.siteName}</p>
                <p className="text-[0.65rem] tracking-[0.1em] text-[var(--niger-green)] font-semibold uppercase">République du Niger</p>
              </div>
            </Link>
            <nav className="hidden min-w-0 flex-1 lg:block">
              <div className="flex items-center gap-1 whitespace-nowrap">
                {primaryLinks.slice(0, 1).map((link) => (
                  <Link key={link.href} href={link.href} className="nav-pill" onClick={closeOpenNavMenus}><MenuIcon name={link.icon} /><span>{link.label}</span></Link>
                ))}
                <details className="nav-group">
                  <summary className="nav-pill nav-pill-summary" onClick={handleSummaryToggle}><MenuIcon name="ministry" /><span>{dictionary.nav.ministry}</span><svg viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></summary>
                  <div className="nav-dropdown"><div className="grid gap-0.5">{ministryLinks.map((link) => (<Link key={link.href} href={link.href} className="nav-dropdown-link" onClick={closeOpenNavMenus}><svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 mr-2 opacity-50" aria-hidden><path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{link.label}</Link>))}</div></div>
                </details>
                <details className="nav-group">
                  <summary className="nav-pill nav-pill-summary" onClick={handleSummaryToggle}><MenuIcon name="niger" /><span>{dictionary.nav.niger}</span><svg viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></summary>
                  <div className="nav-dropdown"><div className="grid gap-0.5">{nigerLinks.map((link) => (<Link key={link.href} href={link.href} className="nav-dropdown-link" onClick={closeOpenNavMenus}><svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 mr-2 opacity-50" aria-hidden><path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{link.label}</Link>))}</div></div>
                </details>
                {primaryLinks.slice(1).map((link) => (<Link key={link.href} href={link.href} className="nav-pill" onClick={closeOpenNavMenus}><MenuIcon name={link.icon} /><span>{link.label}</span></Link>))}
              </div>
            </nav>
            <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex">
              <LocaleSwitcher currentLocale={locale} />
            </div>
            <div className="ml-auto flex items-center gap-2.5 lg:hidden">
              <LocaleSwitcher currentLocale={locale} />
              <details className="relative">
                <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-light)] bg-white text-[var(--ink)] shadow-sm transition-all hover:border-[var(--border-medium)] hover:shadow-md [&::-webkit-details-marker]:hidden" onClick={handleSummaryToggle}>
                  <span className="flex flex-col gap-[5px]"><span className="block h-[2px] w-5 rounded-full bg-[var(--niger-green)]" /><span className="block h-[2px] w-5 rounded-full bg-current" /><span className="block h-[2px] w-3.5 rounded-full bg-[var(--niger-orange)]" /></span>
                </summary>
                <div className="mobile-menu-panel absolute right-0 top-[calc(100%+0.65rem)] z-50 w-[min(94vw,360px)] rounded-[var(--radius-xl)] border border-[var(--border-light)] bg-[var(--surface-glass-strong)] backdrop-blur-xl p-3.5 shadow-[var(--shadow-elevated)]">
                  <div className="flag-accent-line mb-4" />
                  <nav className="grid gap-1">{primaryLinks.map((link) => (<Link key={link.href} href={link.href} className="mobile-menu-link" onClick={closeOpenNavMenus}><MenuIcon name={link.icon} /><span>{link.label}</span></Link>))}</nav>
                  <div className="mobile-menu-group mt-4 rounded-[var(--radius-lg)] border border-[var(--border-light)] bg-[var(--niger-green-soft)] p-3.5">
                    <div className="flex items-center gap-2 mb-3"><span className="h-1.5 w-1.5 rounded-full bg-[var(--niger-green)]" /><p className="text-[0.68rem] font-bold tracking-[0.12em] text-[var(--niger-green-dark)] uppercase">{dictionary.nav.ministry}</p></div>
                    <div className="grid gap-1">{ministryLinks.map((link) => (<Link key={link.href} href={link.href} className="mobile-submenu-link" onClick={closeOpenNavMenus}>{link.label}</Link>))}</div>
                  </div>
                  <div className="mobile-menu-group mt-3 rounded-[var(--radius-lg)] border border-[var(--border-orange)] bg-[var(--niger-orange-soft)] p-3.5">
                    <div className="flex items-center gap-2 mb-3"><span className="h-1.5 w-1.5 rounded-full bg-[var(--niger-orange)]" /><p className="text-[0.68rem] font-bold tracking-[0.12em] text-[var(--niger-orange)] uppercase">{dictionary.nav.niger}</p></div>
                    <div className="grid gap-1">{nigerLinks.map((link) => (<Link key={link.href} href={link.href} className="mobile-submenu-link" onClick={closeOpenNavMenus}>{link.label}</Link>))}</div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
