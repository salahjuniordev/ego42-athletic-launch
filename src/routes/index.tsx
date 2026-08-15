import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { BrandStatement } from "@/components/brand-statement";
import { Services } from "@/components/services";
import { Programs } from "@/components/programs";
import { Pricing } from "@/components/pricing";
import { Method } from "@/components/method";
import { ContactCta } from "@/components/contact-cta";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGO 42 — Coaching & préparation physique" },
      {
        name: "description",
        content:
          "EGO 42 : coaching sportif et préparation physique au Cameroun — natation, renforcement, mobilité et performance pour enfants, adolescents, adultes et athlètes.",
      },
      { property: "og:title", content: "EGO 42 — Coaching & préparation physique" },
      {
        property: "og:description",
        content:
          "Coaching sportif et préparation physique en piscine et à sec, pour tous les âges et tous les niveaux.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <Hero />
      <BrandStatement />
      <Services />
      <Programs />
      <Pricing />
      <Method />
      <ContactCta />
      <SiteFooter />
    </div>
  );
}
