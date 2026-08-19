import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { coachPhotoUrl, type CoachWithServices } from "@/integrations/supabase/coaches";
import { useLang, useT } from "@/lib/i18n/context";
import { getService } from "@/lib/services-data";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

/** Normalize a phone/WhatsApp string to bare digits for a `wa.me` link. */
function waDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function instagramUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://instagram.com/${value.replace(/^@/, "")}`;
}

function websiteUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function CoachDetail({ coach }: { coach: CoachWithServices }) {
  const lang = useLang();
  const t = useT().coachDetail;
  const photo = coachPhotoUrl(coach.photo_path);

  const serviceLabels = coach.coach_services
    .map((cs) => getService(cs.service_slug, lang)?.title)
    .filter((label): label is string => Boolean(label));

  return (
    <>
      <section className="border-b border-border pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/coachs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>

          <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div>
              <span className="section-label">{t.coachPrefix}</span>
              <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
                {coach.full_name}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-lg font-semibold uppercase tracking-[0.14em] text-primary">
                {coach.city ? (
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={18} className="shrink-0" />
                    {coach.city}
                  </span>
                ) : null}
                {coach.years_experience > 0 ? (
                  <span>{t.experience(coach.years_experience)}</span>
                ) : null}
              </div>
            </div>

            {serviceLabels.length ? (
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {t.servicesTitle}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {serviceLabels.map((label) => (
                    <li
                      key={label}
                      className="border border-border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {photo ? (
          <img
            src={photo}
            alt={coach.full_name}
            width={1600}
            height={900}
            className="h-[42vh] min-h-[280px] w-full object-cover sm:h-[56vh]"
          />
        ) : (
          <div className="grid h-[32vh] min-h-[220px] w-full place-items-center bg-secondary sm:h-[40vh]">
            <span className="font-display text-7xl font-black italic uppercase text-primary/30">
              {initials(coach.full_name)}
            </span>
          </div>
        )}
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="flex flex-col gap-12">
              {coach.bio ? (
                <Block title={t.bioTitle}>{coach.bio}</Block>
              ) : null}
              {coach.certifications ? (
                <Block title={t.certificationsTitle}>{coach.certifications}</Block>
              ) : null}
              {coach.availability ? (
                <Block title={t.availabilityTitle}>{coach.availability}</Block>
              ) : null}
            </div>

            <aside className="border border-border p-7 lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t.contactTitle}
              </h2>

              {coach.whatsapp ? (
                <a
                  href={`https://wa.me/${waDigits(coach.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
                >
                  <MessageCircle size={18} />
                  {t.whatsappCta}
                </a>
              ) : null}

              <ul className="mt-6 divide-y divide-border border-t border-border">
                {coach.phone ? (
                  <ContactRow
                    icon={<Phone size={16} />}
                    label={t.phone}
                    value={coach.phone}
                    href={`tel:${coach.phone.replace(/\s+/g, "")}`}
                  />
                ) : null}
                {coach.public_email ? (
                  <ContactRow
                    icon={<Mail size={16} />}
                    label={t.email}
                    value={coach.public_email}
                    href={`mailto:${coach.public_email}`}
                  />
                ) : null}
                {coach.instagram ? (
                  <ContactRow
                    icon={<Instagram size={16} />}
                    label={t.instagram}
                    value={coach.instagram}
                    href={instagramUrl(coach.instagram)}
                    external
                  />
                ) : null}
                {coach.website ? (
                  <ContactRow
                    icon={<Globe size={16} />}
                    label={t.website}
                    value={coach.website}
                    href={websiteUrl(coach.website)}
                    external
                  />
                ) : null}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {title}
      </h2>
      <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-3 py-4 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        <span className="shrink-0 text-primary">{icon}</span>
        <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
          {label}
        </span>
        <span className="ml-auto truncate text-right">{value}</span>
      </a>
    </li>
  );
}
