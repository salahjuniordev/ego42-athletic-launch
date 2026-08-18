import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServiceDetail } from "@/components/service-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildServiceHead } from "@/lib/i18n/meta";
import { getServiceRaw } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  // The loader stays language-independent: it returns the raw bilingual service,
  // so a toggle never needs a loader round-trip. `head` and the component pick
  // the active language from route context / `useLang()`.
  loader: ({ params }) => {
    const service = getServiceRaw(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, match }) => {
    const lang = match.context.lang;
    if (!loaderData) {
      return {
        meta: [
          { title: lang === "en" ? "Service not found — EGO 42" : "Service introuvable — EGO 42" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    return buildServiceHead(service.seoTitle[lang], service.seoDescription[lang]);
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <ServiceDetail service={service} />
      </main>
      <SiteFooter />
    </div>
  );
}
