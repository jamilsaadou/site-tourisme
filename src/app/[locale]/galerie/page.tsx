import { MosaicGallery } from "@/components/public/mosaic-gallery";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getLocalizedContent } from "@/lib/content-service";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const gallery = await getLocalizedContent("gallery", locale);

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <p className="section-kicker">Galerie</p>
        <h1 className="mt-3 text-5xl text-[#123b28]">{dictionary.nav.gallery}</h1>
        <p className="mt-3 max-w-2xl text-[#2f6d4a]">
          Collection visuelle des paysages, scenes culturelles et savoir-faire artisanaux du Niger.
        </p>
      </MotionReveal>

      <div className="mt-8">
        <MosaicGallery items={gallery} />
      </div>
    </section>
  );
}
