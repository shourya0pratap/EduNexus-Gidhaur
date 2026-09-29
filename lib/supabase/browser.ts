import { createBrowserClient as createClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createMockSupabaseClient } from "@/lib/mock/client";

export function createBrowserClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabaseClient() as any;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
