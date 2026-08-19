import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ExternalLink, Loader2, LogOut } from "lucide-react";

import { CoachProfileForm } from "@/components/coach-profile-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCoachSession } from "@/hooks/use-coach-session";
import { getOwnProfile, type CoachWithServices } from "@/integrations/supabase/coaches";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n/context";

export const Route = createFileRoute("/coach/espace")({
  // Client-only + auth-guarded; never indexed.
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: EspacePage,
});

function Spinner() {
  return (
    <div className="grid place-items-center py-24">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  );
}

function EspacePage() {
  const t = useT().coachSpace;
  const tDir = useT().directory;
  const { session, user, loading } = useCoachSession();
  const navigate = useNavigate();
  // undefined = still loading, null = no profile yet, object = loaded.
  const [profile, setProfile] = useState<CoachWithServices | null | undefined>(undefined);

  // Redirect out once we know there is no session.
  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/coach/inscription", replace: true });
    }
  }, [loading, session, navigate]);

  const load = useCallback(() => {
    if (!user) return;
    getOwnProfile(user.id)
      .then(setProfile)
      .catch((err) => {
        console.error("[espace] failed to load profile", err);
        setProfile(null);
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      setProfile(undefined);
      load();
    }
  }, [user, load]);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  const statusInfo = (status: CoachWithServices["status"]) => {
    switch (status) {
      case "approved":
        return { label: t.statusApproved, note: t.approvedNote, cls: "border-primary text-primary" };
      case "rejected":
        return {
          label: t.statusRejected,
          note: t.rejectedNote,
          cls: "border-destructive text-destructive",
        };
      default:
        return { label: t.statusPending, note: t.pendingNote, cls: "border-border text-foreground/70" };
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border pb-12 pt-28 sm:pt-36">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
            <h1 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-5xl">
              {t.title}
            </h1>
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <LogOut size={16} />
                {t.logout}
              </button>
            ) : null}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            {loading || !session || profile === undefined ? (
              <Spinner />
            ) : profile === null ? (
              <div className="border border-border p-8 text-center">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  {t.noProfileTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t.noProfileBody}
                </p>
                <Link
                  to="/coach/inscription"
                  className="mt-6 inline-flex items-center justify-center bg-primary px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
                >
                  {tDir.becomeCoachCta}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {(() => {
                  const info = statusInfo(profile.status);
                  return (
                    <div className={`border p-6 ${info.cls}`}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {t.statusLabel}
                        </span>
                        <span className="font-display text-sm font-bold uppercase tracking-[0.14em]">
                          {info.label}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{info.note}</p>
                      {profile.status === "approved" ? (
                        <Link
                          to="/coachs/$id"
                          params={{ id: profile.id }}
                          className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary transition-all duration-300 hover:gap-3"
                        >
                          {t.viewPublic}
                          <ExternalLink size={16} />
                        </Link>
                      ) : null}
                    </div>
                  );
                })()}

                {user ? (
                  <CoachProfileForm
                    mode="edit"
                    userId={user.id}
                    initial={profile}
                    onSaved={load}
                  />
                ) : null}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
