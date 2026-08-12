import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const slides = [
  {
    quote:
      "Twelve weeks on the Sprint tier and I cut 0.31s off my 100m. The programming was ruthless and completely worth it.",
    name: "Jordan Ade",
    role: "Collegiate sprinter",
    stats: [
      { v: "-0.31s", l: "100m PB" },
      { v: "+9%", l: "Peak power" },
    ],
  },
  {
    quote:
      "I added serious strength without losing a step. My coach adjusted the block every single week based on my data.",
    name: "Lena Fischer",
    role: "Heptathlete",
    stats: [
      { v: "+22kg", l: "Back squat" },
      { v: "-3%", l: "Body fat" },
    ],
  },
  {
    quote:
      "Went from a 3:58 marathon to 3:21 in one season. The endurance plan finally taught me how to recover properly.",
    name: "Tom Ruiz",
    role: "Marathoner",
    stats: [
      { v: "-37min", l: "Marathon" },
      { v: "62", l: "VO2 max" },
    ],
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const s = slides[i]!;
  const go = (d: number) => setI((prev) => (prev + d + slides.length) % slides.length);

  return (
    <section id="proof" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <span className="section-label">The Proof</span>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <blockquote>
            <Quote size={40} className="text-primary" />
            <p className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              “{s.quote}”
            </p>
            <footer className="mt-8">
              <p className="font-display text-lg font-black uppercase italic tracking-tight text-foreground">
                {s.name}
              </p>
              <p className="text-sm text-muted-foreground">{s.role}</p>
            </footer>
          </blockquote>

          <dl className="flex gap-10 lg:flex-col lg:gap-8 lg:border-l lg:border-border lg:pl-10">
            {s.stats.map((st) => (
              <div key={st.l}>
                <dt className="font-display text-4xl font-black italic tracking-tighter text-primary">
                  {st.v}
                </dt>
                <dd className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {st.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex items-center gap-6 border-t border-border pt-8">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <ArrowRight size={18} />
          </button>
          <div className="ml-auto flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={i === idx}
                onClick={() => setI(idx)}
                className={`h-1.5 transition-all duration-300 ${
                  i === idx ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40 hover:bg-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
