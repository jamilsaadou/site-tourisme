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
      src: "/images/WhatsApp%20Image%202026-03-06%20at%2009.40.54.jpeg",
      alt: "Madame la Ministre du Tourisme du Niger",
      kicker: "Leadership",
      title: "Madame la Ministre du Tourisme",
      subtitle: "Conduire les priorités nationales pour un tourisme durable, authentique et compétitif au Niger.",
    },
    {
      src: "/media/hero-tourisme.jpg",
      alt: "Paysage touristique du Niger",
      kicker: "Destinations",
      title: "Là où le Sahara rencontre la vie",
      subtitle: "Désert de l'Aïr, Fleuve Niger, W du Niger — des trésors naturels et culturels uniques au monde.",
    },
    {
      src: "/media/alkaki-zinder.jpg",
      alt: "Savoir-faire artisanal du Niger",
      kicker: "Patrimoine",
      title: "Culture et artisanat nigérien",
      subtitle: "Cuir de Zinder, bronze touareg, tissu traditionnel — un savoir-faire millénaire à découvrir.",
    },
  ],
  en: [
    {
      src: "/images/WhatsApp%20Image%202026-03-06%20at%2009.40.54.jpeg",
      alt: "Minister of Tourism of Niger",
      kicker: "Leadership",
      title: "Minister of Tourism",
      subtitle: "Driving national priorities for sustainable, authentic, and competitive tourism in Niger.",
    },
    {
      src: "/media/hero-tourisme.jpg",
      alt: "Tourism landscape in Niger",
      kicker: "Destinations",
      title: "Where the Sahara meets life",
      subtitle: "Aïr Desert, Niger River, W National Park — world-class natural and cultural treasures.",
    },
    {
      src: "/media/alkaki-zinder.jpg",
      alt: "Niger craftsmanship",
      kicker: "Heritage",
      title: "Culture and craftsmanship",
      subtitle: "Zinder leather, Tuareg bronze, traditional textiles — a millennium of know-how.",
    },
  ],
  ha: [
    {
      src: "/images/WhatsApp%20Image%202026-03-06%20at%2009.40.54.jpeg",
      alt: "Ministar yawon bude ido ta Nijar",
      kicker: "Jagoranci",
      title: "Ministar yawon bude ido",
      subtitle: "Jagorancin manyan manufofi domin dorewar bunkasar yawon bude ido a Nijar.",
    },
    {
      src: "/media/hero-tourisme.jpg",
      alt: "Kyawawan wuraren Nijar",
      kicker: "Wurare",
      title: "Inda hamada ta haɗu da rayuwa",
      subtitle: "Hamada, Kogin Kwara, W National Park — kyawawan wuraren duniya.",
    },
    {
      src: "/media/alkaki-zinder.jpg",
      alt: "Sana'ar gargajiya ta Nijar",
      kicker: "Gado",
      title: "Al'adu da sana'a",
      subtitle: "Fata ta Zinder, tagulla ta Tuareg, zane na gargajiya — tsararren sana'a.",
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
  const heroHeight = "min(82svh, 620px)";

  return (
    <section className="relative overflow-hidden" style={{ minHeight: heroHeight }}>
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
            {/* Cinematic gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,35,24,0.88) 0%, rgba(13,35,24,0.45) 40%, rgba(13,35,24,0.2) 70%, rgba(13,35,24,0.35) 100%)",
              }}
            />
          </figure>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col" style={{ minHeight: heroHeight }}>
        <div className="flex flex-1 items-end pb-10 pt-16">
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
                    <span className="kicker kicker--dark mb-5 inline-flex">
                      {slide.kicker}
                    </span>
                    <h1
                      className="font-display text-white"
                      style={{
                        fontSize: "clamp(2rem, 5.5vw, 4rem)",
                        lineHeight: 1.1,
                        fontWeight: 700,
                        textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p
                      className="mt-4 max-w-2xl text-white/80"
                      style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", lineHeight: 1.6 }}
                    >
                      {slide.subtitle}
                    </p>
                  </article>
                ))}
              </div>

              {/* CTAs — always visible */}
              <div className="relative z-20 mt-8 flex flex-wrap items-center gap-3">
                <Link href={buttons.primaryHref} className="btn btn-gold btn-lg">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
                    <path d="M10 17s6-5 6-9a6 6 0 10-12 0c0 4 6 9 6 9z" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {buttons.primary}
                </Link>
                <Link href={buttons.secondaryHref} className="btn btn-outline btn-lg">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
                    <path d="M10 3l6 10H4L10 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                  {buttons.secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: slide indicators + scroll hint */}
        <div className="relative z-20 flex items-center justify-between px-6 pb-6 md:px-10">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <span
                key={`dot-${index}`}
                className="hero-main-dot"
                style={{ animationDelay: `${index * 8}s` }}
                aria-hidden
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="hidden items-center gap-2 text-white/60 md:flex" aria-hidden>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 animate-bounce"
            >
              <path
                d="M12 5v14M5 13l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-medium tracking-widest uppercase">Défiler</span>
          </div>
        </div>
      </div>
    </section>
  );
}
