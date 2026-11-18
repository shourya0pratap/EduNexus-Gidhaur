"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import { FileText, Users } from "lucide-react";

export default function ParentPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: p } = await supabase.from("parents").select("id,full_name").eq("profile_id", user?.id ?? "").single();
    const { data: links } = p ? await supabase.from("parent_students").select("students(id,full_name,roll_number)").eq("parent_id", p.id) : { data: [] };
    setData({ p, links, user });
  }

  const p = data.p;
  const links = data.links;
  const user = data.user;

  if (!p) return <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">Loading…</div>;

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">
      <div className="container">
        <p className="text-[var(--text-xs)] text-[var(--color-muted)]">{L("अभिभावक डैशबोर्ड", "Parent dashboard")}</p>
        <h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">Welcome, {p?.full_name ?? "Parent"}</h1>
        <div className="mt-[var(--space-lg)] grid gap-[var(--space-sm)] md:grid-cols-2">
          {(links ?? []).map((x: any) => (
            <div key={x.students.id} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
              <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-ink)]">{x.students.full_name}</h2>
              <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("रोल नंबर", "Roll number")}: {x.students.roll_number}</p>
              <Link href="/report" className="mt-[var(--space-md)] inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-[var(--font-body)] font-600 text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition"><FileText size={14} /> {L("अंकतालिका डाउनलोड करें", "Download report card")}</Link>
            </div>
          ))}
          {(links?.length ?? 0) === 0 && <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-2xl)] text-center shadow-[var(--shadow-card)]"><Users size={36} className="mx-auto text-[var(--color-muted)]" /><h3 className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{L("कोई छात्र नहीं मिला", "No students found")}</h3><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("कृपया खोज शब्द या स्तर फ़िल्टर बदलकर पुनः प्रयास करें।", "Try adjusting your search criteria.")}</p></div>}
        </div>
      </div>
    </main>
  );
}
