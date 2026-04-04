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
        <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.25 9.75V21h13.5V9.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "ministry") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6 20V9M10 20V9M14 20V9M18 20V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 9h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M5.5 9L12 4l6.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "niger") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3.5c-2.4 2.7-3.8 5.4-3.8 8.5 0 3.1 1.4 5.8 3.8 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 3.5c2.4 2.7 3.8 5.4 3.8 8.5 0 3.1-1.4 5.8-3.8 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "event") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "news") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
        <rect x="4" y="4.5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="nav-icon" aria-hidden>
      <path d="M4.5 10.5L12 4l7.5 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5V20h11V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 14h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
    if (!(details instanceof HTMLDetailsElement)) {
      return;
    }

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
      if (!headerRef.current) {
        return;
      }
      if (!headerRef.current.contains(event.target as Node)) {
        closeOpenNavMenus();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOpenNavMenus();
      }
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
      {/* Government Trust Bar */}
      <div className="trust-bar">
        <div className="page-wrap flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 shrink-0" aria-hidden>
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>
              {locale === "fr"
                ? "Site officiel du Ministere du Tourisme et de l'Artisanat du Niger"
                : locale === "en"
                  ? "Official website of the Government of Niger"
                  : "Shafin gwamnatin Nijar na hukuma"}
            </span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://niger.gov.ne"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-[0.67rem] tracking-widest opacity-70 hover:opacity-100"
            >
              niger.gov.ne ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-[#eae8e1]/80 bg-white/96 backdrop-blur-lg">
        <div className="page-wrap">
          <div className="flex items-center gap-3 py-3 md:gap-5">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex min-w-0 shrink-0 items-center gap-3"
            >
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#ede8de] bg-white shadow-sm">
                <Image
                  src="/image%20s/armoirie.png"
                  alt="Armoiries du Niger"
                  fill
                  sizes="48px"
                  className="object-contain p-1.5"
                />
              </span>
              <div className="min-w-0 hidden sm:block">
                <p className="font-display text-[0.95rem] font-bold leading-tight text-[#0d2318] md:text-[1.1rem]">
                  {dictionary.siteName}
                </p>
                <p className="text-[0.68rem] tracking-[0.06em] text-[#5a9478] font-medium">
                  République du Niger
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden min-w-0 flex-1 lg:block">
              <div className="flex items-center gap-0.5 whitespace-nowrap">
                {primaryLinks.slice(0, 1).map((link) => (
                  <Link key={link.href} href={link.href} className="nav-pill" onClick={closeOpenNavMenus}>
                    <MenuIcon name={link.icon} />
                    <span>{link.label}</span>
                  </Link>
                ))}

                <details className="nav-group">
                  <summary className="nav-pill nav-pill-summary" onClick={handleSummaryToggle}>
                    <MenuIcon name="ministry" />
                    <span>{dictionary.nav.ministry}</span>
                    <svg viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden>
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="nav-dropdown">
                    <div className="grid gap-1">
                      {ministryLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="nav-dropdown-link" onClick={closeOpenNavMenus}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>

                <details className="nav-group">
                  <summary className="nav-pill nav-pill-summary" onClick={handleSummaryToggle}>
                    <MenuIcon name="niger" />
                    <span>{dictionary.nav.niger}</span>
                    <svg viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden>
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="nav-dropdown">
                    <div className="grid gap-1">
                      {nigerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="nav-dropdown-link" onClick={closeOpenNavMenus}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>

                {primaryLinks.slice(1).map((link) => (
                  <Link key={link.href} href={link.href} className="nav-pill" onClick={closeOpenNavMenus}>
                    <MenuIcon name={link.icon} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="ml-auto hidden shrink-0 items-center gap-2.5 lg:flex">
              <LocaleSwitcher currentLocale={locale} />
              <Link
                href="/admin"
                className="btn btn-primary btn-sm"
                onClick={closeOpenNavMenus}
              >
                {dictionary.nav.admin}
              </Link>
            </div>

            {/* Mobile: locale + burger */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <LocaleSwitcher currentLocale={locale} />
              <details className="relative">
                <summary
                  className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[#dce6df] bg-white text-[#0d2318] shadow-sm transition hover:border-[#c0d6c8] [&::-webkit-details-marker]:hidden"
                  onClick={handleSummaryToggle}
                >
                  <span className="flex flex-col gap-[5px]">
                    <span className="block h-[1.5px] w-5 rounded-full bg-current" />
                    <span className="block h-[1.5px] w-5 rounded-full bg-current" />
                    <span className="block h-[1.5px] w-3.5 rounded-full bg-current" />
                  </span>
                </summary>

                <div className="mobile-menu-panel absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[min(94vw,350px)] rounded-2xl border border-[#e0e8e3] bg-white/98 p-3 shadow-[0_24px_48px_rgba(13,35,24,0.18)] backdrop-blur-lg">
                  <nav className="grid gap-1">
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="mobile-menu-link"
                        onClick={closeOpenNavMenus}
                      >
                        <MenuIcon name={link.icon} />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="mobile-menu-group mt-3 rounded-xl border border-[#e6eee8] bg-[#f8fcfa] p-3">
                    <p className="text-[0.68rem] font-semibold tracking-[0.11em] text-[#5a9478] uppercase">
                      {dictionary.nav.ministry}
                    </p>
                    <div className="mt-2 grid gap-1">
                      {ministryLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="mobile-submenu-link" onClick={closeOpenNavMenus}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mobile-menu-group mt-3 rounded-xl border border-[#e6eee8] bg-[#f8fcfa] p-3">
                    <p className="text-[0.68rem] font-semibold tracking-[0.11em] text-[#5a9478] uppercase">
                      {dictionary.nav.niger}
                    </p>
                    <div className="mt-2 grid gap-1">
                      {nigerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="mobile-submenu-link" onClick={closeOpenNavMenus}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 border-t border-[#eae6df] pt-3">
                    <Link href="/admin" className="btn btn-primary w-full" onClick={closeOpenNavMenus}>
                      {dictionary.nav.admin}
                    </Link>
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
