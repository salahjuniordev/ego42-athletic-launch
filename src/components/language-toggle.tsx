import { useLang, useSetLang, useT } from "@/lib/i18n/context";

/**
 * Premium segmented FR|EN control. A single red-gradient indicator slides
 * between the two segments; the active label sits on top of it. Fully
 * accessible (labelled group + per-button aria-pressed/aria-label) and
 * respects reduced-motion.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const setLang = useSetLang();
  const t = useT().languageToggle;
  const isEn = lang === "en";

  const segment =
    "relative z-10 grid h-8 w-11 place-items-center rounded-full font-display text-sm font-bold uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background";

  return (
    <div
      role="group"
      aria-label={t.group}
      className={`relative inline-flex h-9 shrink-0 items-center rounded-full border border-border bg-card/60 p-0.5 backdrop-blur ${className}`}
    >
      <span
        aria-hidden
        className={`red-glow pointer-events-none absolute left-0.5 top-0.5 h-8 w-11 rounded-full bg-[image:var(--gradient-primary)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isEn ? "translate-x-11" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        aria-label={t.toFrench}
        aria-pressed={!isEn}
        onClick={() => setLang("fr")}
        className={`${segment} ${isEn ? "text-foreground/70 hover:text-foreground" : "text-primary-foreground"}`}
      >
        FR
      </button>
      <button
        type="button"
        aria-label={t.toEnglish}
        aria-pressed={isEn}
        onClick={() => setLang("en")}
        className={`${segment} ${isEn ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
      >
        EN
      </button>
    </div>
  );
}
