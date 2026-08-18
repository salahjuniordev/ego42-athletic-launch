import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Programs } from "@/components/programs";
import { Pricing } from "@/components/pricing";
import { useLang, useT } from "@/lib/i18n/context";
import { buildRouteHead, routeMeta } from "@/lib/i18n/meta";
import { getServices } from "@/lib/services-data";

const url = "https://ego42-athletic-launch.lovable.app/programmes";

export const Route = createFileRoute("/programmes")({
  head: ({ match }) => buildRouteHead(routeMeta.programs, match.context.lang, { url }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  const lang = useLang();
  const t = useT().programsPage;
  const common = useT().common;
  const services = getServices(lang);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="section-label">{t.label}</span>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
              {t.titleTop} <span className="text-primary">{t.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
          </div>
        </section>

        <Programs />
        <Pricing />

        <section className="border-t border-border py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              {t.domainsTop} <span className="text-primary">{t.domainsAccent}</span>
            </h2>
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  data-analytics-id={`programmes-service-${s.slug}`}
                  className="group bg-background p-6"
                >
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.cardCopy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 group-hover:gap-3">
                    {common.discover}
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="/#contact"
                data-analytics-id="programmes-contact"
                className="group inline-flex items-center gap-2 bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
              >
                {t.ctaEval}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/a-propos"
                data-analytics-id="programmes-apropos"
                className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {t.ctaMethod}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
