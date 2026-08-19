import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { CoachAuthForm } from "@/components/coach-auth-form";
import { CoachProfileForm } from "@/components/coach-profile-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCoachSession } from "@/hooks/use-coach-session";
import { getOwnProfile } from "@/integrations/supabase/coaches";
import { useT } from "@/lib/i18n/context";

export const Route = createFileRoute("/coach/inscription")({
  // Sessions live in localStorage (invisible server-side); render client-only
  // to avoid a logged-out/logged-in hydration mismatch. Not for indexing.
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: InscriptionPage,
});

function InscriptionPage() {
  const t = useT().coachForm;
  const tAuth = useT().coachAuth;
  const { session, user, loading } = useCoachSession();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      setHasProfile(null);
      return;
    }
    let active = true;
    setChecking(true);
    getOwnProfile(user.id)
      .then((p) => {
        if (!active) return;
        if (p) {
          // Already registered → send them to their editable space.
          navigate({ to: "/coach/espace", replace: true });
        } else {
          setHasProfile(false);
        }
      })
      .catch(() => {
        if (active) setHasProfile(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [user, navigate]);

  const authed = Boolean(session && user);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="section-label">{tAuth.title}</span>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl">
              {authed ? t.createTitle : tAuth.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {authed ? t.createIntro : tAuth.intro}
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            {loading || checking ? (
              <div className="grid place-items-center py-16">
                <Loader2 size={28} className="animate-spin text-primary" />
              </div>
            ) : !authed || !user ? (
              <CoachAuthForm />
            ) : hasProfile === false ? (
              <CoachProfileForm
                mode="create"
                userId={user.id}
                onSaved={() => navigate({ to: "/coach/espace" })}
              />
            ) : (
              <div className="grid place-items-center py-16">
                <Loader2 size={28} className="animate-spin text-primary" />
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
