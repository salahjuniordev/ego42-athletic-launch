import { createFileRoute, notFound } from "@tanstack/react-router";

import { CoachDetail } from "@/components/coach-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getApprovedCoach } from "@/integrations/supabase/coaches";
import { buildCoachHead } from "@/lib/i18n/meta";

export const Route = createFileRoute("/coachs/$id")({
  // SSR loader (anon client). RLS + the `status = 'approved'` filter mean only
  // approved coaches resolve; anything else (unknown id, pending, bad UUID) 404s.
  loader: async ({ params }) => {
    let coach;
    try {
      coach = await getApprovedCoach(params.id);
    } catch (err) {
      console.error("[coachs/$id] failed to load coach", err);
      throw notFound();
    }
    if (!coach) throw notFound();
    return { coach };
  },
  head: ({ loaderData, match }) => {
    const lang = match.context.lang;
    if (!loaderData) {
      return {
        meta: [
          { title: lang === "en" ? "Coach not found — EGO 42" : "Coach introuvable — EGO 42" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return buildCoachHead(loaderData.coach.full_name, lang);
  },
  component: CoachPage,
});

function CoachPage() {
  const { coach } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <CoachDetail coach={coach} />
      </main>
      <SiteFooter />
    </div>
  );
}
