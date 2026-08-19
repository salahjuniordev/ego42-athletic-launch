-- 1. Lock down SECURITY DEFINER helpers from direct API execution
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.coach_status_guard() FROM anon, authenticated, public;

-- 2. Column-level restriction of coach contact details for anonymous visitors
REVOKE SELECT ON public.coach_profiles FROM anon;
GRANT SELECT (
  id, user_id, full_name, city, bio, years_experience, certifications,
  availability, instagram, website, photo_path, status, created_at, updated_at
) ON public.coach_profiles TO anon;
