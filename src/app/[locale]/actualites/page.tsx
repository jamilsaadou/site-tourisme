import Image from "next/image";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getLocalizedContent } from "@/lib/content-service";
import { getDictionary } from "@/lib/dictionaries";
import { resolveLocale } from "@/lib/locale-routing";
import { cn, formatDate } from "@/lib/utils";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const articles = await getLocalizedContent("articles", locale);
  const copy =
    locale === "fr"
      ? {
          kicker: "Actualites",
          intro: "Suivez les annonces officielles, projets strategiques et actions de terrain du ministere.",
          featured: "A la une",
          category: "Communique",
          dateFallback: "Date a confirmer",
          emptyTitle: "Aucune actualite publiee",
          emptyBody: "Le flux sera mis a jour des qu'un nouvel article sera disponible.",
        }
      : locale === "en"
        ? {
            kicker: "News",
            intro: "Follow official announcements, strategic projects and field actions from the ministry.",
            featured: "Featured",
            category: "Press release",
            dateFallback: "Date to be confirmed",
            emptyTitle: "No news published yet",
            emptyBody: "This section will be updated as soon as a new article is available.",
          }
        : {
            kicker: "Labarai",
            intro: "Bibiya sanarwar hukuma, manyan tsare-tsare da ayyukan da ma'aikatar ke yi a kasa.",
            featured: "Babban labari",
            category: "Sanarwa",
            dateFallback: "Ranar ba ta bayyana ba",
            emptyTitle: "Babu sabon labari yanzu",
            emptyBody: "Za a sabunta wannan sashe da zarar an wallafa sabon labari.",
          };

  return (
    <section className="page-wrap py-12 md:py-14">
      <MotionReveal>
        <span className="kicker">{copy.kicker}</span>
        <h1
          className="mt-3 text-[var(--forest-mid)]"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          {dictionary.nav.news}
        </h1>
        <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-[var(--forest-soft)]">
          {copy.intro}
        </p>
        <span className="section-line" />
      </MotionReveal>

      {articles.length === 0 ? (
        <MotionReveal className="mt-8">
          <div className="card-glass rounded-3xl border border-[var(--surface-border)] p-7">
            <h2
              className="text-[var(--forest-mid)]"
              style={{
                fontSize: "1.25rem",
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              {copy.emptyTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--forest-soft)]">{copy.emptyBody}</p>
          </div>
        </MotionReveal>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {articles.map((article, index) => {
            const isFeatured = index === 0;
            const articleDate = article.publishedAt ? formatDate(article.publishedAt, locale) : copy.dateFallback;
            const articleSummary = article.excerpt || article.body;

            return (
              <MotionReveal key={article.id} delay={index * 0.05} className={isFeatured ? "md:col-span-2" : undefined}>
                <article
                  className={cn(
                    "news-card group h-full",
                    isFeatured && "md:grid md:grid-cols-[1.1fr_1fr]"
                  )}
                >
                  <div
                    className={cn(
                      "news-card-img relative w-full overflow-hidden",
                      isFeatured ? "h-64 md:h-full" : "h-52"
                    )}
                  >
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132c20]/42 via-transparent to-transparent" />
                    {isFeatured ? (
                      <span className="absolute left-4 top-4 badge badge-gold">{copy.featured}</span>
                    ) : null}
                  </div>

                  <div className={cn("flex flex-col", isFeatured ? "p-6 md:justify-center" : "p-5")}>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge badge-green">{copy.category}</span>
                      <span className="text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[var(--forest-muted)]">
                        {articleDate}
                      </span>
                    </div>

                    <h2
                      className={cn(
                        "mt-3 text-[var(--forest-mid)] leading-snug",
                        isFeatured ? "text-[1.45rem] md:text-[1.65rem]" : "text-[1.1rem]"
                      )}
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {article.title}
                    </h2>

                    {articleSummary ? (
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed text-[var(--forest-soft)]",
                          isFeatured ? "line-clamp-4" : "line-clamp-3"
                        )}
                      >
                        {articleSummary}
                      </p>
                    ) : null}
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
