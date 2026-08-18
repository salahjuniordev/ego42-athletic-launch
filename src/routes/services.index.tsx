import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLang, useT } from "@/lib/i18n/context";
import { buildRouteHead, routeMeta } from "@/lib/i18n/meta";
import { getServices } from "@/lib/services-data";

export const Route = createFileRoute("/services/")({
  head: ({ match }) => buildRouteHead(routeMeta.services, match.context.lang),
  component: ServicesIndex,
});

function ServicesIndex() {
  const lang = useLang();
  const t = useT().servicesPage;
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

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
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
                    <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      {s.title}
                    </h2>
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
