import { useState } from "react";
import { ArrowRight, Instagram, Search, Youtube, X as XIcon } from "lucide-react";

import athlete from "@/assets/athlete.png";
import { useT } from "@/lib/i18n/context";

export function Hero() {
  const [slide, setSlide] = useState(0);
  const t = useT();

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] flex-col overflow-hidden bg-background"
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pt-24 pb-40 sm:px-8 sm:pb-32">
        <h1 className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center font-display text-[24vw] font-black uppercase leading-none tracking-tighter text-foreground">
          EGO 42
        </h1>

        <div
          aria-hidden
          className="red-glow pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-[58vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-primary sm:border-[14px]"
        />

        <img
          src={athlete}
          alt={t.hero.athleteAlt}
          width={1024}
          height={1536}
          className="relative z-20 h-full max-h-full w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </div>

      <div className="absolute bottom-8 left-5 z-30 max-w-md sm:bottom-12 sm:left-8 sm:max-w-lg">
        <p className="text-base leading-relaxed text-muted-foreground">{t.hero.lead}</p>
        <a
          href="#programs"
          className="group mt-6 inline-flex items-center gap-3 font-display text-xl font-black uppercase italic tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
        >
          {t.hero.cta}
          <ArrowRight
            size={24}
            className="text-primary transition-transform duration-300 group-hover:translate-x-2"
          />
        </a>
      </div>

      <div className="absolute left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={t.hero.slide(i + 1)}
            aria-current={slide === i}
            onClick={() => setSlide(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              slide === i ? "scale-125 bg-primary" : "bg-muted-foreground/50 hover:bg-foreground"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        {[
          { Icon: Instagram, label: "Instagram" },
          { Icon: XIcon, label: "X" },
          { Icon: Youtube, label: "YouTube" },
        ].map(({ Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-foreground transition-colors duration-300 hover:text-primary"
          >
            <Icon size={18} />
          </a>
        ))}
        <span aria-hidden className="my-2 h-16 w-px bg-border" />
        <button
          type="button"
          aria-label={t.hero.search}
          className="text-foreground transition-colors duration-300 hover:text-primary"
        >
          <Search size={18} />
        </button>
      </div>
    </section>
  );
}
