import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Instagram, Youtube, Search, ArrowRight, X as XIcon } from "lucide-react";

import athlete from "@/assets/athlete.png";
import mark from "@/assets/ego42-mark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGO 42 — Push Beyond Your Limits" },
      {
        name: "description",
        content:
          "EGO 42 athletic training: speed, strength and endurance programs built for athletes who refuse to slow down.",
      },
      { property: "og:title", content: "EGO 42 — Push Beyond Your Limits" },
      {
        property: "og:description",
        content: "Train harder, run faster, conquer your goals with EGO 42.",
      },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "Programs", "Trainers", "Contact"];

function Index() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="relative z-40 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-5 pt-5 sm:px-8">
        <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-3">
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
                key={link}
                href="#"
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors duration-300 hover:text-primary"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="-mt-5 -mr-5 grid h-14 w-14 shrink-0 place-items-center bg-primary text-primary-foreground transition-colors duration-300 hover:bg-primary-glow sm:-mt-5 sm:-mr-8 sm:h-20 sm:w-20"
          >
            {menuOpen ? <XIcon size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="relative z-40 mt-4 flex flex-col gap-1 border-y border-border bg-card/60 px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="py-2 font-display text-lg font-bold uppercase italic text-foreground transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </nav>
      )}

      {/* Hero */}
      <section className="relative flex min-h-[78vh] items-center justify-center px-5 sm:px-8 lg:min-h-[72vh]">
        {/* Background wordmark */}
        <h1 className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center font-display text-[24vw] font-black uppercase leading-none tracking-tighter text-foreground">
          EGO 42
        </h1>

        {/* Red ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-[58vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-primary sm:border-[14px]"
          style={{ boxShadow: "var(--shadow-red)" }}
        />

        {/* Athlete */}
        <img
          src={athlete}
          alt="Sprinter athlete in explosive starting stride"
          width={1024}
          height={1536}
          className="relative z-20 h-[62vh] w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.03] lg:h-[78vh]"
        />
      </section>

      {/* Hero copy */}
      <div className="relative z-30 max-w-xl px-5 pb-16 sm:px-8 lg:absolute lg:bottom-16 lg:left-8 lg:pb-0">
        <p className="text-base leading-relaxed text-muted-foreground">
          Push beyond your limits. Train harder, run faster, and conquer your goals with EGO 42 —
          performance programming for athletes who refuse to settle.
        </p>
        <a
          href="#"
          className="group mt-6 inline-flex items-center gap-3 font-display text-xl font-black uppercase italic tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
        >
          Explore Programs
          <ArrowRight
            size={24}
            className="text-primary transition-transform duration-300 group-hover:translate-x-2"
          />
        </a>
      </div>

      {/* Left pagination */}
      <div className="absolute left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={slide === i}
            onClick={() => setSlide(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              slide === i ? "scale-125 bg-primary" : "bg-muted-foreground/50 hover:bg-foreground"
            }`}
          />
        ))}
      </div>

      {/* Right social rail */}
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
          aria-label="Search"
          className="text-foreground transition-colors duration-300 hover:text-primary"
        >
          <Search size={18} />
        </button>
      </div>
    </main>
  );
}
