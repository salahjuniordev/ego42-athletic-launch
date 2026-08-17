import { useState } from "react";
import { Menu, X as XIcon } from "lucide-react";

import mark from "@/assets/ego42-mark.png.asset.json";

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Programmes", href: "/programmes" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-5 pt-5 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={mark.url}
            alt="EGO 42 running figure logo"
            width={48}
            height={48}
            className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12"
          />
          <span className="truncate font-display text-2xl font-black italic uppercase tracking-tight text-foreground sm:text-3xl">
            EGO<span className="text-primary"> 42</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Open menu"
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
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 font-display text-lg font-bold uppercase italic text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
