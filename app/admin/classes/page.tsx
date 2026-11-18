"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ClassesPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [classes, setClasses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("2026-27");
  async function load() { const { data } = await supabase.from("classes").select("id,name,academic_year,sections(id,name)").order("name"); setClasses(data ?? []) }
  useEffect(() => { load(); }, []);
  async function add() { if (!name) return; const { error } = await supabase.from("classes").insert({ name, academic_year: year }); if (error) alert(error.message); else { setName(""); load() } }
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container">
      <h1 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">{L("कक्षाएं और अनुभाग", "Classes & sections")}</h1>
      <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("नामांकन, परीक्षा और उपस्थिति में उपयोग की जाने वाली शैक्षणिक संरचना बनाए रखें।", "Maintain academic structure used by enrolment, exams and attendance.")}</p>
      <div className="mt-[var(--space-md)] flex gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]">
        <input className="flex-1 rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" placeholder={L("कक्षा का नाम उदा. 10-A", "Class name e.g. 10-A")} value={name} onChange={e => setName(e.target.value)} />
        <input className="w-32 rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={year} onChange={e => setYear(e.target.value)} />
        <button onClick={add} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-[var(--space-md)] font-[var(--font-body)] font-600 shadow-[var(--shadow-card)] hover:translate-y-[-1px] active:translate-y-[1px] transition"><Plus size={18} /><span>{L("जोड़ें", "Add")}</span></button>
      </div>
      <div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-3">{classes.map(c => (
        <div key={c.id} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><div className="font-bold text-[var(--color-ink)]">{c.name}</div><div className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{c.academic_year}</div><div className="mt-[var(--space-sm)] text-[var(--text-xs)] font-semibold  text-[var(--color-muted)]">{c.sections?.length ?? 0} sections</div></div>
      ))}</div></div></div>
  );
}
