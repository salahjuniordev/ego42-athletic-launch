import { useMemo, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import {
  coachPhotoUrl,
  createCoachProfile,
  setCoachServices,
  updateCoachProfile,
  uploadCoachPhoto,
  type CoachWithServices,
} from "@/integrations/supabase/coaches";
import { CAMEROON_CITIES } from "@/lib/cameroon-cities";
import { useLang, useT } from "@/lib/i18n/context";
import { getServices } from "@/lib/services-data";

const field =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary";

function labelSpan(text: string) {
  return (
    <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {text}
    </span>
  );
}

type Props = {
  mode: "create" | "edit";
  userId: string;
  initial?: CoachWithServices | null;
  /** Called after a successful save (create redirects, edit stays). */
  onSaved: () => void;
};

export function CoachProfileForm({ mode, userId, initial, onSaved }: Props) {
  const lang = useLang();
  const t = useT().coachForm;
  const services = getServices(lang);
  const [submitting, setSubmitting] = useState(false);

  const initialSlugs = useMemo(
    () => new Set((initial?.coach_services ?? []).map((s) => s.service_slug)),
    [initial],
  );

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(
    initial?.photo_path ? coachPhotoUrl(initial.photo_path) : "",
  );
  const fileRef = useRef<HTMLInputElement>(null);

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  }

  function handleError(err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
    if (code === "23505") {
      // Owner already has a profile — send them to the edit view.
      toast.error(t.errorToast, { description: t.errorDuplicate });
      onSaved();
    } else if (code === "42501") {
      toast.error(t.errorToast, { description: t.errorPermission });
    } else {
      console.error("[coach-form] save failed", err);
      toast.error(t.errorToast);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. A live session is required — RLS keys writes on auth.uid().
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        toast.error(t.errorToast, { description: t.errorPermission });
        return;
      }

      const data = new FormData(e.currentTarget);
      const val = (k: string) => String(data.get(k) ?? "").trim();
      const yearsRaw = Number(data.get("years_experience"));
      const years = Number.isFinite(yearsRaw) && yearsRaw > 0 ? Math.floor(yearsRaw) : 0;
      const selectedSlugs = data.getAll("services").map(String);

      // 2. Optional photo upload — never blocks the save.
      let photo_path = initial?.photo_path ?? "";
      let photoFailed = false;
      if (photoFile) {
        try {
          photo_path = await uploadCoachPhoto(userId, photoFile);
        } catch (err) {
          console.error("[coach-form] photo upload failed", err);
          photoFailed = true;
        }
      }

      const base = {
        full_name: val("full_name"),
        city: val("city"),
        phone: val("phone"),
        public_email: val("public_email"),
        whatsapp: val("whatsapp"),
        instagram: val("instagram"),
        website: val("website"),
        bio: val("bio"),
        certifications: val("certifications"),
        availability: val("availability"),
        years_experience: years,
        photo_path,
      };

      if (mode === "create") {
        // Never send `status` — it defaults to `pending` and RLS requires that.
        const { id } = await createCoachProfile({ user_id: userId, ...base });
        await setCoachServices(id, selectedSlugs);
        toast.success(t.createdToast, { description: t.createdToastBody });
        if (photoFailed) toast.warning(t.photoFailedToast, { description: t.photoFailedBody });
        onSaved();
      } else {
        // Never send `status` — a trigger reverts non-admin status changes.
        await updateCoachProfile(userId, base);
        if (initial) await setCoachServices(initial.id, selectedSlugs);
        toast.success(t.savedToast);
        if (photoFailed) toast.warning(t.photoFailedToast, { description: t.photoFailedBody });
        onSaved();
      }
    } catch (err) {
      handleError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 border border-border p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          {labelSpan(t.fullNameLabel)}
          <input
            name="full_name"
            required
            defaultValue={initial?.full_name ?? ""}
            placeholder={t.fullNamePlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block">
          {labelSpan(t.cityLabel)}
          <select
            name="city"
            defaultValue={initial?.city ?? ""}
            className={`mt-2 ${field}`}
          >
            <option value="">{t.cityPlaceholder}</option>
            {CAMEROON_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          {labelSpan(t.phoneLabel)}
          <input
            name="phone"
            type="tel"
            defaultValue={initial?.phone ?? ""}
            placeholder={t.phonePlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block">
          {labelSpan(t.whatsappLabel)}
          <input
            name="whatsapp"
            type="tel"
            defaultValue={initial?.whatsapp ?? ""}
            placeholder={t.whatsappPlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          {labelSpan(t.publicEmailLabel)}
          <input
            name="public_email"
            type="email"
            defaultValue={initial?.public_email ?? ""}
            placeholder={t.publicEmailPlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block">
          {labelSpan(t.yearsLabel)}
          <input
            name="years_experience"
            type="number"
            min={0}
            max={70}
            defaultValue={initial?.years_experience ? String(initial.years_experience) : ""}
            className={`mt-2 ${field}`}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          {labelSpan(t.instagramLabel)}
          <input
            name="instagram"
            defaultValue={initial?.instagram ?? ""}
            placeholder={t.instagramPlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block">
          {labelSpan(t.websiteLabel)}
          <input
            name="website"
            defaultValue={initial?.website ?? ""}
            placeholder={t.websitePlaceholder}
            className={`mt-2 ${field}`}
          />
        </label>
      </div>

      <label className="block">
        {labelSpan(t.bioLabel)}
        <textarea
          name="bio"
          rows={5}
          defaultValue={initial?.bio ?? ""}
          placeholder={t.bioPlaceholder}
          className={`mt-2 ${field}`}
        />
      </label>

      <label className="block">
        {labelSpan(t.certificationsLabel)}
        <textarea
          name="certifications"
          rows={3}
          defaultValue={initial?.certifications ?? ""}
          placeholder={t.certificationsPlaceholder}
          className={`mt-2 ${field}`}
        />
      </label>

      <label className="block">
        {labelSpan(t.availabilityLabel)}
        <textarea
          name="availability"
          rows={3}
          defaultValue={initial?.availability ?? ""}
          placeholder={t.availabilityPlaceholder}
          className={`mt-2 ${field}`}
        />
      </label>

      <fieldset>
        {labelSpan(t.servicesLabel)}
        <p className="mt-1 text-xs text-muted-foreground">{t.servicesHint}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label
              key={s.slug}
              className="flex items-center gap-3 border border-border px-4 py-3 text-sm text-foreground"
            >
              <input
                type="checkbox"
                name="services"
                value={s.slug}
                defaultChecked={initialSlugs.has(s.slug)}
                className="h-4 w-4 shrink-0 accent-primary"
              />
              {s.title}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="block">
        {labelSpan(t.photoLabel)}
        <p className="mt-1 text-xs text-muted-foreground">{t.photoHint}</p>
        <div className="mt-3 flex items-center gap-5">
          <div className="h-24 w-24 shrink-0 overflow-hidden border border-border bg-secondary">
            {photoPreview ? (
              <img src={photoPreview} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={onPickPhoto}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <Upload size={16} />
            {photoPreview ? t.photoChange : t.photoChoose}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t.submitting}
          </>
        ) : mode === "create" ? (
          t.submitCreate
        ) : (
          t.submitEdit
        )}
      </button>
    </form>
  );
}
