import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n/context";

const field =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary";

type Mode = "signup" | "login";

/**
 * Email/password sign-up + login. On success the session lands in localStorage
 * and `useCoachSession()` swaps the parent view — this component just reports
 * the "confirm your email" case and inline errors.
 */
export function CoachAuthForm() {
  const t = useT().coachAuth;
  const [mode, setMode] = useState<Mode>("signup");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setSubmitting(true);

    try {
      if (mode === "signup") {
        const { data: res, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(/already|registered|exists/i.test(signUpError.message) ? t.errorExists : t.errorGeneric);
          return;
        }
        // Supabase obfuscates an already-registered email as a user with no identities.
        if (res.user && res.user.identities && res.user.identities.length === 0) {
          setError(t.errorExists);
          return;
        }
        // Email confirmation is ON → user exists but there is no session yet.
        if (res.user && !res.session) {
          setPendingEmail(email);
          return;
        }
        // Otherwise a session is live; the session hook takes over.
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(/invalid/i.test(signInError.message) ? t.errorInvalid : t.errorGeneric);
          return;
        }
      }
    } catch {
      setError(t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (pendingEmail) {
    return (
      <div className="mx-auto max-w-md border border-border p-8 text-center">
        <MailCheck size={40} className="mx-auto text-primary" />
        <h2 className="mt-6 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
          {t.confirmTitle}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {t.confirmBody(pendingEmail)}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="grid grid-cols-2 border border-border">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError("");
            }}
            className={`py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "signup" ? t.signupTab : t.loginTab}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 border border-border p-6 sm:p-8">
        <label className="block">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t.emailLabel}
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>

        <label className="block">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t.passwordLabel}
          </span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            placeholder={t.passwordPlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>

        {error ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {t.submitting}
            </>
          ) : mode === "signup" ? (
            t.signupCta
          ) : (
            t.loginCta
          )}
        </button>
      </form>
    </div>
  );
}
