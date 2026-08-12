import { Instagram, Youtube, X as XIcon } from "lucide-react";

import mark from "@/assets/ego42-mark.png.asset.json";
import { navLinks } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <a href="#hero" className="flex items-center gap-3">
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

        <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-center">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            Privacy
          </a>
        </nav>

        <div className="flex items-center gap-5 lg:justify-end">
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: XIcon, label: "X" },
            { Icon: Youtube, label: "YouTube" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EGO 42. All rights reserved.
      </p>
    </footer>
  );
}
