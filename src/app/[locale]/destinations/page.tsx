import Image from "next/image";
import { ArtisanButton } from "@/components/ui/artisan-button";
import { DestinationMap } from "@/components/map/destination-map";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getLocalizedContent } from "@/lib/content-service";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const destinations = await getLocalizedContent("destinations", locale);

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <p className="section-kicker">Destinations</p>
        <h1 className="mt-3 text-5xl text-[#123b28]">{dictionary.nav.destinations}</h1>
        <p className="mt-3 max-w-2xl text-[#2f6d4a]">
          Patrimoine vivant, paysages majeurs et itineraires culturels a travers tout le Niger.
        </p>
      </MotionReveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <MotionReveal key={destination.id} delay={index * 0.05}>
            <GlassCard className="news-glass-card p-0">
              <article>
                <div className="news-media relative h-52 w-full">
                  <Image
                    src={destination.heroImage}
                    alt={destination.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132c20]/45 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="surface-chip w-fit">Destination</p>
                  <h2 className="mt-3 text-3xl text-[#123b28]">{destination.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#2f6d4a]">{destination.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#2f6d4a]">{destination.body}</p>
                </div>
              </article>
            </GlassCard>
          </MotionReveal>
        ))}
      </div>

      <div className="mt-10">
        <DestinationMap locale={locale} />
      </div>

      <MotionReveal delay={0.08}>
        <div className="mt-8">
          <ArtisanButton href={`/${locale}/contact`}>{dictionary.hero.ctaPrimary}</ArtisanButton>
        </div>
      </MotionReveal>
    </section>
  );
}
