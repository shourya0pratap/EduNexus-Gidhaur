import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalDb } from "@/lib/local-db/server-db";

export type Role = "admin" | "teacher" | "student" | "parent";

export async function getCurrentProfile() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("id, email, role, full_name")
        .eq("id", user.id)
        .single();

      return data;
    } catch (err) {
      console.error("Supabase auth check error:", err);
      return null;
    }
  }

  // Local database mode: check cookie session
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("edunexus_session") || cookieStore.get("edunexus_mock_session");

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const parsed = JSON.parse(decodeURIComponent(sessionCookie.value));
    const db = getLocalDb();
    const profiles = db.profiles || [];
    const profile = profiles.find((p: any) => p.id === parsed.id || p.email === parsed.email);

    if (profile) {
      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        full_name: profile.full_name
      };
    }

    return parsed;
  } catch (err) {
    console.error("Local session cookie parse error:", err);
    return null;
  }
}

export async function requireRole(role: Role) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== role) {
    redirect(`/${profile.role}`);
  }
  return profile as { id: string; email: string | null; role: Role; full_name: string };
}
