import fitness from "@/assets/svc-fitness.jpg";
import mobility from "@/assets/svc-mobility.jpg";
import performance from "@/assets/svc-performance.jpg";
import swimming from "@/assets/svc-swimming.jpg";
import type { Lang } from "@/lib/i18n/config";

/** A single localized string, authored FR + EN side by side. */
type L = { fr: string; en: string };

/**
 * Bilingual source of truth. `slug`, `n` and `img` are language-independent;
 * every copy field is an `L`. `localizeService` collapses this to the plain
 * `Service` shape below so consumers stay unchanged.
 */
export type ServiceRaw = {
  slug: string;
  n: string;
  img: string;
  title: L;
  tagline: L;
  alt: L;
  intro: L;
  cardCopy: L;
  highlights: { title: L; copy: L }[];
  audience: L[];
  format: L[];
  seoTitle: L;
  seoDescription: L;
};

/** Resolved, single-language service — the shape every component consumes. */
export type Service = {
  slug: string;
  n: string;
  title: string;
  tagline: string;
  img: string;
  alt: string;
  intro: string;
  cardCopy: string;
  highlights: { title: string; copy: string }[];
  audience: string[];
  format: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: ServiceRaw[] = [
  {
    slug: "natation",
    n: "01",
    img: swimming,
    title: { fr: "Natation", en: "Swimming" },
    tagline: {
      fr: "Technique, aisance et endurance en bassin",
      en: "Technique, ease and endurance in the pool",
    },
    alt: {
      fr: "Nageur en pleine action dans un bassin en faible lumière",
      en: "Swimmer mid-stroke in a dimly lit pool",
    },
    cardCopy: {
      fr: "Apprentissage, perfectionnement technique et préparation en bassin, pour tous les niveaux et tous les objectifs.",
      en: "Learning, technical refinement and pool-based preparation, for every level and every goal.",
    },
    intro: {
      fr: "De la première mise à l'eau au perfectionnement des quatre nages, l'encadrement natation d'EGO 42 construit une relation saine et efficace avec l'eau : respiration, position du corps, propulsion et endurance.",
      en: "From the first time in the water to refining all four strokes, EGO 42's swimming coaching builds a healthy, efficient relationship with the water: breathing, body position, propulsion and endurance.",
    },
    highlights: [
      {
        title: { fr: "Apprentissage", en: "Learning" },
        copy: {
          fr: "Familiarisation, flottaison, respiration et premiers déplacements autonomes en sécurité.",
          en: "Getting comfortable, floating, breathing and first independent movements, safely.",
        },
      },
      {
        title: { fr: "Perfectionnement", en: "Refinement" },
        copy: {
          fr: "Correction technique nage par nage, virages, départs et efficacité du geste.",
          en: "Stroke-by-stroke technical correction, turns, starts and efficiency of movement.",
        },
      },
      {
        title: { fr: "Endurance en bassin", en: "Pool endurance" },
        copy: {
          fr: "Séries progressives, gestion du rythme et capacité à tenir l'effort dans la durée.",
          en: "Progressive sets, pacing and the capacity to sustain effort over time.",
        },
      },
    ],
    audience: [
      { fr: "Enfants dès 4 ans", en: "Children from age 4" },
      { fr: "Adolescents", en: "Teens" },
      { fr: "Adultes débutants ou confirmés", en: "Beginner or seasoned adults" },
      { fr: "Nageurs sur objectif", en: "Goal-driven swimmers" },
    ],
    format: [
      { fr: "Séances individuelles", en: "One-on-one sessions" },
      { fr: "Petits groupes", en: "Small groups" },
      { fr: "Bassin encadré", en: "Supervised pool" },
      { fr: "Évaluation initiale du niveau", en: "Initial level assessment" },
    ],
    seoTitle: {
      fr: "Cours de natation — EGO 42, Cameroun",
      en: "Swimming lessons — EGO 42, Cameroon",
    },
    seoDescription: {
      fr: "Cours de natation encadrés au Cameroun avec EGO 42 : apprentissage, perfectionnement technique et endurance en bassin pour enfants, adolescents et adultes.",
      en: "Supervised swimming lessons in Cameroon with EGO 42: learning, technical refinement and pool endurance for children, teens and adults.",
    },
  },
  {
    slug: "fitness",
    n: "02",
    img: fitness,
    title: { fr: "Fitness", en: "Fitness" },
    tagline: {
      fr: "Renforcement et conditionnement progressif",
      en: "Progressive strengthening and conditioning",
    },
    alt: {
      fr: "Athlète en position de soulevé de terre dans une salle sombre",
      en: "Athlete in a deadlift position in a dark gym",
    },
    cardCopy: {
      fr: "Renforcement, conditionnement et développement physique progressif, encadrés séance après séance.",
      en: "Strengthening, conditioning and progressive physical development, coached session after session.",
    },
    intro: {
      fr: "Le fitness chez EGO 42 n'est pas une suite d'exercices aléatoires : c'est une progression construite autour de la force, du contrôle et de la régularité, adaptée au niveau de départ de chaque personne.",
      en: "Fitness at EGO 42 is not a string of random exercises: it's a progression built around strength, control and consistency, adapted to each person's starting level.",
    },
    highlights: [
      {
        title: { fr: "Renforcement", en: "Strengthening" },
        copy: {
          fr: "Travail de force sur les grands schémas moteurs, avec charge adaptée et technique surveillée.",
          en: "Strength work on the major movement patterns, with adapted load and monitored technique.",
        },
      },
      {
        title: { fr: "Conditionnement", en: "Conditioning" },
        copy: {
          fr: "Capacité cardio-musculaire, tolérance à l'effort et récupération entre les séries.",
          en: "Cardio-muscular capacity, tolerance to effort and recovery between sets.",
        },
      },
      {
        title: { fr: "Composition corporelle", en: "Body composition" },
        copy: {
          fr: "Remise en forme durable, tonification et habitudes d'entraînement tenables.",
          en: "Lasting fitness, toning and sustainable training habits.",
        },
      },
    ],
    audience: [
      { fr: "Adultes en remise en forme", en: "Adults getting back in shape" },
      { fr: "Adolescents encadrés", en: "Supervised teens" },
      { fr: "Sportifs en complément", en: "Athletes as a complement" },
      { fr: "Reprise après pause", en: "Returning after a break" },
    ],
    format: [
      { fr: "Séances individuelles", en: "One-on-one sessions" },
      { fr: "Petits groupes", en: "Small groups" },
      { fr: "En salle", en: "In the gym" },
      { fr: "À domicile selon formule", en: "At home depending on the plan" },
    ],
    seoTitle: {
      fr: "Coaching fitness & renforcement — EGO 42",
      en: "Fitness & strength coaching — EGO 42",
    },
    seoDescription: {
      fr: "Coaching fitness au Cameroun avec EGO 42 : renforcement musculaire, conditionnement physique et remise en forme progressive encadrés séance après séance.",
      en: "Fitness coaching in Cameroon with EGO 42: muscular strengthening, physical conditioning and progressive return to fitness, coached session after session.",
    },
  },
  {
    slug: "mobilite-bien-etre",
    n: "03",
    img: mobility,
    title: { fr: "Mobilité & bien-être", en: "Mobility & well-being" },
    tagline: {
      fr: "Qualité de mouvement et équilibre postural",
      en: "Movement quality and postural balance",
    },
    alt: {
      fr: "Athlète réalisant un étirement de mobilité au sol",
      en: "Athlete performing a floor mobility stretch",
    },
    cardCopy: {
      fr: "Qualité de mouvement, amplitude articulaire, respiration et équilibre postural.",
      en: "Movement quality, joint range of motion, breathing and postural balance.",
    },
    intro: {
      fr: "La mobilité conditionne tout le reste : amplitude articulaire, stabilité, respiration et posture. Ce travail réduit les tensions du quotidien et prépare le corps à encaisser l'entraînement.",
      en: "Mobility underpins everything else: joint range of motion, stability, breathing and posture. This work reduces everyday tension and prepares the body to absorb training.",
    },
    highlights: [
      {
        title: { fr: "Amplitude articulaire", en: "Range of motion" },
        copy: {
          fr: "Hanches, épaules, chevilles et colonne : retrouver de la marge de mouvement utile.",
          en: "Hips, shoulders, ankles and spine: regaining useful room to move.",
        },
      },
      {
        title: { fr: "Respiration & posture", en: "Breathing & posture" },
        copy: {
          fr: "Mécanique respiratoire, gainage profond et alignement au quotidien.",
          en: "Breathing mechanics, deep core bracing and everyday alignment.",
        },
      },
      {
        title: { fr: "Bien-être durable", en: "Lasting well-being" },
        copy: {
          fr: "Diminution des tensions, meilleure récupération et confort de mouvement.",
          en: "Less tension, better recovery and comfortable movement.",
        },
      },
    ],
    audience: [
      { fr: "Adultes sédentaires", en: "Sedentary adults" },
      { fr: "Travail assis prolongé", en: "Prolonged desk work" },
      { fr: "Sportifs en prévention", en: "Athletes in prevention" },
      { fr: "Seniors actifs", en: "Active seniors" },
    ],
    format: [
      { fr: "Séances individuelles", en: "One-on-one sessions" },
      { fr: "Petits groupes", en: "Small groups" },
      { fr: "En salle ou à domicile", en: "In the gym or at home" },
      { fr: "Routines à emporter", en: "Take-home routines" },
    ],
    seoTitle: {
      fr: "Mobilité & bien-être — EGO 42",
      en: "Mobility & well-being — EGO 42",
    },
    seoDescription: {
      fr: "Séances de mobilité et bien-être avec EGO 42 au Cameroun : amplitude articulaire, respiration, posture et confort de mouvement au quotidien.",
      en: "Mobility and well-being sessions with EGO 42 in Cameroon: joint range of motion, breathing, posture and comfortable everyday movement.",
    },
  },
  {
    slug: "performance",
    n: "04",
    img: performance,
    title: { fr: "Performance", en: "Performance" },
    tagline: {
      fr: "Vitesse, puissance et capacité à répéter l'effort",
      en: "Speed, power and the capacity to repeat effort",
    },
    alt: {
      fr: "Sprinter s'élançant des blocs de départ sur une piste",
      en: "Sprinter launching from the starting blocks on a track",
    },
    cardCopy: {
      fr: "Préparation physique orientée performance : vitesse, puissance, endurance et capacité à répéter l'effort.",
      en: "Performance-oriented physical preparation: speed, power, endurance and the capacity to repeat effort.",
    },
    intro: {
      fr: "La préparation physique orientée performance s'adresse à celles et ceux qui ont un objectif sportif clair. Le contenu est construit autour des qualités déterminantes de la discipline pratiquée.",
      en: "Performance-oriented physical preparation is for those with a clear athletic goal. The content is built around the decisive qualities of the sport being practised.",
    },
    highlights: [
      {
        title: { fr: "Vitesse & puissance", en: "Speed & power" },
        copy: {
          fr: "Accélération, explosivité et transfert de force vers le geste sportif.",
          en: "Acceleration, explosiveness and transfer of strength into the athletic movement.",
        },
      },
      {
        title: { fr: "Endurance spécifique", en: "Specific endurance" },
        copy: {
          fr: "Capacité à répéter l'effort intense et à maintenir la qualité technique sous fatigue.",
          en: "The capacity to repeat intense effort and hold technical quality under fatigue.",
        },
      },
      {
        title: { fr: "Prévention", en: "Prevention" },
        copy: {
          fr: "Renforcement ciblé et gestion de la charge pour rester disponible sur la durée.",
          en: "Targeted strengthening and load management to stay available over the long run.",
        },
      },
    ],
    audience: [
      { fr: "Athlètes en compétition", en: "Competing athletes" },
      { fr: "Sportifs de club", en: "Club athletes" },
      { fr: "Objectif de sélection", en: "Selection goal" },
      { fr: "Retour à la compétition", en: "Return to competition" },
    ],
    format: [
      { fr: "Bloc de préparation", en: "Preparation block" },
      { fr: "Suivi sur objectif", en: "Goal-based follow-up" },
      { fr: "Piste, salle et bassin", en: "Track, gym and pool" },
      { fr: "Évaluation périodique", en: "Periodic assessment" },
    ],
    seoTitle: {
      fr: "Préparation physique & performance — EGO 42",
      en: "Physical preparation & performance — EGO 42",
    },
    seoDescription: {
      fr: "Préparation physique orientée performance avec EGO 42 : vitesse, puissance, endurance spécifique et prévention pour athlètes et sportifs de club au Cameroun.",
      en: "Performance-oriented physical preparation with EGO 42: speed, power, specific endurance and prevention for athletes and club players in Cameroon.",
    },
  },
  {
    slug: "coaching-personnalise",
    n: "05",
    img: fitness,
    title: { fr: "Coaching personnalisé", en: "Personalized coaching" },
    tagline: {
      fr: "Un accompagnement construit autour de vous",
      en: "Support built around you",
    },
    alt: {
      fr: "Athlète encadré pendant une séance de renforcement",
      en: "Athlete being coached during a strength session",
    },
    cardCopy: {
      fr: "Un accompagnement individuel construit autour des objectifs, du niveau et des contraintes de la personne.",
      en: "One-on-one support built around each person's goals, level and constraints.",
    },
    intro: {
      fr: "Le coaching personnalisé réunit les autres pôles dans un seul plan : évaluation de départ, objectifs clairs, séances encadrées et ajustements réguliers selon la progression et les contraintes réelles.",
      en: "Personalized coaching brings the other areas together into a single plan: a starting assessment, clear goals, coached sessions and regular adjustments based on real progress and constraints.",
    },
    highlights: [
      {
        title: { fr: "Évaluation initiale", en: "Initial assessment" },
        copy: {
          fr: "Point de départ, antécédents, disponibilité et objectifs précisés ensemble.",
          en: "Starting point, history, availability and goals defined together.",
        },
      },
      {
        title: { fr: "Plan individuel", en: "Individual plan" },
        copy: {
          fr: "Programmation dosée sur la semaine, combinant bassin, salle et mobilité.",
          en: "A weekly plan dosed just right, combining pool, gym and mobility.",
        },
      },
      {
        title: { fr: "Suivi & ajustement", en: "Follow-up & adjustment" },
        copy: {
          fr: "Retours après séance, mesure de la progression et adaptation du contenu.",
          en: "Post-session feedback, progress measurement and content adaptation.",
        },
      },
    ],
    audience: [
      { fr: "Objectif personnel précis", en: "A specific personal goal" },
      { fr: "Emploi du temps chargé", en: "A busy schedule" },
      { fr: "Reprise encadrée", en: "Supervised return to training" },
      { fr: "Athlètes sur projet", en: "Athletes on a project" },
    ],
    format: [
      { fr: "100 % individuel", en: "100% one-on-one" },
      { fr: "Séances planifiées", en: "Scheduled sessions" },
      { fr: "Bassin, salle ou domicile", en: "Pool, gym or home" },
      { fr: "Suivi continu", en: "Continuous follow-up" },
    ],
    seoTitle: {
      fr: "Coaching sportif personnalisé — EGO 42",
      en: "Personalized sports coaching — EGO 42",
    },
    seoDescription: {
      fr: "Coaching sportif personnalisé avec EGO 42 au Cameroun : évaluation initiale, plan individuel et suivi régulier pour atteindre un objectif précis.",
      en: "Personalized sports coaching with EGO 42 in Cameroon: initial assessment, individual plan and regular follow-up to reach a specific goal.",
    },
  },
];

/** Collapse a bilingual `ServiceRaw` to the plain-string `Service` for `lang`. */
export function localizeService(s: ServiceRaw, lang: Lang): Service {
  return {
    slug: s.slug,
    n: s.n,
    img: s.img,
    title: s.title[lang],
    tagline: s.tagline[lang],
    alt: s.alt[lang],
    intro: s.intro[lang],
    cardCopy: s.cardCopy[lang],
    highlights: s.highlights.map((h) => ({ title: h.title[lang], copy: h.copy[lang] })),
    audience: s.audience.map((a) => a[lang]),
    format: s.format.map((f) => f[lang]),
    seoTitle: s.seoTitle[lang],
    seoDescription: s.seoDescription[lang],
  };
}

/** Raw (bilingual) service by slug — for loaders that stay language-independent. */
export function getServiceRaw(slug: string): ServiceRaw | undefined {
  return services.find((s) => s.slug === slug);
}

export function getService(slug: string, lang: Lang): Service | undefined {
  const raw = getServiceRaw(slug);
  return raw ? localizeService(raw, lang) : undefined;
}

export function getServices(lang: Lang): Service[] {
  return services.map((s) => localizeService(s, lang));
}

/** Two most relevant sibling services per service. */
export const relatedSlugs: Record<string, string[]> = {
  natation: ["performance", "coaching-personnalise"],
  fitness: ["mobilite-bien-etre", "performance"],
  "mobilite-bien-etre": ["fitness", "coaching-personnalise"],
  performance: ["fitness", "natation"],
  "coaching-personnalise": ["fitness", "natation"],
};

export function getRelatedServices(slug: string, lang: Lang): Service[] {
  return (relatedSlugs[slug] ?? [])
    .map((s) => getService(s, lang))
    .filter((s): s is Service => Boolean(s));
}
