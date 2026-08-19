import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type CoachSession = {
  session: Session | null;
  user: User | null;
  /** True until the initial session lookup resolves. */
  loading: boolean;
};

/**
 * Client-side auth gate for the `/coach/*` routes. Reads the current Supabase
 * session from localStorage and stays in sync via `onAuthStateChange`.
 * Only meaningful in the browser (these routes are `ssr:false`).
 */
export function useCoachSession(): CoachSession {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Register the listener first so no auth event is missed, then hydrate.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}
