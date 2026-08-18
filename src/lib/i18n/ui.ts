// Single source of truth for all UI copy, namespaced by consumer (t.hero.lead,
// t.nav.about, …). `en` is typed as `typeof fr`, so English can never drift out
// of parity with French — a missing or misnamed key is a compile error.

const fr = {
  common: {
    discover: "Découvrir",
  },

  nav: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
    programs: "Programmes",
    pricing: "Tarifs",
    contact: "Contact",
  },

  header: {
    logoAlt: "EGO 42, logo en forme de coureur",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  languageToggle: {
    group: "Choisir la langue",
    toFrench: "Français",
    toEnglish: "Anglais",
  },

  hero: {
    lead: "Repoussez vos limites. Entraînez-vous plus dur, courez plus vite et atteignez vos objectifs avec EGO 42 — une préparation orientée performance pour les athlètes qui refusent de se contenter du minimum.",
    cta: "Découvrir les programmes",
    athleteAlt: "Athlète sprinteur dans une foulée de départ explosive",
    search: "Rechercher",
    slide: (n: number) => `Aller à la diapositive ${n}`,
  },

  brandStatement: {
    label: "À propos",
    titleTop: "Performance",
    titleAccent: "humaine",
    lead: "EGO 42 repose sur une seule idée : le corps est capable de plus lorsque l'entraînement a une intention.",
    body: "EGO 42 n'est pas une salle de sport. C'est une méthode de coaching et de préparation physique qui accompagne enfants, adolescents, adultes et sportifs vers plus de force, de mobilité, de confiance et de maîtrise de leur corps — en piscine comme à sec.",
    pillars: [
      { k: "01", t: "Discipline", d: "La régularité avant la motivation. Chaque séance a un objectif précis." },
      { k: "02", t: "Mouvement", d: "Une technique propre d'abord : nager, courir, soulever, respirer mieux." },
      { k: "03", t: "Force", d: "Développer une force utile, transférable au sport et au quotidien." },
      { k: "04", t: "Conditionnement", d: "Construire du volume cardio-respiratoire et de la résistance à l'effort." },
      { k: "05", t: "Récupération", d: "Mobilité, respiration et repos font partie intégrante de l'entraînement." },
      { k: "06", t: "Performance", d: "Progresser sur des repères mesurables, à son propre niveau." },
    ],
  },

  method: {
    label: "Méthode",
    titleTop: "Notre",
    titleAccent: "approche",
    intro: "Nous préférons présenter notre méthode plutôt que des promesses. Les retours de nos pratiquants et les résultats réels seront publiés ici au fur et à mesure.",
    steps: [
      { k: "01", t: "Évaluation", d: "Point de départ objectif : niveau technique, mobilité, condition physique et objectifs." },
      { k: "02", t: "Construction", d: "Un plan progressif défini avec la personne, selon sa disponibilité et son âge." },
      { k: "03", t: "Encadrement", d: "Chaque séance est dirigée : correction technique, intensité maîtrisée, exécution propre." },
      { k: "04", t: "Suivi", d: "Repères mesurés dans le temps et ajustements réguliers du programme." },
    ],
  },

  programs: {
    label: "Programmes",
    titleTop: "Adaptés au",
    titleAccent: "profil",
    intro: "Les programmes sont construits selon l'âge, le niveau de départ et l'objectif. Le contenu détaillé est défini lors de la première séance d'évaluation.",
    groups: [
      { label: "Kids", age: "0 – 8 ans", copy: "Découverte de l'eau, coordination et confiance corporelle dans un cadre encadré." },
      { label: "Teens", age: "9 – 17 ans", copy: "Technique, condition physique et discipline, adaptées à la croissance." },
      { label: "Adultes", age: "18 ans et +", copy: "Remise en forme, renforcement, mobilité et santé physique durable." },
      { label: "Athlètes", age: "Sur objectif", copy: "Préparation physique orientée compétition et performance sportive." },
    ],
  },

  services: {
    label: "Services",
    titleTop: "Ce que nous",
    titleAccent: "encadrons",
    intro: "Un encadrement structuré, en individuel ou en petit groupe, adapté au niveau et à l'objectif de chaque personne.",
    allServices: "Tous les services",
  },

  servicesPage: {
    label: "Services",
    titleTop: "Ce que nous",
    titleAccent: "encadrons",
    intro: "Cinq pôles d'encadrement, en individuel ou en petit groupe, adaptés au niveau et à l'objectif de chaque personne.",
  },

  pricing: {
    label: "Tarifs",
    titleTop: "Abonnements",
    titleAccent: "mensuels",
    monthly: [
      { label: "Enfants", age: "0 à 8 ans" },
      { label: "Enfants", age: "9 à 17 ans" },
      { label: "Adultes", age: "18 ans et +" },
    ],
    monthUnit: "FCFA / mois",
    perSessionTitle: "À la séance",
    perSession: ["0 à 8 ans", "9 à 17 ans", "18 ans et +"],
    sessionUnit: "FCFA / séance",
    poolTitle: "Entretien de piscine à domicile",
    poolBody: "Tarif négociable selon la distance. Nous établissons une proposition après échange sur le lieu et la fréquence d'intervention.",
    poolCta: "Demander un devis",
  },

  servicePricing: {
    label: "Tarifs",
    titleTop: "Tarifs",
    titleAccent: "de ce service",
    intro: (service: string) =>
      `Les tarifs ci-dessous s'appliquent aux séances de ${service}, en abonnement mensuel ou à la séance.`,
    monthlyTitle: "Abonnement mensuel",
    sessionTitle: "À la séance",
    note: "Formules individuelles ou en petit groupe. Déplacement à domicile possible selon la distance.",
    ctaAll: "Voir tous les tarifs",
    ctaInquiry: "Demander une séance",
  },

  contact: {
    label: "Contact",
    titleTop: "Prêt à bouger",
    titleAccent: "différemment ?",
    body: "Commencez votre parcours de performance avec EGO 42. Nous échangeons d'abord sur votre niveau et vos objectifs, puis nous planifions la première séance.",
    cta: "Commencer maintenant",
    items: [
      { dt: "Zone d'intervention", dd: "Cameroun" },
      { dt: "Prestations", dd: "Séances en bassin, en salle et à domicile selon la formule choisie." },
      { dt: "Coordonnées", dd: "Téléphone, e-mail et réseaux officiels d'EGO 42 à ajouter ici." },
    ],
  },

  footer: {
    logoAlt: "Logo EGO 42",
    copyright: (year: number) =>
      `© ${year} EGO 42 — Coaching sportif & préparation physique, Cameroun.`,
  },

  aboutPage: {
    label: "À propos",
    titleTop: "Discipline. Performance.",
    titleAccent: "Potentiel humain.",
    intro: "EGO 42 est une marque de coaching sportif et de préparation physique. Notre travail : apprendre à mieux bouger, développer une force utile et progresser durablement.",
    values: [
      { t: "Une méthode, pas une salle", d: "Chaque accompagnement commence par une évaluation et se construit autour d'un objectif clair, en piscine comme à sec." },
      { t: "Un encadrement humain", d: "Les séances sont dirigées : correction technique, dosage de l'intensité et progression maîtrisée, du débutant au sportif confirmé." },
      { t: "Ancré au Cameroun", d: "EGO 42 intervient localement, en individuel ou en petit groupe, pour les enfants, les adolescents, les adultes et les athlètes." },
    ],
    ctaPrograms: "Voir les programmes",
    ctaContact: "Nous contacter",
  },

  programsPage: {
    label: "Programmes",
    titleTop: "Un cadre par",
    titleAccent: "profil",
    intro: "Chaque programme est construit selon l'âge, le niveau de départ et l'objectif : eau, renforcement, mobilité ou performance. Le contenu est défini lors de la première séance d'évaluation.",
    domainsTop: "Domaines",
    domainsAccent: "encadrés",
    ctaEval: "Réserver une évaluation",
    ctaMethod: "La méthode",
  },

  serviceDetail: {
    backToServices: "Tous les services",
    servicePrefix: "Service",
    contentLabel: "Contenu",
    contentTop: "Ce que l'on",
    contentAccent: "travaille",
    audienceTitle: "Pour qui",
    formatTitle: "Format des séances",
    ctaPricing: "Voir les tarifs",
    ctaInquiry: "Demander une séance",
    relatedLabel: "Services liés",
    relatedTop: "À combiner",
    relatedAccent: "avec",
  },

  inquiry: {
    label: "Demande",
    titleTop: "Réserver une",
    titleAccent: "séance",
    intro: "Précisez votre niveau et votre objectif : nous vous proposons la formule adaptée et planifions la première séance.",
    sent: "Demande enregistrée",
    nameLabel: "Nom",
    namePlaceholder: "Votre nom",
    phoneLabel: "Téléphone",
    phonePlaceholder: "+237 ...",
    emailLabel: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    serviceLabel: "Service souhaité",
    messageLabel: "Message",
    messagePlaceholder: "Niveau actuel, objectif, disponibilités...",
    submit: "Envoyer la demande",
    toastTitle: "Demande envoyée",
    toastDescription: (name: string, service: string) =>
      `Merci ${name}, nous revenons vers vous rapidement au sujet de « ${service} ».`,
  },

  notFound: {
    title: "Page introuvable",
    body: "La page que vous cherchez n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
  },

  error: {
    title: "Cette page n'a pas pu se charger",
    body: "Un problème est survenu de notre côté. Vous pouvez réessayer ou revenir à l'accueil.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
  },
};

