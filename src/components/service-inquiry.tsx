import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { useLang, useT } from "@/lib/i18n/context";
import { getServices } from "@/lib/services-data";

export function ServiceInquiry({ serviceSlug }: { serviceSlug: string }) {
  const lang = useLang();
  const t = useT().inquiry;
  const [service, setService] = useState(serviceSlug);
  const [sent, setSent] = useState(false);

  const localizedServices = getServices(lang);

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const serviceTitle = localizedServices.find((s) => s.slug === service)?.title ?? service;
    setSent(true);
    toast.success(t.toastTitle, {
      description: t.toastDescription(name || "", serviceTitle),
    });
    e.currentTarget.reset();
    setService(serviceSlug);
  }

  return (
    <section id="demande" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="section-label">{t.label}</span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              {t.titleTop} <span className="text-primary">{t.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{t.intro}</p>
            {sent ? (
              <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {t.sent}
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
                  {t.nameLabel}
                </span>
                <input
                  name="name"
                  required
                  placeholder={t.namePlaceholder}
                  className={`mt-2 ${field}`}
                />
              </label>
              <label className="block">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.phoneLabel}
                </span>
                <input
                  name="phone"
                  required
                  placeholder={t.phonePlaceholder}
                  className={`mt-2 ${field}`}
                />
              </label>
            </div>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.emailLabel}
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder={t.emailPlaceholder}
                className={`mt-2 ${field}`}
              />
            </label>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.serviceLabel}
              </span>
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`mt-2 ${field}`}
              >
                {localizedServices.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.messageLabel}
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder={t.messagePlaceholder}
                className={`mt-2 ${field}`}
              />
            </label>

            <button
              type="submit"
              data-analytics-id="service-inquiry-submit"
              data-service={service}
              className="mt-2 inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
            >
              {t.submit}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
