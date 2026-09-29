import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createLocalServerSupabaseClient } from "@/lib/local-db/server-db";

export async function createServerSupabase() {
  const cookieStore = await cookies();

  // If Supabase environment credentials are not present, seamlessly use the local database engine
  if (!isSupabaseConfigured()) {
    let activeUserId: string | undefined;
    const sessionCookie = cookieStore.get("edunexus_session") || cookieStore.get("edunexus_mock_session");
    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(decodeURIComponent(sessionCookie.value));
        activeUserId = parsed.id;
      } catch {
        // ignore
      }
    }
    return createLocalServerSupabaseClient(activeUserId) as any;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server components cannot always mutate cookies.
          }
        }
      }
    }
  );
}