const en: typeof fr = {
  common: {
    discover: "Discover",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    programs: "Programs",
    pricing: "Pricing",
    contact: "Contact",
  },

  header: {
    logoAlt: "EGO 42 running figure logo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  languageToggle: {
    group: "Choose language",
    toFrench: "French",
    toEnglish: "English",
  },

  hero: {
    lead: "Push beyond your limits. Train harder, run faster, and conquer your goals with EGO 42 — performance programming for athletes who refuse to settle.",
    cta: "Explore programs",
    athleteAlt: "Sprinter athlete in explosive starting stride",
    search: "Search",
    slide: (n: number) => `Go to slide ${n}`,
  },

  brandStatement: {
    label: "About",
    titleTop: "Human",
    titleAccent: "performance",
    lead: "EGO 42 rests on a single idea: the body is capable of more when training has intent.",
    body: "EGO 42 is not a gym. It's a coaching and physical-preparation method that guides children, teens, adults and athletes toward more strength, mobility, confidence and control of their body — in the pool and on dry land.",
    pillars: [
      { k: "01", t: "Discipline", d: "Consistency before motivation. Every session has a precise goal." },
      { k: "02", t: "Movement", d: "Clean technique first: swim, run, lift and breathe better." },
      { k: "03", t: "Strength", d: "Building useful strength that transfers to sport and daily life." },
      { k: "04", t: "Conditioning", d: "Building cardio-respiratory volume and resistance to fatigue." },
      { k: "05", t: "Recovery", d: "Mobility, breathing and rest are an integral part of training." },
      { k: "06", t: "Performance", d: "Progressing against measurable markers, at your own level." },
    ],
  },

  method: {
    label: "Method",
    titleTop: "Our",
    titleAccent: "approach",
    intro: "We'd rather show our method than make promises. Feedback from the people we coach and real results will be published here as they come.",
    steps: [
      { k: "01", t: "Assessment", d: "An objective starting point: technical level, mobility, fitness and goals." },
      { k: "02", t: "Design", d: "A progressive plan built with each person, around their availability and age." },
      { k: "03", t: "Coaching", d: "Every session is led: technical correction, controlled intensity, clean execution." },
      { k: "04", t: "Follow-up", d: "Markers measured over time and regular adjustments to the program." },
    ],
  },

  programs: {
    label: "Programs",
    titleTop: "Matched to",
    titleAccent: "profile",
    intro: "Programs are built around age, starting level and goal. The detailed content is set during the first assessment session.",
    groups: [
      { label: "Kids", age: "Ages 0 – 8", copy: "Water discovery, coordination and body confidence in a supervised setting." },
      { label: "Teens", age: "Ages 9 – 17", copy: "Technique, fitness and discipline, adapted to growth." },
      { label: "Adults", age: "Ages 18+", copy: "Getting back in shape, strengthening, mobility and lasting physical health." },
      { label: "Athletes", age: "Goal-based", copy: "Physical preparation geared toward competition and athletic performance." },
    ],
  },

  services: {
    label: "Services",
    titleTop: "What we",
    titleAccent: "coach",
    intro: "Structured coaching, one-on-one or in small groups, matched to each person's level and goal.",
    allServices: "All services",
  },

  servicesPage: {
    label: "Services",
    titleTop: "What we",
    titleAccent: "coach",
    intro: "Five coaching areas, one-on-one or in small groups, matched to each person's level and goal.",
  },

  pricing: {
    label: "Pricing",
    titleTop: "Monthly",
    titleAccent: "memberships",
    monthly: [
      { label: "Children", age: "Ages 0 to 8" },
      { label: "Children", age: "Ages 9 to 17" },
      { label: "Adults", age: "Ages 18 and up" },
    ],
    monthUnit: "FCFA / month",
    perSessionTitle: "Per session",
    perSession: ["Ages 0 to 8", "Ages 9 to 17", "Ages 18 and up"],
    sessionUnit: "FCFA / session",
    poolTitle: "Home pool maintenance",
    poolBody: "Rate negotiable by distance. We put together a proposal after discussing the location and how often you need us.",
    poolCta: "Request a quote",
  },

  servicePricing: {
    label: "Pricing",
    titleTop: "Pricing for",
    titleAccent: "this service",
    intro: (service: string) =>
      `The rates below apply to ${service} sessions, as a monthly membership or per session.`,
    monthlyTitle: "Monthly membership",
    sessionTitle: "Per session",
    note: "One-on-one or small-group formats. At-home sessions available depending on distance.",
    ctaAll: "See all pricing",
    ctaInquiry: "Request a session",
  },

  contact: {
    label: "Contact",
    titleTop: "Ready to move",
    titleAccent: "differently?",
    body: "Start your performance journey with EGO 42. We talk through your level and goals first, then plan your first session.",
    cta: "Start now",
    items: [
      { dt: "Service area", dd: "Cameroon" },
      { dt: "What we offer", dd: "Pool, gym and at-home sessions depending on the plan you choose." },
      { dt: "Contact details", dd: "EGO 42's phone, email and official channels to be added here." },
    ],
  },

  footer: {
    logoAlt: "EGO 42 logo",
    copyright: (year: number) =>
      `© ${year} EGO 42 — Sports coaching & physical preparation, Cameroon.`,
  },

  aboutPage: {
    label: "About",
    titleTop: "Discipline. Performance.",
    titleAccent: "Human potential.",
    intro: "EGO 42 is a sports-coaching and physical-preparation brand. Our work: learning to move better, building useful strength and making lasting progress.",
    values: [
      { t: "A method, not a gym", d: "Every program starts with an assessment and is built around a clear goal, in the pool and on dry land." },
      { t: "Human coaching", d: "Sessions are led: technical correction, intensity dosing and controlled progression, from beginner to seasoned athlete." },
      { t: "Rooted in Cameroon", d: "EGO 42 works locally, one-on-one or in small groups, for children, teens, adults and athletes." },
    ],
    ctaPrograms: "See the programs",
    ctaContact: "Contact us",
  },

  programsPage: {
    label: "Programs",
    titleTop: "A framework per",
    titleAccent: "profile",
    intro: "Each program is built around age, starting level and goal: water, strengthening, mobility or performance. The content is set during the first assessment session.",
    domainsTop: "Coaching",
    domainsAccent: "areas",
    ctaEval: "Book an assessment",
    ctaMethod: "The method",
  },

  serviceDetail: {
    backToServices: "All services",
    servicePrefix: "Service",
    contentLabel: "Content",
    contentTop: "What we",
    contentAccent: "work on",
    audienceTitle: "Who it's for",
    formatTitle: "Session format",
    ctaPricing: "See pricing",
    ctaInquiry: "Request a session",
    relatedLabel: "Related services",
    relatedTop: "Combine",
    relatedAccent: "with",
  },

  inquiry: {
    label: "Request",
    titleTop: "Book a",
    titleAccent: "session",
    intro: "Tell us your level and goal: we'll suggest the right plan and schedule your first session.",
    sent: "Request recorded",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "+237 ...",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    serviceLabel: "Service of interest",
    messageLabel: "Message",
    messagePlaceholder: "Current level, goal, availability...",
    submit: "Send request",
    toastTitle: "Request sent",
    toastDescription: (name: string, service: string) =>
      `Thanks ${name}, we'll get back to you shortly about "${service}".`,
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    home: "Go home",
  },

  error: {
    title: "This page didn't load",
    body: "Something went wrong on our end. You can try refreshing or head back home.",
    retry: "Try again",
    home: "Go home",
  },
};

export const ui = { fr, en };

export type Dictionary = typeof fr;
