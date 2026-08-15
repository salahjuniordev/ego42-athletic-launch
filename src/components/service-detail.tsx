import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { Service } from "@/lib/services-data";
import { services } from "@/lib/services-data";

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="border-b border-border pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft size={16} />
            Tous les services
          </Link>

          <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div>
              <span className="section-label">Service {service.n}</span>
              <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
                {service.title}
              </h1>
              <p className="mt-5 font-display text-lg font-semibold uppercase tracking-[0.14em] text-primary">
                {service.tagline}
              </p>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{service.intro}</p>
          </div>
        </div>

        <img
          src={service.img}
          alt={service.alt}
          width={1600}
          height={900}
          className="h-[42vh] min-h-[280px] w-full object-cover sm:h-[56vh]"
        />
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="section-label">Contenu</span>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Ce que l'on <span className="text-primary">travaille</span>
          </h2>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
            {service.highlights.map((h, i) => (
              <div key={h.title} className="bg-background p-7">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Pour qui
              </h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {service.audience.map((a) => (
                  <li key={a} className="flex items-center gap-3 py-4 text-sm text-muted-foreground">
                    <Check size={16} className="shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Format des séances
              </h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {service.format.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-4 text-sm text-muted-foreground">
                    <Check size={16} className="shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <a
              href="/#tarifs"
              className="inline-flex items-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
            >
              Voir les tarifs
              <ArrowRight size={20} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="section-label">Autres services</span>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: o.slug }}
                  className="group grid gap-2 py-7 transition-colors duration-300 hover:bg-card/50 sm:grid-cols-[minmax(0,4rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8 sm:px-2"
                >
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                    {o.n}
                  </span>
                  <span className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {o.title}
                  </span>
                  <ArrowRight size={20} className="text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
