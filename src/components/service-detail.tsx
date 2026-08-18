import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ServiceInquiry } from "@/components/service-inquiry";
import { useLang, useT } from "@/lib/i18n/context";
import type { ServiceRaw } from "@/lib/services-data";
import { getRelatedServices, localizeService } from "@/lib/services-data";

const btnPrimary =
  "inline-flex items-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:bg-primary-glow hover:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnGhost =
  "inline-flex items-center gap-3 border border-border px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ServiceDetail({ service }: { service: ServiceRaw }) {
  const lang = useLang();
  const t = useT().serviceDetail;
  const common = useT().common;
  const s = localizeService(service, lang);
  const related = getRelatedServices(service.slug, lang);

  return (
    <>
      <section className="border-b border-border pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft size={16} />
            {t.backToServices}
          </Link>

          <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div>
              <span className="section-label">
                {t.servicePrefix} {s.n}
              </span>
              <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
                {s.title}
              </h1>
              <p className="mt-5 font-display text-lg font-semibold uppercase tracking-[0.14em] text-primary">
                {s.tagline}
              </p>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{s.intro}</p>
          </div>
        </div>

        <img
          src={s.img}
          alt={s.alt}
          width={1600}
          height={900}
          className="h-[42vh] min-h-[280px] w-full object-cover sm:h-[56vh]"
        />
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="section-label">{t.contentLabel}</span>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            {t.contentTop} <span className="text-primary">{t.contentAccent}</span>
          </h2>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
            {s.highlights.map((h, i) => (
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
                {t.audienceTitle}
              </h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {s.audience.map((a) => (
                  <li key={a} className="flex items-center gap-3 py-4 text-sm text-muted-foreground">
                    <Check size={16} className="shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t.formatTitle}
              </h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {s.format.map((f) => (
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
              data-analytics-id="service-cta-pricing"
              data-service={service.slug}
              className={btnPrimary}
            >
              {t.ctaPricing}
              <ArrowRight size={20} />
            </a>
            <a
              href="#demande"
              data-analytics-id="service-cta-inquiry"
              data-service={service.slug}
              className={btnGhost}
            >
              {t.ctaInquiry}
            </a>
          </div>
        </div>
      </section>

      <ServiceInquiry serviceSlug={service.slug} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="section-label">{t.relatedLabel}</span>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            {t.relatedTop} <span className="text-primary">{t.relatedAccent}</span>
          </h2>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {related.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                data-analytics-id="service-related-link"
                data-service={service.slug}
                data-target-service={o.slug}
                className="group flex flex-col bg-background"
              >
                <div className="overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                    {o.n}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {o.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {o.cardCopy}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 group-hover:gap-4">
                    {common.discover}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
