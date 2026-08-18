import { useT } from "@/lib/i18n/context";

export function BrandStatement() {
  const t = useT().brandStatement;
  return (
    <section id="apropos" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="section-label">{t.label}</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              {t.titleTop}
              <span className="block text-primary">{t.titleAccent}</span>
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-display text-2xl font-medium uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              {t.lead}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.body}</p>
          </div>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.pillars.map((p) => (
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
