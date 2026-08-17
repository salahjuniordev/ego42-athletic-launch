import fitness from "@/assets/svc-fitness.jpg";
import mobility from "@/assets/svc-mobility.jpg";
import performance from "@/assets/svc-performance.jpg";
import swimming from "@/assets/svc-swimming.jpg";

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

export const services: Service[] = [
  {
    slug: "natation",
    n: "01",
    title: "Natation",
    tagline: "Technique, aisance et endurance en bassin",
    img: swimming,
    alt: "Nageur en pleine action dans un bassin en faible lumière",
    cardCopy:
      "Apprentissage, perfectionnement technique et préparation en bassin, pour tous les niveaux et tous les objectifs.",
    intro:
      "De la première mise à l'eau au perfectionnement des quatre nages, l'encadrement natation d'EGO 42 construit une relation saine et efficace avec l'eau : respiration, position du corps, propulsion et endurance.",
    highlights: [
      {
        title: "Apprentissage",
        copy: "Familiarisation, flottaison, respiration et premiers déplacements autonomes en sécurité.",
      },
      {
        title: "Perfectionnement",
        copy: "Correction technique nage par nage, virages, départs et efficacité du geste.",
      },
      {
        title: "Endurance en bassin",
        copy: "Séries progressives, gestion du rythme et capacité à tenir l'effort dans la durée.",
      },
    ],
    audience: ["Enfants dès 4 ans", "Adolescents", "Adultes débutants ou confirmés", "Nageurs sur objectif"],
    format: ["Séances individuelles", "Petits groupes", "Bassin encadré", "Évaluation initiale du niveau"],
    seoTitle: "Cours de natation — EGO 42, Cameroun",
    seoDescription:
      "Cours de natation encadrés au Cameroun avec EGO 42 : apprentissage, perfectionnement technique et endurance en bassin pour enfants, adolescents et adultes.",
  },
  {
    slug: "fitness",
    n: "02",
    title: "Fitness",
    tagline: "Renforcement et conditionnement progressif",
    img: fitness,
    alt: "Athlète en position de soulevé de terre dans une salle sombre",
    cardCopy:
      "Renforcement, conditionnement et développement physique progressif, encadrés séance après séance.",
    intro:
      "Le fitness chez EGO 42 n'est pas une suite d'exercices aléatoires : c'est une progression construite autour de la force, du contrôle et de la régularité, adaptée au niveau de départ de chaque personne.",
    highlights: [
      {
        title: "Renforcement",
        copy: "Travail de force sur les grands schémas moteurs, avec charge adaptée et technique surveillée.",
      },
      {
        title: "Conditionnement",
        copy: "Capacité cardio-musculaire, tolérance à l'effort et récupération entre les séries.",
      },
      {
        title: "Composition corporelle",
        copy: "Remise en forme durable, tonification et habitudes d'entraînement tenables.",
      },
    ],
    audience: ["Adultes en remise en forme", "Adolescents encadrés", "Sportifs en complément", "Reprise après pause"],
    format: ["Séances individuelles", "Petits groupes", "En salle", "À domicile selon formule"],
    seoTitle: "Coaching fitness & renforcement — EGO 42",
    seoDescription:
      "Coaching fitness au Cameroun avec EGO 42 : renforcement musculaire, conditionnement physique et remise en forme progressive encadrés séance après séance.",
  },
  {
    slug: "mobilite-bien-etre",
    n: "03",
    title: "Mobilité & bien-être",
    tagline: "Qualité de mouvement et équilibre postural",
    img: mobility,
    alt: "Athlète réalisant un étirement de mobilité au sol",
    cardCopy:
      "Qualité de mouvement, amplitude articulaire, respiration et équilibre postural.",
    intro:
      "La mobilité conditionne tout le reste : amplitude articulaire, stabilité, respiration et posture. Ce travail réduit les tensions du quotidien et prépare le corps à encaisser l'entraînement.",
    highlights: [
      {
        title: "Amplitude articulaire",
        copy: "Hanches, épaules, chevilles et colonne : retrouver de la marge de mouvement utile.",
      },
      {
        title: "Respiration & posture",
        copy: "Mécanique respiratoire, gainage profond et alignement au quotidien.",
      },
      {
        title: "Bien-être durable",
        copy: "Diminution des tensions, meilleure récupération et confort de mouvement.",
      },
    ],
    audience: ["Adultes sédentaires", "Travail assis prolongé", "Sportifs en prévention", "Seniors actifs"],
    format: ["Séances individuelles", "Petits groupes", "En salle ou à domicile", "Routines à emporter"],
    seoTitle: "Mobilité & bien-être — EGO 42",
    seoDescription:
      "Séances de mobilité et bien-être avec EGO 42 au Cameroun : amplitude articulaire, respiration, posture et confort de mouvement au quotidien.",
  },
  {
    slug: "performance",
    n: "04",
    title: "Performance",
    tagline: "Vitesse, puissance et capacité à répéter l'effort",
    img: performance,
    alt: "Sprinter s'élançant des blocs de départ sur une piste",
    cardCopy:
      "Préparation physique orientée performance : vitesse, puissance, endurance et capacité à répéter l'effort.",
    intro:
      "La préparation physique orientée performance s'adresse à celles et ceux qui ont un objectif sportif clair. Le contenu est construit autour des qualités déterminantes de la discipline pratiquée.",
    highlights: [
      {
        title: "Vitesse & puissance",
        copy: "Accélération, explosivité et transfert de force vers le geste sportif.",
      },
      {
        title: "Endurance spécifique",
        copy: "Capacité à répéter l'effort intense et à maintenir la qualité technique sous fatigue.",
      },
      {
        title: "Prévention",
        copy: "Renforcement ciblé et gestion de la charge pour rester disponible sur la durée.",
      },
    ],
    audience: ["Athlètes en compétition", "Sportifs de club", "Objectif de sélection", "Retour à la compétition"],
    format: ["Bloc de préparation", "Suivi sur objectif", "Piste, salle et bassin", "Évaluation périodique"],
    seoTitle: "Préparation physique & performance — EGO 42",
    seoDescription:
      "Préparation physique orientée performance avec EGO 42 : vitesse, puissance, endurance spécifique et prévention pour athlètes et sportifs de club au Cameroun.",
  },
  {
    slug: "coaching-personnalise",
    n: "05",
    title: "Coaching personnalisé",
    tagline: "Un accompagnement construit autour de vous",
    img: fitness,
    alt: "Athlète encadré pendant une séance de renforcement",
    cardCopy:
      "Un accompagnement individuel construit autour des objectifs, du niveau et des contraintes de la personne.",
    intro:
      "Le coaching personnalisé réunit les autres pôles dans un seul plan : évaluation de départ, objectifs clairs, séances encadrées et ajustements réguliers selon la progression et les contraintes réelles.",
    highlights: [
      {
        title: "Évaluation initiale",
        copy: "Point de départ, antécédents, disponibilité et objectifs précisés ensemble.",
      },
      {
        title: "Plan individuel",
        copy: "Programmation dosée sur la semaine, combinant bassin, salle et mobilité.",
      },
      {
        title: "Suivi & ajustement",
        copy: "Retours après séance, mesure de la progression et adaptation du contenu.",
      },
    ],
    audience: ["Objectif personnel précis", "Emploi du temps chargé", "Reprise encadrée", "Athlètes sur projet"],
    format: ["100 % individuel", "Séances planifiées", "Bassin, salle ou domicile", "Suivi continu"],
    seoTitle: "Coaching sportif personnalisé — EGO 42",
    seoDescription:
      "Coaching sportif personnalisé avec EGO 42 au Cameroun : évaluation initiale, plan individuel et suivi régulier pour atteindre un objectif précis.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Two most relevant sibling services per service. */
export const relatedSlugs: Record<string, string[]> = {
  natation: ["performance", "coaching-personnalise"],
  fitness: ["mobilite-bien-etre", "performance"],
  "mobilite-bien-etre": ["fitness", "coaching-personnalise"],
  performance: ["fitness", "natation"],
  "coaching-personnalise": ["fitness", "natation"],
};

export function getRelatedServices(slug: string): Service[] {
  return (relatedSlugs[slug] ?? [])
    .map((s) => getService(s))
    .filter((s): s is Service => Boolean(s));
}