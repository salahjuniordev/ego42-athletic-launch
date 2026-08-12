import { Zap, Dumbbell, Timer, ArrowUpRight } from "lucide-react";

const programs = [
  {
    Icon: Zap,
    name: "Sprint",
    price: "$89",
    tag: "8 weeks",
    copy: "Acceleration mechanics, top-end speed and reactive power for track and field athletes.",
    points: ["4 sessions / week", "Video form review", "Speed benchmark tests"],
  },
  {
    Icon: Dumbbell,
    name: "Strength",
    price: "$119",
    tag: "12 weeks",
    copy: "Progressive barbell blocks engineered to add force without stealing your speed.",
    points: ["Periodised blocks", "1RM tracking", "Mobility protocols"],
    featured: true,
  },
  {
    Icon: Timer,
    name: "Endurance",
    price: "$99",
    tag: "16 weeks",
    copy: "Threshold, tempo and VO2 work built around your race calendar and recovery data.",
    points: ["Zone-based plans", "Race taper guide", "Weekly check-ins"],
  },
];

export function Programs() {
  return (
    <section id="programs" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="section-label">Elite Programs</span>
            <h2 className="mt-6 font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
              Choose your <span className="text-primary">tier</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every program is coach-built, data-driven and delivered through the EGO 42 app. Cancel
            anytime — results don't need contracts.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {programs.map(({ Icon, ...p }) => (
            <article
              key={p.name}
              className={`group relative flex flex-col overflow-hidden rounded-lg border p-8 transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? "red-glow border-primary bg-card"
                  : "border-border bg-card/60 hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {p.tag}
                </span>
              </div>

              <h3 className="mt-8 font-display text-3xl font-black uppercase italic tracking-tighter text-foreground">
                {p.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>

              <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between pt-2">
                <span className="font-display text-2xl font-black italic tracking-tight text-foreground">
                  {p.price}
                  <span className="ml-1 text-xs font-bold not-italic text-muted-foreground">
                    /mo
                  </span>
                </span>
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 hover:text-primary"
                >
                  Join
                  <ArrowUpRight
                    size={18}
                    className="text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
