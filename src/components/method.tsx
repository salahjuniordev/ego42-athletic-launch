const steps = [
  {
    k: "01",
    t: "Évaluation",
    d: "Point de départ objectif : niveau technique, mobilité, condition physique et objectifs.",
  },
  {
    k: "02",
    t: "Construction",
    d: "Un plan progressif défini avec la personne, selon sa disponibilité et son âge.",
  },
  {
    k: "03",
    t: "Encadrement",
    d: "Chaque séance est dirigée : correction technique, intensité maîtrisée, exécution propre.",
  },
  {
    k: "04",
    t: "Suivi",
    d: "Repères mesurés dans le temps et ajustements réguliers du programme.",
  },
];

export function Method() {
  return (
    <section id="methode" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <span className="section-label">Méthode</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Notre <span className="text-primary">approche</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Nous préférons présenter notre méthode plutôt que des promesses. Les retours de nos
              pratiquants et les résultats réels seront publiés ici au fur et à mesure.
            </p>
          </div>

          <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.k} className="bg-background p-7">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                  {s.k}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}