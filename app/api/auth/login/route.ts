import { NextRequest, NextResponse } from "next/server";
import { getLocalDb } from "@/lib/local-db/server-db";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // If real Supabase is configured, use Supabase authentication
    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalized,
        password: password || ""
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      return NextResponse.json({ user: data.user, session: data.session });
    }

    // Local Database mode
    const db = getLocalDb();
    const profiles = db.profiles || [];
    const profile = profiles.find((p: any) => p.email.toLowerCase() === normalized);

    if (!profile) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    // For working dummy purposes in local database mode, verify password if provided, or accept dummy password
    if (password && profile.password && password !== profile.password) {
      // If user typed something else, check if it's the role's demo password or accept if in development
      const demoPasswords = ["Admin@123", "Teacher@123", "Student@123", "Parent@123", "123456"];
      if (!demoPasswords.includes(password)) {
        return NextResponse.json({ error: "Invalid password for this account" }, { status: 401 });
      }
    }

    const sessionPayload = {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      full_name: profile.full_name
    };

    const response = NextResponse.json({
      success: true,
      profile: sessionPayload,
      redirectUrl: `/${profile.role}`
    });

    const cookieValue = encodeURIComponent(JSON.stringify(sessionPayload));

    response.cookies.set("edunexus_session", cookieValue, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      httpOnly: false
    });

    response.cookies.set("edunexus_mock_session", cookieValue, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Login failed" }, { status: 500 });
  }
}
