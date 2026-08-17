import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Programs } from "@/components/programs";
import { Pricing } from "@/components/pricing";
import { services } from "@/lib/services-data";

const title = "Programmes — Enfants, adolescents, adultes & athlètes | EGO 42";
const description =
  "Les programmes EGO 42 au Cameroun : natation et préparation physique pour enfants (0-8 et 9-17 ans), adultes (18 ans et +) et athlètes, avec tarifs en FCFA.";
const url = "https://ego42-athletic-launch.lovable.app/programmes";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="section-label">Programmes</span>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
              Un cadre par <span className="text-primary">profil</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Chaque programme est construit selon l'âge, le niveau de départ et l'objectif : eau,
              renforcement, mobilité ou performance. Le contenu est défini lors de la première séance
              d'évaluation.
            </p>
          </div>
        </section>

        <Programs />
        <Pricing />

        <section className="border-t border-border py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              Domaines <span className="text-primary">encadrés</span>
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
                    Découvrir
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
                Réserver une évaluation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/a-propos"
                data-analytics-id="programmes-apropos"
                className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                La méthode
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
