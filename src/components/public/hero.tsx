import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locales";

type HeroProps = {
  locale: Locale;
};

type HeroSlide = {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  subtitle: string;
};

const heroSlides: Record<Locale, HeroSlide[]> = {
  fr: [
    {
      src: "/images/imsl.jpeg",
      alt: "Madame la Ministre lors d'une allocution officielle",
      kicker: "Leadership",
      title: "Une vision portée par l'action publique",
      subtitle:
        "Le Ministère du Tourisme et de l'Artisanat impulse une dynamique de valorisation du Niger, de ses territoires et de ses savoir-faire.",
    },
    {
      src: "/images/discou%20minis.jpeg",
      alt: "Madame la Ministre lors d'un événement institutionnel",
      kicker: "Rayonnement",
      title: "Le tourisme nigérien sur la scène institutionnelle",
      subtitle:
        "Rencontres, partenariats et diplomatie culturelle renforcent l'attractivité du Niger auprès des visiteurs et des investisseurs.",
    },
    {
      src: "/images/burki%20minis.jpeg",
      alt: "Cérémonie culturelle au Niger",
      kicker: "Patrimoine vivant",
      title: "Des traditions qui accueillent le monde",
      subtitle:
        "Festivals, cérémonies et expressions culturelles incarnent un Niger fier de son identité et ouvert au monde.",
    },
  ],
  en: [
    {
      src: "/images/imsl.jpeg",
      alt: "The Minister during an official address",
      kicker: "Leadership",
      title: "A public vision in motion",
      subtitle:
        "The Ministry of Tourism and Crafts is driving Niger's visibility, territorial development, and cultural know-how.",
    },
    {
      src: "/images/discou%20minis.jpeg",
      alt: "The Minister at an institutional event",
      kicker: "Outreach",
      title: "Niger tourism on the institutional stage",
      subtitle:
        "Meetings, partnerships, and cultural diplomacy strengthen Niger's appeal to visitors and investors.",
    },
    {
      src: "/images/burki%20minis.jpeg",
      alt: "Cultural ceremony in Niger",
      kicker: "Living heritage",
      title: "Traditions that welcome the world",
      subtitle:
        "Festivals, ceremonies, and cultural expressions reflect a Niger proud of its identity and open to the world.",
    },
  ],
  ha: [
    {
      src: "/images/imsl.jpeg",
      alt: "Ministar yawon bude ido tana gabatar da jawabi",
      kicker: "Jagoranci",
      title: "Hangen nesa mai aiki",
      subtitle:
        "Ma'aikatar Yawon Bude Ido da Sana'o'i na bunkasa martabar Nijar, yankunanta da sana'o'inta na gargajiya.",
    },
    {
      src: "/images/discou%20minis.jpeg",
      alt: "Ministar a wani taron hukuma",
      kicker: "Haske",
      title: "Yawon bude ido na Nijar a dandalin hukuma",
      subtitle:
        "Taron hadin gwiwa da diplomasiyyar al'adu suna kara jan hankalin Nijar ga baki da masu zuba jari.",
    },
    {
      src: "/images/burki%20minis.jpeg",
      alt: "Bikin al'adu a Nijar",
      kicker: "Gado mai rai",
      title: "Al'adun da ke maraba da duniya",
      subtitle:
        "Bukukuwa da al'adun gargajiya suna nuna Nijar mai alfahari da asalinta kuma a bude take ga duniya.",
    },
  ],
};

const cta: Record<Locale, { primary: string; secondary: string; primaryHref: string; secondaryHref: string }> = {
  fr: {
    primary: "Explorer les destinations",
    secondary: "Planifier mon voyage",
    primaryHref: "/fr/destinations",
    secondaryHref: "/fr/contact",
  },
  en: {
    primary: "Explore destinations",
    secondary: "Plan my trip",
    primaryHref: "/en/destinations",
    secondaryHref: "/en/contact",
  },
  ha: {
    primary: "Bincika wurare",
    secondary: "Shirya tafiya",
    primaryHref: "/ha/destinations",
    secondaryHref: "/ha/contact",
  },
};

