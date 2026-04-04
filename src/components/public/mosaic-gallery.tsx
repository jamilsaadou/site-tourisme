import Image from "next/image";
import { MotionReveal } from "@/components/ui/motion-reveal";

type GalleryItem = {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
};

type MosaicGalleryProps = {
  items: GalleryItem[];
};

export function MosaicGallery({ items }: MosaicGalleryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <MotionReveal key={item.id} delay={index * 0.06}>
          <article className="glass-surface news-glass-card group relative overflow-hidden rounded-3xl p-0">
            <div className="news-media relative h-56 w-full">
              <Image
                src={item.imageUrl}
                alt={item.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122b1f]/50 via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <p className="surface-chip w-fit">{item.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#123b28]">{item.caption}</p>
            </div>
          </article>
        </MotionReveal>
      ))}
    </div>
  );
}
