import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

type NigerSlug =
  | "visa-entree"
  | "hebergements"
  | "transport-mobilite"
  | "sante-securite"
  | "faq-voyageurs";

type SectionContent = {
  title: string;
  intro: string;
  cards: Array<{ title: string; text: string }>;
  checklist: string[];
};

const nigerSlugs: NigerSlug[] = [
  "visa-entree",
  "hebergements",
  "transport-mobilite",
  "sante-securite",
  "faq-voyageurs",
];

const nigerContent: Record<NigerSlug, SectionContent> = {
  "visa-entree": {
    title: "Visa & entree au Niger",
    intro:
      "Informations pratiques pour preparer votre entree sur le territoire: documents de voyage, formalites et recommandations avant depart.",
    cards: [
      {
        title: "Documents",
        text: "Verifier la validite du passeport, les exigences de visa selon la nationalite et les pieces justificatives demandees.",
      },
      {
        title: "Preparation",
        text: "Anticiper les delais administratifs et conserver des copies numeriques de vos documents importants.",
      },
      {
        title: "A l'arrivee",
        text: "Respecter les procedures de controle aux points d'entree et suivre les indications des services competents.",
      },
    ],
    checklist: [
      "Passeport valide et documents de voyage complets.",
      "Coordonnees locales utiles (hebergement, contact d'urgence).",
      "Itineraire de sejour et informations de transport confirmees.",
    ],
  },
  hebergements: {
    title: "Hebergements",
    intro:
      "Panorama des options d'accueil disponibles selon les zones: hotels, maisons d'hotes et structures adaptees aux sejours professionnels ou touristiques.",
    cards: [
      {
        title: "Typologies",
        text: "Offres urbaines, hebergements de proximite et solutions adaptees aux circuits de decouverte.",
      },
      {
        title: "Qualite",
        text: "Encourager les etablissements a renforcer les standards de service, d'hygiene et d'information client.",
      },
      {
        title: "Reservation",
        text: "Confirmer les services inclus, les conditions d'annulation et la disponibilite avant le deplacement.",
      },
    ],
    checklist: [
      "Verifier l'emplacement par rapport a votre programme.",
      "Demander une confirmation ecrite de reservation.",
      "S'assurer de la disponibilite des services essentiels (eau, connexion, securite).",
    ],
  },
  "transport-mobilite": {
    title: "Transport & mobilite",
    intro:
      "Conseils pour organiser les deplacements interurbains et locaux en tenant compte des distances, de la saison et des contraintes logistiques.",
    cards: [
      {
        title: "Mobilite interne",
        text: "Planifier les trajets avec des operateurs reconnus et adapter les horaires aux conditions locales.",
      },
      {
        title: "Liaisons",
        text: "Combiner transport aerien et routier selon les destinations retenues et la duree de sejour.",
      },
      {
        title: "Bonnes pratiques",
        text: "Conserver une marge de securite sur les temps de trajet et privilegier des solutions accompagnees pour certains axes.",
      },
    ],
    checklist: [
      "Itineraire journalier partage avec votre point de contact.",
      "Pieces d'identite et contacts utiles accessibles pendant le trajet.",
      "Verification des conditions de route avant chaque depart.",
    ],
  },
  "sante-securite": {
    title: "Sante & securite",
    intro:
      "Recommandations generales pour voyager de maniere responsable: prevention sanitaire, conduite a tenir et vigilance pendant le sejour.",
    cards: [
      {
        title: "Sante",
        text: "Preparer une trousse de base, suivre les conseils medicaux de voyage et disposer d'une assurance adaptee.",
      },
      {
        title: "Securite",
        text: "Respecter les consignes des autorites locales et privilegier des deplacements planifies avec des interlocuteurs identifies.",
      },
      {
        title: "Assistance",
        text: "Tenir a jour une liste de contacts d'urgence et les coordonnees des structures de reference.",
      },
    ],
    checklist: [
      "Contacts d'urgence enregistres (sante, securite, ambassade).",
      "Informations de sejour communiquees a un proche.",
      "Suivi des recommandations officielles pendant tout le voyage.",
    ],
  },
  "faq-voyageurs": {
    title: "FAQ voyageurs",
    intro:
      "Reponses aux questions les plus frequentes pour mieux preparer votre sejour: formalites, organisation, services et contacts utiles.",
    cards: [
      {
        title: "Avant le depart",
        text: "Quels documents faut-il preparer et a quel moment lancer les demarches administratives ?",
      },
      {
        title: "Pendant le sejour",
        text: "Comment organiser ses deplacements et a qui s'adresser pour un appui d'information touristique ?",
      },
      {
        title: "Contacts utiles",
        text: "Ou trouver les informations institutionnelles et comment joindre les services competents ?",
      },
    ],
    checklist: [
      "Conserver les references utiles (emails, telephones, adresses).",
      "Verifier les horaires des services avant de vous deplacer.",
      "Utiliser les canaux institutionnels pour toute demande officielle.",
    ],
  },
};

function isNigerSlug(value: string): value is NigerSlug {
  return nigerSlugs.includes(value as NigerSlug);
}

export default async function NigerSubmenuPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeValue, slug } = await params;

  if (!isLocale(localeValue) || !isNigerSlug(slug)) {
    notFound();
  }

  const locale: Locale = localeValue;
  const dictionary = getDictionary(locale);
  const content = nigerContent[slug];

  const nigerLinks = [
    { href: `/${locale}/niger/visa-entree`, label: dictionary.nav.nigerVisa },
    { href: `/${locale}/niger/hebergements`, label: dictionary.nav.nigerHotels },
    { href: `/${locale}/niger/transport-mobilite`, label: dictionary.nav.nigerTransport },
    { href: `/${locale}/niger/sante-securite`, label: dictionary.nav.nigerHealth },
    { href: `/${locale}/niger/faq-voyageurs`, label: dictionary.nav.nigerFaq },
  ];

  return (
    <section className="page-wrap py-12">
      <MotionReveal>
        <span className="kicker">{dictionary.nav.niger}</span>
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
          <h2 className="text-2xl text-[#123b28]">Checklist pratique</h2>
          <div className="mt-4 grid gap-3">
            {content.checklist.map((item) => (
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
            {nigerLinks.map((link) => (
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