export function Hero({ locale }: HeroProps) {
  const slides = heroSlides[locale];
  const buttons = cta[locale];
  const heroHeight = "min(85svh, 680px)";

  return (
    <section className="relative overflow-hidden" style={{ minHeight: heroHeight }}>
      {/* Niger Flag Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-[var(--niger-orange)]" />
      
      {/* Slideshow */}
      <div className="hero-main-slider absolute inset-0">
        {slides.map((slide, index) => (
          <figure
            key={`${slide.src}-${index}`}
            className="hero-main-slide"
            style={{ animationDelay: `${index * 8}s` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Modern gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,107,43,0.85) 0%, rgba(0,107,43,0.4) 35%, rgba(26,26,46,0.2) 60%, rgba(26,26,46,0.4) 100%)",
              }}
            />
          </figure>
        ))}
      </div>

      {/* Glass Effect Overlay Pattern */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none opacity-30"
        style={{
          backgroundImage: "url('/image%20s/textureT.png')",
          backgroundSize: "400px 400px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col" style={{ minHeight: heroHeight }}>
        <div className="flex flex-1 items-end pb-12 pt-20">
          <div className="page-wrap w-full">
            <div className="max-w-3xl">
              <div className="hero-main-copy-stack">
                {slides.map((slide, index) => (
                  <article
                    key={`copy-${slide.src}-${index}`}
                    className="hero-main-copy"
                    style={{ animationDelay: `${index * 8}s` }}
                    aria-hidden={index !== 0}
                  >
                    {/* Kicker with Flag Colors */}
                    <span className="kicker kicker--dark mb-6 inline-flex">
                      {slide.kicker}
                    </span>
                    
                    <h1
                      className="text-white"
                      style={{
                        color: "#ffffff",
                        fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                        lineHeight: 1.08,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        textShadow: "0 4px 24px rgba(0,0,0,0.25)",
                      }}
                    >
                      {slide.title}
                    </h1>
                    
                    <p
                      className="mt-5 max-w-2xl text-white/85"
                      style={{ 
                        fontSize: "clamp(1rem, 2.2vw, 1.25rem)", 
                        lineHeight: 1.65,
                        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {slide.subtitle}
                    </p>
                  </article>
                ))}
              </div>

              {/* CTAs with improved styling */}
              <div className="relative z-20 mt-10 flex flex-wrap items-center gap-4">
                <Link href={buttons.primaryHref} className="btn btn-secondary btn-lg group">
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" aria-hidden>
                    <path d="M10 17s6-5 6-9a6 6 0 10-12 0c0 4 6 9 6 9z" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {buttons.primary}
                </Link>
                <Link href={buttons.secondaryHref} className="btn btn-outline btn-lg group">
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {buttons.secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Glass Effect */}
        <div className="relative z-20">
          {/* Glass bar */}
          <div 
            className="mx-4 mb-4 md:mx-8 rounded-[var(--radius-xl)] border border-white/15 backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              {/* Slide indicators */}
              <div className="flex items-center gap-3">
                {slides.map((slide, index) => (
                  <span
                    key={`dot-${index}`}
                    className="hero-main-dot"
                    style={{ animationDelay: `${index * 8}s` }}
                    aria-hidden
                  />
                ))}
              </div>

              {/* Niger Flag Colors Indicator */}
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-6 rounded-full bg-[var(--niger-orange)]" />
                  <span className="h-2 w-6 rounded-full bg-white" />
                  <span className="h-2 w-6 rounded-full bg-[var(--niger-green)]" />
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="flex items-center gap-2 text-white/70" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 animate-bounce"
                >
                  <path
                    d="M12 5v14M5 13l7 7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-semibold tracking-widest uppercase">
                  {locale === "fr" ? "Défiler" : locale === "en" ? "Scroll" : "Zagaya"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Niger Flag Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-[var(--niger-green)]" />
    </section>
  );
}
