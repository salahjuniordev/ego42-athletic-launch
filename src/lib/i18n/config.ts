export type Lang = "fr" | "en";

/** First-time visitors and crawlers (no cookie) get French — the primary market. */
export const DEFAULT_LANG: Lang = "fr";

export const LANG_COOKIE = "lang";

/** Open Graph locale per language. */
export const OG_LOCALE: Record<Lang, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function isLang(value: unknown): value is Lang {
  return value === "fr" || value === "en";
}

/** Coerces any cookie value to a valid Lang, falling back to the default. */
export function normalizeLang(value: unknown): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}
