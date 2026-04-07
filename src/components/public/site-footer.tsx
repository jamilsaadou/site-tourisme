import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

type SiteFooterProps = {
  locale: Locale;
};

const footerContent: Record<
  Locale,
  {
    tagline: string;
    discover: string;
    practical: string;
    institutional: string;
    practicalLinks: Array<{ label: string; href: string }>;
    institutionalLinks: Array<{ label: string; href: string }>;
    rights: string;
    address: string;
    phone: string;
  }
> = {
  fr: {
    tagline: "Plateforme officielle de promotion touristique et de valorisation du patrimoine de la République du Niger.",
    discover: "Explorer",
    practical: "Informations pratiques",
    institutional: "Institutionnel",
    practicalLinks: [
      { label: "Visa & entrée au Niger", href: "#" },
      { label: "Hébergements", href: "#" },
      { label: "Transport & mobilité", href: "#" },
      { label: "Santé & sécurité", href: "#" },
      { label: "FAQ voyageurs", href: "#" },
    ],
    institutionalLinks: [
      { label: "À propos du Ministère", href: "#" },
      { label: "Publications officielles", href: "#" },
      { label: "Partenaires & bailleurs", href: "#" },
      { label: "Presse & médias", href: "#" },
      { label: "Accessibilité", href: "#" },
    ],
    rights: "Ministère du Tourisme et de l'Artisanat — République du Niger. Tous droits réservés.",
    address: "Niamey, République du Niger",
    phone: "+227 20 73 xx xx",
  },
  en: {
    tagline: "Official platform for tourism promotion and heritage development of the Republic of Niger.",
    discover: "Explore",
    practical: "Practical information",
    institutional: "Institutional",
    practicalLinks: [
      { label: "Visa & entry to Niger", href: "#" },
      { label: "Accommodation", href: "#" },
      { label: "Transport & mobility", href: "#" },
      { label: "Health & safety", href: "#" },
      { label: "Traveler FAQ", href: "#" },
    ],
    institutionalLinks: [
      { label: "About the Ministry", href: "#" },
      { label: "Official publications", href: "#" },
      { label: "Partners & donors", href: "#" },
      { label: "Press & media", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
    rights: "Ministry of Tourism and Crafts — Republic of Niger. All rights reserved.",
    address: "Niamey, Republic of Niger",
    phone: "+227 20 73 xx xx",
  },
  ha: {
    tagline: "Shafin hukuma na tallata yawon bude ido da kare gado na Jamhuriyar Nijar.",
    discover: "Bincika",
    practical: "Bayanan aiki",
    institutional: "Hukuma",
    practicalLinks: [
      { label: "Visa & shiga Nijar", href: "#" },
      { label: "Wuraren zama", href: "#" },
      { label: "Sufuri & motsi", href: "#" },
      { label: "Lafiya & tsaro", href: "#" },
      { label: "Tambayoyin matafiya", href: "#" },
    ],
    institutionalLinks: [
      { label: "Game da Ma'aikatar", href: "#" },
      { label: "Wallafe-wallafen hukuma", href: "#" },
      { label: "Abokan hulda", href: "#" },
      { label: "Labarai & kafofin watsa labarai", href: "#" },
      { label: "Samun damar shiga", href: "#" },
    ],
    rights: "Ma'aikatar yawon bude ido — Jamhuriyar Nijar. Dukkan haƙƙoƙi sun kiyaye.",
    address: "Niamey, Jamhuriyar Nijar",
    phone: "+227 20 73 xx xx",
  },
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const dictionary = getDictionary(locale);
  const fc = footerContent[locale];

  const institutionalRoutes = [
    `/${locale}/ministere/a-propos`,
    `/${locale}/ministere/publications-officielles`,
    `/${locale}/ministere/partenaires-bailleurs`,
    `/${locale}/ministere/presse-medias`,
    `/${locale}/ministere/accessibilite`,
  ];

  const practicalRoutes = [
    `/${locale}/niger/visa-entree`,
    `/${locale}/niger/hebergements`,
    `/${locale}/niger/transport-mobilite`,
    `/${locale}/niger/sante-securite`,
    `/${locale}/niger/faq-voyageurs`,
  ];

  const practicalLinks = fc.practicalLinks.map((link, index) => ({
    ...link,
    href: practicalRoutes[index] ?? link.href,
  }));

  const institutionalLinks = fc.institutionalLinks.map((link, index) => ({
    ...link,
    href: institutionalRoutes[index] ?? link.href,
  }));

  const navLinks = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/destinations`, label: dictionary.nav.destinations },
    { href: `/${locale}/evenements`, label: dictionary.nav.events },
    { href: `/${locale}/actualites`, label: dictionary.nav.news },
    { href: `/${locale}/galerie`, label: dictionary.nav.gallery },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
  ];

  return (
    <footer className="footer-dark">
      {/* Niger Flag Top Accent */}
      <div className="h-1 bg-gradient-to-r from-[var(--niger-orange)] via-white to-[var(--niger-green)]" />
      
      {/* Main footer grid */}
      <div className="relative z-10 page-wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Col 1: Identity */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-white/15 bg-white/10 backdrop-blur-sm">
                <Image
                  src="/image%20s/armoirie.png"
                  alt="Armoiries du Niger"
                  fill
                  sizes="56px"
                  className="object-contain p-2"
                />
              </span>
              <div>
                <p className="text-white font-bold leading-tight text-[1.1rem]">
                  {dictionary.siteName}
                </p>
                <p className="text-[var(--niger-orange-light)] text-xs mt-1 font-semibold tracking-wider uppercase">
                  République du Niger
                </p>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {fc.tagline}
            </p>

            {/* Contact Info with Icons */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-white/8 border border-white/10">
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                    <path d="M8 9s4-3 4-6a4 4 0 10-8 0c0 3 4 6 4 6z" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="8" cy="3.5" r="1.2" fill="currentColor" />
                  </svg>
                </span>
                <span>{fc.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-white/8 border border-white/10">
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                    <path d="M2 3.5C2 9.4 6.6 14 12.5 14l.5-2.5-2.5-1-1 1.5C8 11.5 4.5 8 4 6.5L5.5 5.5 4.5 3 2 3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{fc.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-white/8 border border-white/10">
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                    <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
                <a href="mailto:contact@tourisme.gouv.ne" className="hover:text-white transition-colors">
                  contact@tourisme.gouv.ne
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[var(--niger-orange-light)] uppercase mb-5 flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-[var(--niger-orange)]" />
              {fc.discover}
            </p>
            <nav className="grid gap-2.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link group">
                  <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden>
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Practical */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[var(--niger-orange-light)] uppercase mb-5 flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-white/50" />
              {fc.practical}
            </p>
            <nav className="grid gap-2.5">
              {practicalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link group">
                  <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden>
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Institutional */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[var(--niger-orange-light)] uppercase mb-5 flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-[var(--niger-green-light)]" />
              {fc.institutional}
            </p>
            <nav className="grid gap-2.5">
              {institutionalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link group">
                  <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden>
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Partners */}
            <div className="mt-8">
              <p className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase mb-4">
                Partenaires
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-[var(--radius-sm)] border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] text-white/60 font-medium">
                  ONU Tourisme
                </span>
                <span className="rounded-[var(--radius-sm)] border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] text-white/60 font-medium">
                  UEMOA
                </span>
                <span className="rounded-[var(--radius-sm)] border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] text-white/60 font-medium">
                  UNESCO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="page-wrap py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/45 text-center sm:text-left">
            &copy; {new Date().getFullYear()} — {fc.rights}
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link href="#" className="hover:text-white/80 transition-colors">
              Mentions légales
            </Link>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <Link href="#" className="hover:text-white/80 transition-colors">
              Confidentialité
            </Link>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <Link href="/admin" className="hover:text-white/80 transition-colors">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
