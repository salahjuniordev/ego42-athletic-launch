import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { Programs } from "@/components/programs";
import { Coaches } from "@/components/coaches";
import { Testimonials } from "@/components/testimonials";
import { Gear } from "@/components/gear";
import { JoinCta } from "@/components/join-cta";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGO 42 — Push Beyond Your Limits" },
      {
        name: "description",
        content:
          "EGO 42 athletic training: sprint, strength and endurance programs, elite coaches and premium gear for athletes who refuse to slow down.",
      },
      { property: "og:title", content: "EGO 42 — Push Beyond Your Limits" },
      {
        property: "og:description",
        content: "Train harder, run faster, conquer your goals with EGO 42.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <Hero />
      <Philosophy />
      <Programs />
      <Coaches />
      <Testimonials />
      <Gear />
      <JoinCta />
      <SiteFooter />
    </div>
  );
}
