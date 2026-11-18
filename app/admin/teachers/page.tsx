import { createServerSupabase } from "@/lib/supabase/server";
import TeachersDirectory from "@/components/teachers/TeachersDirectory";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default async function TeachersPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("teachers").select("*").order("hierarchy_level", { ascending: true });
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container"><TeachersDirectory teachers={data ?? []} /></div></div>
  );
}
