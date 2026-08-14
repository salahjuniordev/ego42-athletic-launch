const pillars = [
  { k: "01", t: "Discipline", d: "La régularité avant la motivation. Chaque séance a un objectif précis." },
  { k: "02", t: "Mouvement", d: "Une technique propre d'abord : nager, courir, soulever, respirer mieux." },
  { k: "03", t: "Force", d: "Développer une force utile, transférable au sport et au quotidien." },
  { k: "04", t: "Conditionnement", d: "Construire du volume cardio-respiratoire et de la résistance à l'effort." },
  { k: "05", t: "Récupération", d: "Mobilité, respiration et repos font partie intégrante de l'entraînement." },
  { k: "06", t: "Performance", d: "Progresser sur des repères mesurables, à son propre niveau." },
];

export function BrandStatement() {
  return (
    <section id="apropos" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="section-label">À propos</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Performance
              <span className="block text-primary">humaine</span>
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-display text-2xl font-medium uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              EGO 42 repose sur une seule idée : le corps est capable de plus lorsque
              l'entraînement a une intention.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              EGO 42 n'est pas une salle de sport. C'est une méthode de coaching et de préparation
              physique qui accompagne enfants, adolescents, adultes et sportifs vers plus de force,
              de mobilité, de confiance et de maîtrise de leur corps — en piscine comme à sec.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.k} className="group">
              <dt className="flex items-baseline gap-3 font-display text-xl font-semibold uppercase tracking-tight text-foreground">
                <span className="text-sm font-semibold text-primary">{p.k}</span>
                {p.t}
              </dt>
              <dd className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{p.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}