CREATE TYPE public.app_role AS ENUM ('admin', 'coach', 'user');
CREATE TYPE public.coach_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.coach_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  city text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  public_email text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  years_experience integer NOT NULL DEFAULT 0,
  certifications text NOT NULL DEFAULT '',
  availability text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  photo_path text NOT NULL DEFAULT '',
  status public.coach_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coach_profiles TO authenticated;
GRANT SELECT ON public.coach_profiles TO anon;
GRANT ALL ON public.coach_profiles TO service_role;
ALTER TABLE public.coach_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved coaches are publicly visible" ON public.coach_profiles
  FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Coaches can read their own profile" ON public.coach_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Coaches can create their own profile" ON public.coach_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Coaches can update their own profile" ON public.coach_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Coaches can delete their own profile" ON public.coach_profiles
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all coach profiles" ON public.coach_profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all coach profiles" ON public.coach_profiles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.coach_status_guard()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status <> OLD.status AND NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.status := OLD.status;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER coach_profiles_guard BEFORE UPDATE ON public.coach_profiles
  FOR EACH ROW EXECUTE FUNCTION public.coach_status_guard();

CREATE TABLE public.coach_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id uuid NOT NULL REFERENCES public.coach_profiles(id) ON DELETE CASCADE,
  service_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (coach_id, service_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coach_services TO authenticated;
GRANT SELECT ON public.coach_services TO anon;
GRANT ALL ON public.coach_services TO service_role;
ALTER TABLE public.coach_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services of approved coaches are public" ON public.coach_services
  FOR SELECT TO anon, authenticated USING (EXISTS (
    SELECT 1 FROM public.coach_profiles p WHERE p.id = coach_id AND p.status = 'approved'));
CREATE POLICY "Coaches can read their own services" ON public.coach_services
  FOR SELECT TO authenticated USING (EXISTS (
    SELECT 1 FROM public.coach_profiles p WHERE p.id = coach_id AND p.user_id = auth.uid()));
CREATE POLICY "Coaches can add their own services" ON public.coach_services
  FOR INSERT TO authenticated WITH CHECK (EXISTS (
    SELECT 1 FROM public.coach_profiles p WHERE p.id = coach_id AND p.user_id = auth.uid()));
CREATE POLICY "Coaches can remove their own services" ON public.coach_services
  FOR DELETE TO authenticated USING (EXISTS (
    SELECT 1 FROM public.coach_profiles p WHERE p.id = coach_id AND p.user_id = auth.uid()));

CREATE POLICY "Coach photos are readable" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'coach-photos');
CREATE POLICY "Coaches can upload their own photo" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'coach-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Coaches can update their own photo" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'coach-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Coaches can delete their own photo" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'coach-photos' AND (storage.foldername(name))[1] = auth.uid()::text);