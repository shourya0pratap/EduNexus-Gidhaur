import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabase();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("edunexus_session", "", {
    path: "/",
    maxAge: 0
  });

  response.cookies.set("edunexus_mock_session", "", {
    path: "/",
    maxAge: 0
  });

  return response;
}
