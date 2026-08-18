import { ArrowRight } from "lucide-react";

import { useT } from "@/lib/i18n/context";

// Same FCFA figures as the landing-page pricing block (language-independent).
const monthlyPrices = ["45 000", "60 000", "80 000"];
const sessionPrices = ["5 000", "7 500", "9 500"];

const btnPrimary =
  "inline-flex items-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:bg-primary-glow hover:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnGhost =
  "inline-flex items-center gap-3 border border-border px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ServicePricing({
  serviceSlug,
  serviceTitle,
}: {
  serviceSlug: string;
  serviceTitle: string;
}) {
  const t = useT().servicePricing;
  const p = useT().pricing;

  return (
    <section
      id="tarifs"
      className="texture-dark border-b border-border py-20 sm:py-28"
      aria-label={`${t.label} — ${serviceTitle}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="section-label">{t.label}</span>
        <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
          {t.titleTop} <span className="text-primary">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.intro(serviceTitle)}
        </p>

        <h3 className="mt-12 font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t.monthlyTitle}
        </h3>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-3">
          {p.monthly.map((m, i) => (
            <div key={m.age} className="bg-background p-7">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {m.label}
              </p>
              <p className="mt-1 font-display text-xl font-semibold uppercase tracking-tight text-foreground">
                {m.age}
              </p>
              <p className="mt-8 font-display text-5xl font-bold leading-none tracking-tight text-foreground">
                {monthlyPrices[i]}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.monthUnit}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t.sessionTitle}
            </h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {p.perSession.map((age, i) => (
                <li key={age} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-lg font-semibold uppercase tracking-tight text-foreground">
                    {age}
                  </span>
                  <span className="text-right">
                    <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {sessionPrices[i]}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">{p.sessionUnit}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-primary pl-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t.note}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demande"
                data-analytics-id="service-pricing-inquiry"
                data-service={serviceSlug}
                className={btnPrimary}
              >
                {t.ctaInquiry}
                <ArrowRight size={20} />
              </a>
              <a
                href="/#tarifs"
                data-analytics-id="service-pricing-all"
                data-service={serviceSlug}
                className={btnGhost}
              >
                {t.ctaAll}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}