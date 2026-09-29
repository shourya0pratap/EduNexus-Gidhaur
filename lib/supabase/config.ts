/**
 * Configuration detection for Supabase vs Local Database mode.
 * EduNexus operates in Local Database mode when remote Supabase credentials
 * are not provided in environment variables, allowing instant local usage
 * while keeping the hosted Supabase integration ready for production.
 */

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;

  const trimmedUrl = url.trim();
  const trimmedKey = key.trim();

  if (trimmedUrl.length === 0 || trimmedKey.length === 0) return false;
  if (trimmedUrl.includes("placeholder") || trimmedKey.includes("placeholder")) return false;
  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) return false;

  return true;
}
