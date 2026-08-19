import logo from "@/assets/mario-ego42-logo.png.asset.json";
import { useT } from "@/lib/i18n/context";
import { navLinks } from "./site-header";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <a href="/" className="flex items-center">
          <img
            src={logo.url}
            alt={t.footer.logoAlt}
            width={220}
            height={220}
            loading="lazy"
            className="h-20 w-auto shrink-0 rounded-2xl object-contain"
          />
        </a>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-2 lg:justify-end">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        {t.footer.copyright(new Date().getFullYear())}
      </p>
    </footer>
  );
}
