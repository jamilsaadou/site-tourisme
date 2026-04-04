import { LeadForm } from "@/components/public/lead-form";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <p className="section-kicker">Contact</p>
        <h1 className="mt-3 text-5xl text-[#123b28]">{dictionary.nav.contact}</h1>
        <p className="mt-3 max-w-2xl text-[#2f6d4a]">
          Contact institutionnel et demandes de circuits officiels. Reponse par les equipes du ministere.
        </p>
      </MotionReveal>

      <MotionReveal delay={0.04}>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <GlassCard>
            <p className="surface-chip w-fit">Adresse</p>
            <p className="mt-3 text-sm text-[#2f6d4a]">Ministere du Tourisme du Niger, Niamey</p>
          </GlassCard>
          <GlassCard>
            <p className="surface-chip w-fit">Email</p>
            <p className="mt-3 text-sm text-[#2f6d4a]">contact@tourisme.gouv.ne</p>
          </GlassCard>
          <GlassCard>
            <p className="surface-chip w-fit">Disponibilite</p>
            <p className="mt-3 text-sm text-[#2f6d4a]">Lundi - Vendredi, 8h00 - 17h00</p>
          </GlassCard>
        </div>
      </MotionReveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MotionReveal delay={0.04}>
          <LeadForm locale={locale} type="contact" />
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <LeadForm locale={locale} type="circuit" />
        </MotionReveal>
      </div>
    </section>
  );
}
