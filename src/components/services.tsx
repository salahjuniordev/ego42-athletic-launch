import fitness from "@/assets/svc-fitness.jpg";
import mobility from "@/assets/svc-mobility.jpg";
import performance from "@/assets/svc-performance.jpg";
import swimming from "@/assets/svc-swimming.jpg";

const services = [
  {
    n: "01",
    title: "Natation",
    copy: "Apprentissage, perfectionnement technique et préparation en bassin, pour tous les niveaux et tous les objectifs.",
    img: swimming,
    alt: "Nageur en pleine action dans un bassin en faible lumière",
  },
  {
    n: "02",
    title: "Fitness",
    copy: "Renforcement, conditionnement et développement physique progressif, encadrés séance après séance.",
    img: fitness,
    alt: "Athlète en position de soulevé de terre dans une salle sombre",
  },
  {
    n: "03",
    title: "Mobilité & bien-être",
    copy: "Qualité de mouvement, amplitude articulaire, respiration et équilibre postural.",
    img: mobility,
    alt: "Athlète réalisant un étirement de mobilité au sol",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="section-label">Services</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Ce que nous <span className="text-primary">encadrons</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Un encadrement structuré, en individuel ou en petit groupe, adapté au niveau et à
            l'objectif de chaque personne.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="group bg-background">
              <div className="relative overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  width={1200}
                  height={1504}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-5 top-5 font-display text-sm font-semibold tracking-[0.2em] text-primary">
                  {s.n}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-px grid gap-px border border-t-0 border-border bg-border lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="relative overflow-hidden bg-background">
            <img
              src={performance}
              alt="Sprinter s'élançant des blocs de départ sur une piste"
              width={1600}
              height={1008}
              loading="lazy"
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-8 bg-background p-6 sm:p-10">
            <div>
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                04
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                Performance
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Préparation physique orientée performance : vitesse, puissance, endurance et
                capacité à répéter l'effort.
              </p>
            </div>
            <div className="border-t border-border pt-8">
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                05
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                Coaching personnalisé
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Un accompagnement individuel construit autour des objectifs, du niveau et des
                contraintes de la personne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}