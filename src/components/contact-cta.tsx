import { ArrowRight } from "lucide-react";

import { useT } from "@/lib/i18n/context";

export function ContactCta() {
  const t = useT().contact;
  return (
    <section id="contact" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <span className="section-label">{t.label}</span>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
              {t.titleTop}
              <span className="block text-primary">{t.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">{t.body}</p>
            <a
              href="#tarifs"
              className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
            >
              {t.cta}
              <ArrowRight size={20} />
            </a>
          </div>

          <dl className="grid content-start gap-8 border-t border-border pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {t.items.map((item, i) => (
              <div key={item.dt}>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {item.dt}
                </dt>
                <dd
                  className={
                    i === 0
                      ? "mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground"
                      : "mt-2 text-sm leading-relaxed text-muted-foreground"
                  }
                >
                  {item.dd}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
