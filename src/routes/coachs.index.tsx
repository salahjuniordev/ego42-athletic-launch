import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";

import { CoachCard } from "@/components/coach-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  listApprovedCoaches,
  type CoachWithServices,
} from "@/integrations/supabase/coaches";
import { useLang, useT } from "@/lib/i18n/context";
import { buildRouteHead, routeMeta } from "@/lib/i18n/meta";
import { getService } from "@/lib/services-data";

export const Route = createFileRoute("/coachs/")({
  // SSR loader (anon client) → RLS returns only approved coaches, so every card
  // is present in the raw HTML and fully indexable. Filters run client-side.
  loader: async () => {
    try {
      const coaches = await listApprovedCoaches();
      return { coaches };
    } catch (err) {
      console.error("[coachs] failed to load directory", err);
      return { coaches: [] as CoachWithServices[] };
    }
  },
  head: ({ match }) => buildRouteHead(routeMeta.coachs, match.context.lang),
  component: CoachsIndex,
});

const field =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 focus:border-primary";

function CoachsIndex() {
  const lang = useLang();
  const t = useT().directory;
  const { coaches } = Route.useLoaderData();

  const [service, setService] = useState("");
  const [city, setCity] = useState("");

  const serviceOptions = useMemo(() => {
    const slugs = new Set<string>();
    coaches.forEach((c) => c.coach_services.forEach((s) => slugs.add(s.service_slug)));
    return [...slugs]
      .map((slug) => ({ slug, title: getService(slug, lang)?.title ?? slug }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [coaches, lang]);

  const cityOptions = useMemo(
    () =>
      [...new Set(coaches.map((c) => c.city).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [coaches],
  );

  const filtered = coaches.filter((c) => {
    const serviceOk = !service || c.coach_services.some((s) => s.service_slug === service);
    const cityOk = !city || c.city === city;
    return serviceOk && cityOk;
  });

  const hasFilters = Boolean(service || city);

  function reset() {
    setService("");
    setCity("");
  }

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

        {coaches.length > 0 ? (
          <section className="border-b border-border py-8">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                <label className="block">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t.filterService}
                  </span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`mt-2 ${field}`}
                  >
                    <option value="">{t.allServices}</option>
                    {serviceOptions.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t.filterCity}
                  </span>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`mt-2 ${field}`}
                    disabled={cityOptions.length === 0}
                  >
                    <option value="">{t.allCities}</option>
                    {cityOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                {hasFilters ? (
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    <RotateCcw size={16} />
                    {t.reset}
                  </button>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {coaches.length === 0 ? (
              <EmptyState title={t.empty.title} body={t.empty.body} />
            ) : filtered.length === 0 ? (
              <EmptyState title={t.emptyFiltered.title} body={t.emptyFiltered.body} />
            ) : (
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((coach) => (
                  <CoachCard key={coach.id} coach={coach} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-6 border border-border p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  {t.becomeCoachTitle}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t.becomeCoachBody}
                </p>
              </div>
              <Link
                to="/coach/inscription"
                className="inline-flex shrink-0 items-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:bg-primary-glow hover:gap-4"
              >
                {t.becomeCoachCta}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border px-6 py-20 text-center">
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}
