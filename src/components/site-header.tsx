import { useState } from "react";
import { Menu, X as XIcon } from "lucide-react";

import logo from "@/assets/mario-ego42-logo.png.asset.json";
import { useT } from "@/lib/i18n/context";
import { LanguageToggle } from "@/components/language-toggle";

/** Nav entries are language-independent; labels resolve via `t.nav[key]`. */
export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/a-propos" },
  { key: "services", href: "/services" },
  { key: "programs", href: "/programmes" },
  { key: "coachs", href: "/coachs" },
  { key: "pricing", href: "/#tarifs" },
  { key: "contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useT();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-5 pt-5 sm:px-8">
        <a href="/" className="flex min-w-0 items-center">
          <img
            src={logo.url}
            alt={t.header.logoAlt}
            width={220}
            height={220}
            className="h-14 w-auto shrink-0 object-contain sm:h-20"
          />
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors duration-300 hover:text-primary"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <a
              href="/coach/inscription"
              className="border border-primary px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {t.directory.becomeCoachCta}
            </a>
          </nav>
          <LanguageToggle />
          <button
            type="button"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="-mt-5 -mr-5 grid h-14 w-14 shrink-0 place-items-center bg-primary text-primary-foreground transition-colors duration-300 hover:bg-primary-glow sm:-mr-8 sm:h-20 sm:w-20"
          >
            {menuOpen ? <XIcon size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mt-4 flex flex-col gap-1 border-y border-border bg-card/90 px-5 py-4 backdrop-blur md:hidden">
          <div className="pb-2">
            <LanguageToggle />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 font-display text-lg font-bold uppercase italic text-foreground transition-colors hover:text-primary"
            >
              {t.nav[link.key]}
            </a>
          ))}
          <a
            href="/coach/inscription"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-block border border-primary px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {t.directory.becomeCoachCta}
          </a>
        </nav>
      )}
    </header>
  );
}
