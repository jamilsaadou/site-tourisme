import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { Hero } from "@/components/public/hero";
import {
  InstitutionalIndicators,
  type InstitutionalIndicatorItem,
} from "@/components/public/institutional-indicators";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getHomeContent } from "@/lib/content-service";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";

/* ─── SVG Icon Components ───────────────────────────────────────── */
function IconDesert({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M2 18c2-4 4-6 6-6 1.5 0 2.5 1 4 1s3-2 4-2 3 2 6 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 18c.5-2 1-3 2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M17 4.5V3M17 11.5V10M14.5 7H13M21 7h-1.5M15.3 5.3l-1-1M19.7 9.7l-1-1M19.7 5.3l1-1M15.3 9.7l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconWildlife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 14c-2.5 0-4.5 1.5-5 4h10c-.5-2.5-2.5-4-5-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 8.5C6 7 5 4 6.5 3S10 4 10 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 8.5C18 7 19 4 17.5 3S14 4 14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 10.5c-.5-.3-1.5-.5-2 .3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 10.5c.5-.3 1.5-.5 2 .3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCulture({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 20V9M9 20V9M15 20V9M19 20V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 9L12 4l7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="14" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconRiver({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 12c1.5-2 3-3 4.5-3S10 11 12 11s3-2 4.5-2 3 1 4.5 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 17c1.5-2 3-3 4.5-3S10 16 12 16s3-2 4.5-2 3 1 4.5 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 9V6l3-2 3 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCraft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 7l1.5 1.5M15.5 15.5L17 17M17 7l-1.5 1.5M8.5 15.5L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconFestival({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2l2.4 5.3 5.6.7-4 4 1 5.7L12 15l-5 2.7 1-5.7-4-4 5.6-.7L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.5 7.5h15M4.5 16.5h15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconRoute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 7h10a3 3 0 010 6H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 5L3.5 7 6 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 17H10a3 3 0 010-6h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18 15l2.5 2L18 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCommunity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 14c2.2.5 4 2.4 4 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 14s5-4 5-7a5 5 0 00-10 0c0 3 5 7 5 7z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/* ─── Experience data (no emoji) ────────────────────────────────── */
type ExpKey = "desert" | "wildlife" | "culture" | "river" | "craft" | "festival";

const expLabels: Record<Locale, Record<ExpKey, string>> = {
  fr: {
    desert: "Désert & Sahara",
    wildlife: "Faune & Safari",
    culture: "Culture & Histoire",
    river: "Fleuve Niger",
    craft: "Artisanat",
    festival: "Festivals",
  },
  en: {
    desert: "Desert & Sahara",
    wildlife: "Wildlife & Safari",
    culture: "Culture & History",
    river: "Niger River",
    craft: "Craftsmanship",
    festival: "Festivals",
  },
  ha: {
    desert: "Hamada & Sahara",
    wildlife: "Dabbobi & Safari",
    culture: "Al'adu & Tarihi",
    river: "Kogin Kwara",
    craft: "Sana'a",
    festival: "Bukukuwa",
  },
};

const expIcons: Record<ExpKey, (props: { className?: string }) => React.ReactElement> = {
  desert: IconDesert,
  wildlife: IconWildlife,
  culture: IconCulture,
  river: IconRiver,
  craft: IconCraft,
  festival: IconFestival,
};

const expKeys: ExpKey[] = ["desert", "wildlife", "culture", "river", "craft", "festival"];

/* ─── Static institutional copy ────────────────────────────────── */
const copy: Record<
  Locale,
  {
    overviewTitle: string;
    overviewText: string;
    missions: Array<{ key: string; text: string }>;
    stats: Array<{ value: string; label: string; sub: string }>;
    axesTitle: string;
    axes: Array<{ num: string; title: string; text: string }>;
    expTitle: string;
    newsTitle: string;
    contactTitle: string;
    contactText: string;
    destsTitle: string;
    eventsTitle: string;
  }
> = {
  fr: {
    overviewTitle: "Le Niger, une destination sahélienne d'exception",
    overviewText:
      "Le Ministère du Tourisme et de l'Artisanat pilote la stratégie nationale de valorisation du patrimoine, de développement des destinations et d'amélioration de l'accueil touristique. De l'Aïr au Fleuve Niger, nous construisons un tourisme durable, authentique et compétitif.",
    missions: [
      { key: "globe", text: "Promouvoir l'image du Niger comme destination sûre, authentique et compétitive à l'international." },
      { key: "route", text: "Structurer les circuits touristiques et renforcer la qualité des services nationaux." },
      { key: "community", text: "Accompagner les communautés locales et les opérateurs dans la création de valeur." },
    ],
    stats: [
      { value: "2", label: "Sites UNESCO", sub: "Aïr & Ténéré · W du Niger" },
      { value: "8", label: "Régions touristiques", sub: "Du Sahara au Sahel" },
      { value: "20+", label: "Programmes d'appui", sub: "Aux opérateurs locaux" },
      { value: "2030", label: "Vision nationale", sub: "Stratégie sectorielle" },
    ],
    axesTitle: "Stratégie Nationale 2026",
    axes: [
      { num: "01", title: "Gouvernance sectorielle", text: "Coordination institutionnelle et cadre d'action pour l'ensemble des acteurs publics et privés du secteur touristique." },
      { num: "02", title: "Promotion territoriale", text: "Mise en valeur des régions, des patrimoines culturels classés et des expériences locales authentiques." },
      { num: "03", title: "Investissement & innovation", text: "Amélioration des infrastructures d'accueil, digitalisation des services et attractivité pour les partenaires étrangers." },
    ],
    expTitle: "Que découvrir au Niger ?",
    newsTitle: "Actualités",
    contactTitle: "Une question ou un partenariat ?",
    contactText: "Le Ministère du Tourisme est à votre disposition pour accompagner vos projets au Niger.",
    destsTitle: "Destinations officielles",
    eventsTitle: "Agenda des événements",
  },
  en: {
    overviewTitle: "Niger, an exceptional Sahelian destination",
    overviewText:
      "The Ministry of Tourism and Crafts leads the national strategy for heritage promotion, destination development and tourism service improvement. From the Aïr to the Niger River, we are building sustainable, authentic and competitive tourism.",
    missions: [
      { key: "globe", text: "Promote Niger as a safe, authentic and competitive international destination." },
      { key: "route", text: "Structure tourism circuits and improve national service quality." },
      { key: "community", text: "Support local communities and operators in local value creation." },
    ],
    stats: [
      { value: "2", label: "UNESCO Sites", sub: "Aïr & Ténéré · W of Niger" },
      { value: "8", label: "Tourist regions", sub: "From Sahara to Sahel" },
      { value: "20+", label: "Support programs", sub: "For local operators" },
      { value: "2030", label: "National vision", sub: "Sector strategy" },
    ],
    axesTitle: "National Strategy 2026",
    axes: [
      { num: "01", title: "Sector governance", text: "Institutional coordination and action framework for all public and private tourism stakeholders." },
      { num: "02", title: "Territorial promotion", text: "Showcasing regions, classified cultural heritage and authentic local experiences." },
      { num: "03", title: "Investment & innovation", text: "Infrastructure upgrades, service digitalization and attractiveness for foreign partners." },
    ],
    expTitle: "What to discover in Niger?",
    newsTitle: "Institutional news",
    contactTitle: "A question or partnership?",
    contactText: "The Ministry of Tourism is at your disposal to support your tourism projects in Niger.",
    destsTitle: "Official destinations",
    eventsTitle: "Events calendar",
  },
  ha: {
    overviewTitle: "Nijar, wurin yawon bude ido na musamman",
    overviewText:
      "Ma'aikatar yawon bude ido ta Nijar na jagorantar dabarar kasa don bunkasa wuraren yawon bude ido da inganta hidimar baki.",
    missions: [
      { key: "globe", text: "Tallata Nijar a matsayin wuri mai aminci, inganci da kima a duniya." },
      { key: "route", text: "Tsara hanyoyin yawon bude ido da kara ingancin hidima a fadin kasa." },
      { key: "community", text: "Taimaka wa al'umma da masu sana'a wajen kirkirar darajar gida." },
    ],
    stats: [
      { value: "2", label: "Wuraren UNESCO", sub: "Aïr & Ténéré · W" },
      { value: "8", label: "Yankuna masu fifiko", sub: "Sahara zuwa Sahel" },
      { value: "20+", label: "Shirye-shiryen tallafi", sub: "Ga masu sana'a" },
      { value: "2030", label: "Hangen nesa", sub: "Dabarar kasa" },
    ],
    axesTitle: "Dabarar Kasa 2026",
    axes: [
      { num: "01", title: "Gudanarwar sashen", text: "Hadin gwiwar hukuma da tsari mai karfi ga dukkan masu ruwa da tsaki." },
      { num: "02", title: "Tallata yankuna", text: "Bayyana yankuna, al'adu da gogewar gida ga masu ziyara." },
      { num: "03", title: "Jari & kirkire-kirkire", text: "Inganta kayayyaki da digital domin jan hankalin abokan hulda." },
    ],
    expTitle: "Me za a gano a Nijar?",
    newsTitle: "Labarai na hukuma",
    contactTitle: "Tambaya ko haɗin gwiwa?",
    contactText: "Ma'aikatar tana shirye don taimakon ayyukanku na yawon bude ido a Nijar.",
    destsTitle: "Wuraren yawon bude ido",
    eventsTitle: "Jadawalin abubuwa",
  },
};

/* ─── Page ──────────────────────────────────────────────────────── */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const content = await getHomeContent(locale);
  const ui = copy[locale];
  const labels = expLabels[locale];
  const baseIcons: InstitutionalIndicatorItem["icon"][] = ["culture", "map", "community", "target"];
  const baseTones = ["#fbbf24", "#93c5fd", "#86efac", "#fca5a5"];
  const institutionalIndicators: InstitutionalIndicatorItem[] = ui.stats.map((stat, index) => ({
    value: stat.value,
    label: stat.label,
    sub: stat.sub,
    icon: baseIcons[index] ?? "globe",
    tone: baseTones[index] ?? "#fbbf24",
  }));
  institutionalIndicators.push({
    value: String(content.events.length),
    label:
      locale === "fr"
        ? "Événements"
        : locale === "en"
          ? "Events"
          : "Abubuwa",
    sub:
      locale === "fr"
        ? "Planifiés"
        : locale === "en"
          ? "Scheduled"
          : "An tsara",
    icon: "calendar",
    tone: "#fb923c",
  });

  return (
    <>
      {/* ①  Hero plein écran */}
      <Hero locale={locale} />

      {/* ②  Catégories d'expériences — navigation rapide */}
      <MotionReveal>
        <div className="border-b border-[var(--surface-border)] bg-white">
          <div className="page-wrap py-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="kicker">{ui.expTitle}</span>
              <Link href={`/${locale}/destinations`} className="text-link text-xs">
                {dictionary.nav.destinations}
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {expKeys.map((key) => {
                const Icon = expIcons[key];
                return (
                  <Link
                    key={key}
                    href={`/${locale}/destinations`}
                    className="exp-card group py-4"
                  >
                    <div className="exp-icon">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-[0.72rem] font-semibold text-center text-[var(--forest-mid)] group-hover:text-[var(--gold)] transition-colors leading-tight">
                      {labels[key]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* ④  Stats band — indicateurs clés */}
      <MotionReveal>
        <div className="stats-band py-16">
          <div className="page-wrap relative z-10">
            <div className="mb-10">
              <span className="kicker kicker--dark">
                {locale === "fr" ? "Niger en chiffres" : locale === "en" ? "Niger by numbers" : "Nijar da lambobi"}
              </span>
              <h2
                className="mt-3 text-white"
                style={{
                  fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                {locale === "fr" ? "Indicateurs institutionnels" : locale === "en" ? "Institutional indicators" : "Alamomin hukuma"}
              </h2>
            </div>
            <InstitutionalIndicators locale={locale} items={institutionalIndicators} />
          </div>
        </div>
      </MotionReveal>

      {/* ⑤  Actualités */}
      {content.articles.length > 0 && (
        <MotionReveal>
          <div
            className="py-14"
            style={{ background: "var(--sand-mid)" }}
          >
            <div className="page-wrap">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="kicker">
                    {locale === "fr" ? "Actualités" : locale === "en" ? "News" : "Labarai"}
                  </span>
                  <h2
                    className="mt-3 text-[var(--forest-mid)]"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    {ui.newsTitle}
                  </h2>
                  <span className="section-line" />
                </div>
                <Link href={`/${locale}/actualites`} className="text-link hidden sm:inline-flex">
                  {dictionary.nav.news}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Featured + secondary layout */}
              <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
                {/* Featured article */}
                {content.articles[0] && (
                  <Link
                    href={`/${locale}/actualites/${content.articles[0].slug}`}
                    className="news-card group block"
                  >
                    <div className="news-card-img relative h-64 w-full overflow-hidden md:h-72">
                      <Image
                        src={content.articles[0].coverImage}
                        alt={content.articles[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 55vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      <span className="absolute top-3 left-3 badge badge-gold">
                        {locale === "fr" ? "À la une" : "Featured"}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="badge badge-green">
                        {locale === "fr" ? "Communiqué" : "Press release"}
                      </span>
                      <h3
                        className="mt-3 text-[var(--forest-mid)] leading-snug"
                        style={{
                          fontSize: "1.15rem",
                          fontFamily: "var(--font-playfair), Georgia, serif",
                        }}
                      >
                        {content.articles[0].title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--forest-soft)] leading-relaxed line-clamp-2">
                        {content.articles[0].excerpt}
                      </p>
                      <span className="text-link mt-4 text-xs">
                        {locale === "fr" ? "Lire la suite" : "Read more"}
                        <IconArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                )}

                {/* Secondary articles stacked */}
                <div className="flex flex-col gap-4">
                  {content.articles.slice(1, 3).map((article) => (
                    <Link
                      key={article.id}
                      href={`/${locale}/actualites/${article.slug}`}
                      className="news-card group flex overflow-hidden"
                    >
                      <div className="news-card-img relative h-full w-28 shrink-0 sm:w-36">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-4">
                        <span className="badge badge-green self-start">
                          {locale === "fr" ? "Actualité" : "News"}
                        </span>
                        <h3
                          className="mt-2 text-[var(--forest-mid)] leading-snug line-clamp-2"
                          style={{
                            fontSize: "0.95rem",
                            fontFamily: "var(--font-playfair), Georgia, serif",
                          }}
                        >
                          {article.title}
                        </h3>
                        <span className="text-link mt-2 text-xs">
                          {locale === "fr" ? "Lire" : "Read"}
                          <IconArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link href={`/${locale}/actualites`} className="btn btn-primary">
                  {locale === "fr" ? "Toutes les actualités" : "All news"}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </MotionReveal>
      )}

      {/* ⑦  Axes stratégiques */}
      <MotionReveal>
        <div className="page-wrap py-14">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="kicker kicker--gold">
                {locale === "fr" ? "Axes stratégiques" : locale === "en" ? "Strategic pillars" : "Tushen dabaru"}
              </span>
              <h2
                className="mt-3 text-[var(--forest-mid)]"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                {ui.axesTitle}
              </h2>
              <span className="section-line" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {ui.axes.map((axis, i) => (
              <div
                key={axis.num}
                className="card-glass rounded-[20px] p-7 flex flex-col"
              >
                {/* Number */}
                <span
                  className="text-[3.5rem] font-bold leading-none select-none"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    background:
                      i === 0
                        ? "linear-gradient(135deg, #c8860a, #e36414)"
                        : i === 1
                          ? "linear-gradient(135deg, #137b50, #0f6b3e)"
                          : "linear-gradient(135deg, #1e3a5f, #137b50)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {axis.num}
                </span>
                <h3
                  className="mt-4 text-[var(--forest-mid)]"
                  style={{
                    fontSize: "1.15rem",
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  {axis.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--forest-soft)] leading-relaxed flex-1">
                  {axis.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionReveal>

      {/* ⑧  Événements + Circuits — côte à côte */}
      {content.events.length > 0 && (
        <MotionReveal>
          <div
            className="py-14"
            style={{ background: "var(--sand-mid)" }}
          >
            <div className="page-wrap">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="kicker">Agenda</span>
                  <h2
                    className="mt-3 text-[var(--forest-mid)]"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    {ui.eventsTitle}
                  </h2>
                  <span className="section-line" />
                </div>
                <Link href={`/${locale}/evenements`} className="text-link hidden sm:inline-flex">
                  {dictionary.nav.events}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {content.events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/${locale}/evenements/${event.slug}`}
                    className="card-base block p-5 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date chip */}
                      <div className="shrink-0 rounded-xl border border-[rgba(200,134,10,0.2)] bg-[var(--gold-soft)] px-3 py-2 text-center min-w-[3.5rem]">
                        <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[var(--gold)]">
                          {new Date(event.startsAt).toLocaleString(
                            locale === "fr" ? "fr-NE" : "en-US",
                            { month: "short" }
                          )}
                        </p>
                        <p
                          className="text-2xl font-bold leading-none text-[var(--forest-mid)] mt-0.5"
                          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                        >
                          {new Date(event.startsAt).getDate()}
                        </p>
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <span className="badge badge-green mb-2">
                          {locale === "fr" ? "Événement" : "Event"}
                        </span>
                        <h3
                          className="text-[var(--forest-mid)] leading-snug group-hover:text-[var(--flag-green)] transition-colors"
                          style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontSize: "0.95rem",
                          }}
                        >
                          {event.title}
                        </h3>
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-[var(--ink-soft)]">
                          <IconPin className="h-3 w-3 shrink-0" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      )}

      {/* ⑨  Bannière contact */}
      <MotionReveal>
        <div className="page-wrap py-14">
          <div
            className="relative overflow-hidden rounded-[24px] px-8 py-14 text-center md:px-16"
            style={{
              background: "linear-gradient(135deg, var(--forest-mid) 0%, var(--flag-green) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 15% 50%, rgba(200,134,10,0.18), transparent 50%), radial-gradient(circle at 85% 40%, rgba(255,255,255,0.05), transparent 45%)",
              }}
            />
            <div className="relative z-10">
              <span className="kicker kicker--dark">Contact</span>
              <h2
                className="mt-4 text-white"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                {ui.contactTitle}
              </h2>
              <p className="mt-3 max-w-md mx-auto text-white/70 text-[0.95rem] leading-relaxed">
                {ui.contactText}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href={`/${locale}/contact`} className="btn btn-gold btn-lg">
                  {dictionary.nav.contact}
                </Link>
                <a
                  href="mailto:contact@tourisme.gouv.ne"
                  className="btn btn-outline btn-lg"
                >
                  contact@tourisme.gouv.ne
                </a>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </>
  );
}
