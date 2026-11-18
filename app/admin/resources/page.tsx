import { createServerSupabase } from "@/lib/supabase/server";
import ResourceExplorer from "@/components/resources/ResourceExplorer";
import { INITIAL_RESOURCES } from "@/lib/local-db/initial-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default async function ResourcesPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("resources").select("*").order("grade_level", { ascending: false });
  const resources = data && data.length > 0 ? data : INITIAL_RESOURCES;
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container"><ResourceExplorer initialResources={resources} /></div></div>
  );
}
