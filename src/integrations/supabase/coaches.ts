// Typed data-access layer for the coach directory.
// Public reads run under RLS as anon (only `approved` rows are returned);
// writes carry the logged-in user's JWT automatically via the supabase client.
import { supabase } from "./client";
import type { Tables, TablesInsert, TablesUpdate } from "./types";

export type CoachProfile = Tables<"coach_profiles">;

/** A coach row with its joined service slugs (PostgREST embedded resource). */
export type CoachWithServices = CoachProfile & {
  coach_services: { service_slug: string }[];
};

const COACH_SELECT = "*, coach_services(service_slug)";
const PHOTO_BUCKET = "coach-photos";

/** Approved coaches for the public directory, newest first. */
export async function listApprovedCoaches(): Promise<CoachWithServices[]> {
  const { data, error } = await supabase
    .from("coach_profiles")
    .select(COACH_SELECT)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as CoachWithServices[];
}

/** A single approved coach by id, or null if none / not approved. */
export async function getApprovedCoach(id: string): Promise<CoachWithServices | null> {
  const { data, error } = await supabase
    .from("coach_profiles")
    .select(COACH_SELECT)
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();

  if (error) throw error;
  return (data as unknown as CoachWithServices) ?? null;
}

/** The logged-in coach's own profile (any status), or null if not created yet. */
export async function getOwnProfile(userId: string): Promise<CoachWithServices | null> {
  const { data, error } = await supabase
    .from("coach_profiles")
    .select(COACH_SELECT)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return (data as unknown as CoachWithServices) ?? null;
}

/**
 * Insert a new profile. Never pass `status` — the column defaults to `pending`
 * and the RLS WITH CHECK requires exactly that. Returns the new row id.
 */
export async function createCoachProfile(
  input: Omit<TablesInsert<"coach_profiles">, "status">,
): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("coach_profiles")
    .insert(input)
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

/**
 * Patch the owner's profile. Never pass `status` — a BEFORE UPDATE trigger
 * reverts status changes made by non-admins.
 */
export async function updateCoachProfile(
  userId: string,
  patch: Omit<TablesUpdate<"coach_profiles">, "status" | "user_id" | "id">,
): Promise<void> {
  const { error } = await supabase
    .from("coach_profiles")
    .update(patch)
    .eq("user_id", userId);

  if (error) throw error;
}

/**
 * Reconcile a coach's service rows to exactly `slugs` (idempotent): delete the
 * ones removed, insert the ones added. Works for both create and edit.
 */
export async function setCoachServices(coachId: string, slugs: string[]): Promise<void> {
  const { data: current, error: readError } = await supabase
    .from("coach_services")
    .select("service_slug")
    .eq("coach_id", coachId);

  if (readError) throw readError;

  const existing = new Set((current ?? []).map((r) => r.service_slug));
  const wanted = new Set(slugs);

  const toRemove = [...existing].filter((s) => !wanted.has(s));
  const toAdd = [...wanted].filter((s) => !existing.has(s));

  if (toRemove.length) {
    const { error } = await supabase
      .from("coach_services")
      .delete()
      .eq("coach_id", coachId)
      .in("service_slug", toRemove);
    if (error) throw error;
  }

  if (toAdd.length) {
    const rows: TablesInsert<"coach_services">[] = toAdd.map((service_slug) => ({
      coach_id: coachId,
      service_slug,
    }));
    const { error } = await supabase.from("coach_services").insert(rows);
    if (error) throw error;
  }
}

/**
 * Upload a profile photo into the owner's folder and return its storage path.
 * The path is prefixed with `${userId}/` so the storage RLS policy (which keys
 * on `(storage.foldername(name))[1] = auth.uid()`) permits the write.
 */
export async function uploadCoachPhoto(userId: string, file: File): Promise<string> {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `${userId}/${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw error;
  return path;
}

/** Public URL for a stored photo path, or "" when there is no photo. */
export function coachPhotoUrl(path: string): string {
  if (!path) return "";
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}
