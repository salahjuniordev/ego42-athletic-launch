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
import { buildRouteHead, routeMeta } from "@/lib/i18n/meta";

export const Route = createFileRoute("/")({
  head: ({ match }) => buildRouteHead(routeMeta.home, match.context.lang),
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
