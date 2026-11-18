"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ExamsPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", exam_type: "", class_id: "", academic_year: "2026-27", start_date: "", end_date: "" });
  async function load() {
    const [{ data: e }, { data: c }] = await Promise.all([supabase.from("exams").select("id,name,exam_type,academic_year,start_date,end_date,status,classes(name)").order("start_date", { ascending: false }), supabase.from("classes").select("id,name").order("name")]);
    setExams(e ?? []); setClasses(c ?? []);
  }
  useEffect(() => { load(); }, []);
  async function create(e: React.FormEvent) { e.preventDefault(); const { error } = await supabase.from("exams").insert(form); if (error) alert(error.message); else { setForm({ ...form, name: "", exam_type: "" }); load() } }
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container">
      <h1 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">{L("परीक्षाएं", "Examinations")}</h1>
      <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("यूनिट टेस्ट, साइकिल टेस्ट, मिड-टर्म, प्री-बोर्ड या कोई भी कस्टम पैटर्न configurable करें।", "Create configurable Unit Tests, Cycle Tests, Mid-Terms, Pre-Boards or any custom pattern.")}</p>
      <form onSubmit={create} className="mt-[var(--space-md)] grid gap-[var(--space-sm)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] md:grid-cols-3 shadow-[var(--shadow-card)]">
        <input required className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" placeholder={L("परीक्षा का नाम", "Exam name")} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" placeholder={L("परीक्षा प्रकार", "Exam type")} value={form.exam_type} onChange={e => setForm({ ...form, exam_type: e.target.value })} />
        <select required className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={form.class_id} onChange={e => setForm({ ...form, class_id: e.target.value })}><option value="">{L("कक्षा चुनें", "Select class")}</option>{classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <input className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
        <input className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} />
        <button className="rounded-[var(--radius-card)] bg-[var(--color-ink)] p-[var(--space-md)] font-[var(--font-body)] font-600 text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition">{L("परीक्षा बनाएं", "Create examination")}</button>
      </form>
      <div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] md:grid-cols-2">{exams.map(e => (
        <div key={e.id} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><div className="flex justify-between gap-[var(--space-sm)]"><div><h2 className="font-bold text-[var(--color-ink)]">{e.name}</h2><p className="text-[var(--text-xs)] text-[var(--color-muted)]">{e.classes?.name} · {e.exam_type}</p></div><span className="rounded-[var(--radius-pill)] bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[0.5px] text-[10px] font-bold text-[var(--color-muted)]">{e.status}</span></div><div className="mt-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-muted)]">{e.start_date ?? "Date not set"}{e.end_date ? ` → ${e.end_date}` : ""}</div></div>
      ))}</div></div></div>
  );
}
