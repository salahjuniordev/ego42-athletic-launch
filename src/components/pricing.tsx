const monthly = [
  { label: "Enfants", age: "0 à 8 ans", price: "45 000", unit: "FCFA / mois" },
  { label: "Enfants", age: "9 à 17 ans", price: "60 000", unit: "FCFA / mois" },
  { label: "Adultes", age: "18 ans et +", price: "80 000", unit: "FCFA / mois" },
];

const perSession = [
  { age: "0 à 8 ans", price: "5 000" },
  { age: "9 à 17 ans", price: "7 500" },
  { age: "18 ans et +", price: "9 500" },
];

export function Pricing() {
  return (
    <section id="tarifs" className="texture-dark border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="section-label">Tarifs</span>
        <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
          Abonnements <span className="text-primary">mensuels</span>
        </h2>

        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
          {monthly.map((m) => (
            <div key={m.age} className="bg-background p-7">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {m.label}
              </p>
              <p className="mt-1 font-display text-xl font-semibold uppercase tracking-tight text-foreground">
                {m.age}
              </p>
              <p className="mt-8 font-display text-5xl font-bold leading-none tracking-tight text-foreground">
                {m.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{m.unit}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              À la séance
            </h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {perSession.map((s) => (
                <li key={s.age} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-lg font-semibold uppercase tracking-tight text-foreground">
                    {s.age}
                  </span>
                  <span className="text-right">
                    <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {s.price}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">FCFA / séance</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-primary pl-6">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              Entretien de piscine à domicile
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tarif négociable selon la distance. Nous établissons une proposition après échange sur
              le lieu et la fréquence d'intervention.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:text-primary"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}