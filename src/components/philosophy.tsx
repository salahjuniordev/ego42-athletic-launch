import { Play } from "lucide-react";

import film from "@/assets/brand-film.mp4.asset.json";

const pillars = [
  { k: "01", t: "Discipline", d: "Motivation fades. Systems don't. Every session is logged, measured, repeated." },
  { k: "02", t: "Intensity", d: "We train at the edge of capacity, then recover like professionals." },
  { k: "03", t: "Identity", d: "Your ego isn't arrogance — it's the standard you refuse to fall below." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="texture-dark relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="section-label">The EGO 42 Philosophy</span>
          <h2 className="mt-6 font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
            Built for those who
            <span className="text-primary"> never coast</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            EGO 42 exists for the athlete who treats training as a craft. Forty-two seconds of pure
            output, repeated until it becomes character. No shortcuts, no vanity metrics — only
            measurable performance and the mindset to sustain it.
          </p>

          <dl className="mt-10 space-y-6 border-l border-border pl-6">
            {pillars.map((p) => (
              <div key={p.k}>
                <dt className="font-display text-lg font-black uppercase italic tracking-tight text-foreground">
                  <span className="mr-3 text-primary">{p.k}</span>
                  {p.t}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="group relative overflow-hidden rounded-lg border border-border">
          <video
            src={film.url}
            className="aspect-video w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            autoPlay
            muted
            loop
            playsInline
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/30" />
          <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-3">
            <span className="red-glow grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
              <Play size={18} />
            </span>
            <span className="font-display text-sm font-black uppercase italic tracking-wide text-foreground">
              The Manifesto Film
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
