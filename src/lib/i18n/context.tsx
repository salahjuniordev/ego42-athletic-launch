import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "@tanstack/react-router";

import type { Lang } from "./config";
import { writeLangCookie } from "./cookie";
import { ui } from "./ui";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  // The provider owns <html lang> after mount. On first render this effect sets
  // it to the same value the SSR shell already rendered (no visual change); on
  // toggle it updates the attribute live.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      writeLangCookie(next); // persist the choice
      setLangState(next); // (a) re-render all React text
      document.documentElement.lang = next; // (b) update <html lang> immediately
      void router.invalidate(); // (c) re-run root beforeLoad → head() meta, live
    },
    [router],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang/useSetLang/useT must be used within a LanguageProvider");
  }
  return ctx;
}

/** The current language. */
export function useLang(): Lang {
  return useLanguageContext().lang;
}

/** Setter that persists the choice and updates text + meta + <html lang> live. */
export function useSetLang(): (lang: Lang) => void {
  return useLanguageContext().setLang;
}

/** The dictionary for the current language (`t.hero.lead`, `t.nav.about`, …). */
export function useT() {
  return ui[useLanguageContext().lang];
}
