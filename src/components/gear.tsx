import { ArrowUpRight, Smartphone } from "lucide-react";

import shoe from "@/assets/gear-shoe.png";

const items = [
  { name: "EGO 42 Velocity Trainer", price: "$180", note: "Carbon plate · road & track" },
  { name: "Compression Tech Tee", price: "$65", note: "Sweat-mapped knit" },
  { name: "Performance Duffel", price: "$120", note: "Vented gear compartment" },
];

export function Gear() {
  return (
    <section id="gear" className="texture-dark relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden
            className="red-glow absolute left-1/2 top-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <img
            src={shoe}
            alt="EGO 42 Velocity trainer running shoe"
            width={900}
            height={900}
            loading="lazy"
            className="relative mx-auto w-full max-w-md -rotate-6 drop-shadow-2xl transition-transform duration-700 ease-out hover:-translate-y-3 hover:rotate-0"
          />
        </div>

        <div className="order-1 lg:order-2">
          <span className="section-label">Premium Gear</span>
          <h2 className="mt-6 font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
            Engineered to <span className="text-primary">move</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Apparel and footwear tested inside our own programs, plus full sync with the EGO 42 app
            so every session, split and lift lives in one place.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {items.map((it) => (
              <li key={it.name} className="group flex items-center gap-4 py-5">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-black uppercase italic tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {it.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{it.note}</p>
                </div>
                <span className="ml-auto shrink-0 font-display text-lg font-black italic text-foreground">
                  {it.price}
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex items-center gap-3 text-sm text-muted-foreground">
            <Smartphone size={18} className="text-primary" />
            Pairs with the EGO 42 app on iOS and Android.
          </p>
        </div>
      </div>
    </section>
  );
}
