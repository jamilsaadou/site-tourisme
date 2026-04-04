import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getLocalizedContent } from "@/lib/content-service";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";
import { formatDate } from "@/lib/utils";

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const events = await getLocalizedContent("events", locale);
  const eventImages = ["/media/destination-desert.jpg", "/media/alkaki-zinder.jpg", "/media/paysage-aerien.jpg"];

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <p className="section-kicker">Agenda</p>
        <h1 className="mt-3 text-5xl text-[#123b28]">{dictionary.nav.events}</h1>
        <p className="mt-3 max-w-2xl text-[#2f6d4a]">
          Agenda culturel et touristique national avec les activites majeures a venir.
        </p>
      </MotionReveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {events.map((event, index) => (
          <MotionReveal key={event.id} delay={index * 0.06}>
            <GlassCard className="news-glass-card p-0">
              <article>
                <div className="news-media relative h-56 w-full">
                  <Image
                    src={eventImages[index % eventImages.length]}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132c20]/50 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <p className="surface-chip w-fit">{event.location}</p>
                  <h2 className="mt-3 text-3xl text-[#123b28]">{event.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#2f6d4a]">{event.body}</p>
                  <p className="mt-3 text-sm font-semibold text-[#2f6d4a]">
                    {formatDate(event.startsAt, locale)} - {formatDate(event.endsAt, locale)}
                  </p>
                </div>
              </article>
            </GlassCard>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
