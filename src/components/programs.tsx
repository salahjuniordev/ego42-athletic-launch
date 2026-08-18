import { useT } from "@/lib/i18n/context";

export function Programs() {
  const t = useT().programs;
  return (
    <section id="programmes" className="border-t border-border py-20 sm:py-28">
      <span id="programs" aria-hidden className="sr-only" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="section-label">{t.label}</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              {t.titleTop} <span className="text-primary">{t.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t.intro}</p>
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {t.groups.map((g) => (
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
