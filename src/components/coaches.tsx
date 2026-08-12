import { Instagram, Youtube, X as XIcon } from "lucide-react";

import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";

const coaches = [
  { img: coach1, name: "Marcus Vale", role: "Head of Strength", creds: "MSc Sport Science · CSCS · 12 yrs pro" },
  { img: coach2, name: "Nadia Cross", role: "Sprint Mechanics", creds: "Ex-national 200m · Level 3 Track" },
  { img: coach3, name: "Elias Rook", role: "Endurance Lead", creds: "IRONMAN coach · Lactate testing" },
];

export function Coaches() {
  return (
    <section id="coaches" className="texture-dark relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="section-label">Expert Coaches</span>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
          The people behind <span className="text-primary">the standard</span>
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c) => (
            <article
              key={c.name}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-colors duration-500 hover:border-primary"
            >
              <img
                src={c.img}
                alt={`${c.name}, ${c.role} at EGO 42`}
                width={768}
                height={960}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {c.role}
                </p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase italic tracking-tighter text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.creds}</p>
                <div className="mt-4 flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {[
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: XIcon, label: "X" },
                    { Icon: Youtube, label: "YouTube" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={`${c.name} on ${label}`}
                      className="text-foreground transition-colors duration-300 hover:text-primary"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
