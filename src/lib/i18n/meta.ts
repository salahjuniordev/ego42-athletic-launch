import { OG_LOCALE, type Lang } from "./config";

type Localized = { fr: string; en: string };

// ── Root <head> ────────────────────────────────────────────────────────────
// Owns the site-wide meta (charSet, viewport, author, og:site_name, og:locale,
// twitter:site) and the static <link>s. Leaf routes override title/description/
// og:* by key (TanStack merges matches last-wins), while og:locale persists.

const rootMeta: Record<Lang, { title: string; description: string; ogDescription: string }> = {
  fr: {
    title: "EGO 42 — Performance Humaine",
    description:
      "EGO 42 — coaching sportif, natation, préparation physique, mobilité et performance au Cameroun.",
    ogDescription: "Discipline. Performance. Potentiel humain.",
  },
  en: {
    title: "EGO 42 — Human Performance",
    description:
      "EGO 42 — sports coaching, swimming, physical preparation, mobility and performance in Cameroon.",
    ogDescription: "Discipline. Performance. Human potential.",
  },
};

export function buildRootHead(lang: Lang, appCssHref: string) {
  const m = rootMeta[lang];
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: m.title },
      { name: "description", content: m.description },
      { name: "author", content: "EGO 42" },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "EGO 42" },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCssHref },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap",
      },
    ],
  };
}

// ── Per-route <head> ─────────────────────────────────────────────────────────

export type RouteMetaEntry = {
  title: Localized;
  description: Localized;
  /** Distinct OG description; falls back to `description` when omitted. */
  ogDescription?: Localized;
};

export const routeMeta = {
  home: {
    title: {
      fr: "EGO 42 — Coaching & préparation physique",
      en: "EGO 42 — Coaching & physical preparation",
    },
    description: {
      fr: "EGO 42 : coaching sportif et préparation physique au Cameroun — natation, renforcement, mobilité et performance pour enfants, adolescents, adultes et athlètes.",
      en: "EGO 42: sports coaching and physical preparation in Cameroon — swimming, strength, mobility and performance for children, teens, adults and athletes.",
    },
    ogDescription: {
      fr: "Coaching sportif et préparation physique en piscine et à sec, pour tous les âges et tous les niveaux.",
      en: "Sports coaching and physical preparation, in the pool and on dry land, for all ages and levels.",
    },
  },
  about: {
    title: {
      fr: "À propos — La méthode EGO 42 | Coaching & performance humaine",
      en: "About — The EGO 42 method | Coaching & human performance",
    },
    description: {
      fr: "Qui est EGO 42 : une méthode de coaching sportif et de préparation physique au Cameroun, fondée sur la discipline, la technique et la performance humaine.",
      en: "Who EGO 42 is: a sports-coaching and physical-preparation method in Cameroon, built on discipline, technique and human performance.",
    },
  },
  programs: {
    title: {
      fr: "Programmes — Enfants, adolescents, adultes & athlètes | EGO 42",
      en: "Programs — Children, teens, adults & athletes | EGO 42",
    },
    description: {
      fr: "Les programmes EGO 42 au Cameroun : natation et préparation physique pour enfants (0-8 et 9-17 ans), adultes (18 ans et +) et athlètes, avec tarifs en FCFA.",
      en: "EGO 42 programs in Cameroon: swimming and physical preparation for children (ages 0–8 and 9–17), adults (18+) and athletes, with pricing in FCFA.",
    },
  },
  services: {
    title: {
      fr: "Services — Natation, fitness, mobilité & performance | EGO 42",
      en: "Services — Swimming, fitness, mobility & performance | EGO 42",
    },
    description: {
      fr: "Les services EGO 42 au Cameroun : natation, fitness, mobilité & bien-être, préparation physique orientée performance et coaching personnalisé.",
      en: "EGO 42 services in Cameroon: swimming, fitness, mobility & wellbeing, performance-oriented physical preparation and personalized coaching.",
    },
  },
} satisfies Record<string, RouteMetaEntry>;

export function buildRouteHead(
  entry: RouteMetaEntry,
  lang: Lang,
  opts: { url?: string; ogType?: string } = {},
) {
  const title = entry.title[lang];
  const description = entry.description[lang];
  const ogDescription = (entry.ogDescription ?? entry.description)[lang];

  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: ogDescription },
    { property: "og:type", content: opts.ogType ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(opts.url ? [{ property: "og:url", content: opts.url }] : []),
  ];

  return opts.url ? { meta, links: [{ rel: "canonical", href: opts.url }] } : { meta };
}

/** Localized <head> for a service detail page (og:type=article). */
export function buildServiceHead(seoTitle: string, seoDescription: string) {
  return {
    meta: [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: seoDescription },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
