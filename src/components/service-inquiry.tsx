import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { services } from "@/lib/services-data";

export function ServiceInquiry({ serviceSlug }: { serviceSlug: string }) {
  const [service, setService] = useState(serviceSlug);
  const [sent, setSent] = useState(false);

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    setSent(true);
    toast.success("Demande envoyée", {
      description: `Merci ${name || ""}, nous revenons vers vous rapidement au sujet de « ${
        services.find((s) => s.slug === service)?.title ?? service
      } ».`,
    });
    e.currentTarget.reset();
    setService(serviceSlug);
  }

  return (
    <section id="demande" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="section-label">Demande</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Réserver une <span className="text-primary">séance</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Précisez votre niveau et votre objectif : nous vous proposons la formule adaptée et
              planifions la première séance.
            </p>
            {sent ? (
              <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Demande enregistrée
              </p>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            data-analytics-id="service-inquiry-form"
            data-service={service}
            className="grid gap-4 border border-border p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Nom
                </span>
                <input name="name" required placeholder="Votre nom" className={`mt-2 ${field}`} />
              </label>
              <label className="block">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Téléphone
                </span>
                <input
                  name="phone"
                  required
                  placeholder="+237 ..."
                  className={`mt-2 ${field}`}
                />
              </label>
            </div>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                E-mail
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className={`mt-2 ${field}`}
              />
            </label>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Service souhaité
              </span>
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`mt-2 ${field}`}
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Niveau actuel, objectif, disponibilités..."
                className={`mt-2 ${field}`}
              />
            </label>

            <button
              type="submit"
              data-analytics-id="service-inquiry-submit"
              data-service={service}
              className="mt-2 inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
            >
              Envoyer la demande
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
