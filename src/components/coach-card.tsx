import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

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

export function CoachCard({ coach }: { coach: CoachWithServices }) {
  const lang = useLang();
  const t = useT().directory;
  const photo = coachPhotoUrl(coach.photo_path);

  const serviceLabels = coach.coach_services
    .map((cs) => getService(cs.service_slug, lang)?.title)
    .filter((label): label is string => Boolean(label));

  return (
    <Link
      to="/coachs/$id"
      params={{ id: coach.id }}
      className="group flex flex-col bg-background"
    >
      <div className="relative overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={coach.full_name}
            width={1200}
            height={1504}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid aspect-[4/5] w-full place-items-center bg-secondary">
            <span className="font-display text-6xl font-black italic uppercase text-primary/40">
              {initials(coach.full_name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {coach.full_name}
        </h2>
        {coach.city ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} className="shrink-0 text-primary" />
            {coach.city}
          </p>
        ) : null}

        {serviceLabels.length ? (
          <ul className="mt-4 flex flex-1 flex-wrap gap-2">
            {serviceLabels.map((label) => (
              <li
                key={label}
                className="border border-border px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {label}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-1" />
        )}

        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 group-hover:gap-4">
          {t.viewProfile}
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
