const groups = [
  {
    label: "Kids",
    age: "0 – 8 ans",
    copy: "Découverte de l'eau, coordination et confiance corporelle dans un cadre encadré.",
  },
  {
    label: "Teens",
    age: "9 – 17 ans",
    copy: "Technique, condition physique et discipline, adaptées à la croissance.",
  },
  {
    label: "Adultes",
    age: "18 ans et +",
    copy: "Remise en forme, renforcement, mobilité et santé physique durable.",
  },
  {
    label: "Athlètes",
    age: "Sur objectif",
    copy: "Préparation physique orientée compétition et performance sportive.",
  },
];

export function Programs() {
  return (
    <section id="programmes" className="border-t border-border py-20 sm:py-28">
      <span id="programs" aria-hidden className="sr-only" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="section-label">Programmes</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Adaptés au <span className="text-primary">profil</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Les programmes sont construits selon l'âge, le niveau de départ et l'objectif. Le contenu
            détaillé est défini lors de la première séance d'évaluation.
          </p>
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {groups.map((g) => (
            <li
              key={g.label}
              className="grid gap-2 py-7 transition-colors duration-300 hover:bg-card/50 sm:grid-cols-[minmax(0,10rem)_minmax(0,9rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8 sm:px-2"
            >
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                {g.label}
              </h3>
              <p className="font-display text-base font-semibold uppercase tracking-[0.14em] text-primary">
                {g.age}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{g.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}