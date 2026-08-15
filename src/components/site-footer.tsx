import mark from "@/assets/ego42-mark.png.asset.json";
import { navLinks } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <a href="/" className="flex items-center gap-3">
          <img
            src={mark.url}
            alt="EGO 42 logo"
            width={40}
            height={40}
            loading="lazy"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-xl font-black uppercase italic tracking-tight text-foreground">
            EGO<span className="text-primary"> 42</span>
          </span>
        </a>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-2 lg:justify-end">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EGO 42 — Coaching sportif & préparation physique, Cameroun.
      </p>
    </footer>
  );
}
