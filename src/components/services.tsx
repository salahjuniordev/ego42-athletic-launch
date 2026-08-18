import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { useLang, useT } from "@/lib/i18n/context";
import { getServices } from "@/lib/services-data";

export function Services() {
  const lang = useLang();
  const t = useT().services;
  const common = useT().common;

  // Localized array depends on `lang`, so the slices must live inside the render.
  const allServices = getServices(lang);
  const cards = allServices.slice(0, 3);
  const wide = allServices.slice(3);
  const feature = wide[1] ?? wide[0] ?? allServices[0]!;

  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
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

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-3">
          {cards.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col bg-background"
            >
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
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.cardCopy}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {common.discover}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-px grid gap-px border border-t-0 border-border bg-border lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="relative overflow-hidden bg-background">
            <img
              src={feature.img}
              alt={feature.alt}
              width={1600}
              height={1008}
              loading="lazy"
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-8 bg-background p-6 sm:p-10">
            {wide.map((s, i) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className={`group block ${i > 0 ? "border-t border-border pt-8" : ""}`}
              >
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                  {s.n}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.cardCopy}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {common.discover}
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 border border-border px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            {t.allServices}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
