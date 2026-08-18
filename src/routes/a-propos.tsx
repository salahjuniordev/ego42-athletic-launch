import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BrandStatement } from "@/components/brand-statement";
import { Method } from "@/components/method";
import { useT } from "@/lib/i18n/context";
import { buildRouteHead, routeMeta } from "@/lib/i18n/meta";

const url = "https://ego42-athletic-launch.lovable.app/a-propos";

export const Route = createFileRoute("/a-propos")({
  head: ({ match }) => buildRouteHead(routeMeta.about, match.context.lang, { url }),
  component: AProposPage,
});

function AProposPage() {
  const t = useT().aboutPage;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="section-label">{t.label}</span>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
              {t.titleTop}
              <span className="block text-primary">{t.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {t.values.map((v) => (
                <div key={v.t} className="bg-background p-7">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                    {v.t}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BrandStatement />
        <Method />

        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-5 sm:px-8">
            <Link
              to="/programmes"
              data-analytics-id="apropos-programmes"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
            >
              {t.ctaPrograms}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="/#contact"
              data-analytics-id="apropos-contact"
              className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {t.ctaContact}
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
