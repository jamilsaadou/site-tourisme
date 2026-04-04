import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

type MinistrySlug =
  | "a-propos"
  | "publications-officielles"
  | "partenaires-bailleurs"
  | "presse-medias"
  | "accessibilite";

type SectionContent = {
  title: string;
  intro: string;
  cards: Array<{ title: string; text: string }>;
  actions: string[];
};

const ministrySlugs: MinistrySlug[] = [
  "a-propos",
  "publications-officielles",
  "partenaires-bailleurs",
  "presse-medias",
  "accessibilite",
];

const ministryContent: Record<MinistrySlug, SectionContent> = {
  "a-propos": {
    title: "A propos du Ministere",
    intro:
      "Le Ministere du Tourisme et de l'Artisanat definit les orientations nationales pour valoriser les destinations, proteger le patrimoine et renforcer l'accueil des visiteurs.",
    cards: [
      {
        title: "Vision",
        text: "Construire un tourisme durable, inclusif et competitif, appuye sur les territoires et les savoir-faire nationaux.",
      },
      {
        title: "Missions",
        text: "Coordonner les politiques sectorielles, accompagner les operateurs et promouvoir l'image du Niger a l'echelle regionale et internationale.",
      },
      {
        title: "Priorites 2026",
        text: "Gouvernance, qualite des services, investissement public-prive et promotion digitale des offres touristiques.",
      },
    ],
    actions: [
      "Renforcement du cadre institutionnel et reglementaire du secteur.",
      "Mise a niveau des standards d'accueil sur les sites prioritaires.",
      "Appui technique aux collectivites et aux acteurs prives du tourisme.",
    ],
  },
  "publications-officielles": {
    title: "Publications officielles",
    intro:
      "Cette rubrique centralise les documents de reference du Ministere: strategies, notes d'orientation, communiques institutionnels et rapports sectoriels.",
    cards: [
      {
        title: "Documents strategiques",
        text: "Feuilles de route, plans d'action annuels et cadres d'intervention pluriannuels pour le secteur.",
      },
      {
        title: "Communiques",
        text: "Informations officielles sur les decisions ministerielles, les missions de terrain et les partenariats.",
      },
      {
        title: "Transparence",
        text: "Publication reguliere de contenus institutionnels pour une meilleure lisibilite des actions menees.",
      },
    ],
    actions: [
      "Diffusion trimestrielle des notes de conjoncture touristique.",
      "Archivage numerique progressif des publications majeures.",
      "Normalisation des formats de publication pour faciliter la consultation.",
    ],
  },
  "partenaires-bailleurs": {
    title: "Partenaires & bailleurs",
    intro:
      "Le Ministere travaille avec les partenaires techniques et financiers pour accelerer les projets structurants et soutenir les initiatives locales.",
    cards: [
      {
        title: "Cooperation technique",
        text: "Mobilisation d'expertise pour la planification touristique, la formation et la qualite des services.",
      },
      {
        title: "Financement",
        text: "Appui aux investissements prioritaires: amenagements, signaletique, accueil et promotion des destinations.",
      },
      {
        title: "Impact territorial",
        text: "Orientation des projets vers les regions a fort potentiel pour creer de la valeur locale et des emplois.",
      },
    ],
    actions: [
      "Mise en place d'un cadre de concertation periodique avec les bailleurs.",
      "Suivi de portefeuilles de projets a impact social et economique.",
      "Appui a la formulation de nouveaux programmes de cooperation.",
    ],
  },
  "presse-medias": {
    title: "Presse & medias",
    intro:
      "Espace dedie aux journalistes, redacteurs et medias pour acceder aux informations utiles, prises de parole officielles et ressources de communication.",
    cards: [
      {
        title: "Relations presse",
        text: "Point de contact institutionnel pour demandes d'interview, verification d'informations et couverture des activites.",
      },
      {
        title: "Ressources media",
        text: "Mise a disposition de contenus de reference: dossiers thematiques, chiffres clefs et elements de langage.",
      },
      {
        title: "Calendrier",
        text: "Annonce des evenements, conferences et deplacements officiels lies au tourisme et a l'artisanat.",
      },
    ],
    actions: [
      "Organisation de briefings periodiques avec la presse nationale.",
      "Renforcement de la diffusion multicanale des communiques.",
      "Production de kits media pour les campagnes institutionnelles.",
    ],
  },
  accessibilite: {
    title: "Accessibilite",
    intro:
      "Le Ministere veille a rendre l'information et les services plus accessibles aux citoyens, professionnels et visiteurs, sur supports physiques et numeriques.",
    cards: [
      {
        title: "Acces a l'information",
        text: "Structuration des contenus pour une lecture claire, des parcours simples et une meilleure comprehension des services proposes.",
      },
      {
        title: "Inclusion",
        text: "Prise en compte des besoins de differents publics dans la communication institutionnelle et l'orientation usager.",
      },
      {
        title: "Amelioration continue",
        text: "Recueil des retours usagers pour prioriser les evolutions ergonomiques et editoriales du portail.",
      },
    ],
    actions: [
      "Audit periodique de l'experience utilisateur sur les pages publiques.",
      "Harmonisation de la navigation et des standards de contenu.",
      "Canal dedie aux suggestions sur l'accessibilite des services en ligne.",
    ],
  },
};

function isMinistrySlug(value: string): value is MinistrySlug {
  return ministrySlugs.includes(value as MinistrySlug);
}

export default async function MinistereSubmenuPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeValue, slug } = await params;

  if (!isLocale(localeValue) || !isMinistrySlug(slug)) {
    notFound();
  }

  const locale: Locale = localeValue;
  const dictionary = getDictionary(locale);
  const content = ministryContent[slug];

  const ministryLinks = [
    { href: `/${locale}/ministere/a-propos`, label: dictionary.nav.ministryAbout },
    { href: `/${locale}/ministere/publications-officielles`, label: dictionary.nav.ministryPublications },
    { href: `/${locale}/ministere/partenaires-bailleurs`, label: dictionary.nav.ministryPartners },
    { href: `/${locale}/ministere/presse-medias`, label: dictionary.nav.ministryPress },
    { href: `/${locale}/ministere/accessibilite`, label: dictionary.nav.ministryAccessibility },
  ];

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <span className="kicker">{dictionary.nav.ministry}</span>
        <h1 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] text-[#123b28]">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#2f6d4a]">{content.intro}</p>
      </MotionReveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <MotionReveal key={card.title} delay={index * 0.06}>
            <GlassCard>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#5a9478]">{card.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#2f6d4a]">{card.text}</p>
            </GlassCard>
          </MotionReveal>
        ))}
      </div>

      <MotionReveal delay={0.08}>
        <GlassCard className="mt-6">
          <h2 className="text-2xl text-[#123b28]">Actions en cours</h2>
          <div className="mt-4 grid gap-3">
            {content.actions.map((item) => (
              <p key={item} className="rounded-xl border border-[#dce8df] bg-white/70 px-4 py-3 text-sm leading-relaxed text-[#2f6d4a]">
                {item}
              </p>
            ))}
          </div>
        </GlassCard>
      </MotionReveal>

      <MotionReveal delay={0.12}>
        <div className="mt-8 rounded-2xl border border-[#deebe2] bg-white/70 p-5">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#5a9478]">Sous-menus</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {ministryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
