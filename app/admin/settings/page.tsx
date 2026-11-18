"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SettingsPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [id, setId] = useState("");
  const [form, setForm] = useState<any>({});
  useEffect(() => { supabase.from("school_settings").select("*").limit(1).single().then(({ data }: any) => { if (data) { setId(data.id); setForm(data) } }); }, []);
  async function save() { const { error } = await supabase.from("school_settings").update(form).eq("id", id); if (error) alert(error.message); else alert(L("स्कूल सेटिंग्स सेव हो गईं।", "School settings saved.")); }
  const fields = [["school_name", L("स्कूल का नाम", "School name")], ["address", L("पता", "Address")], ["phone", L("फोन", "Phone")], ["email", L("ईमेल", "Email")], ["website", L("वेबसाइट", "Website")], ["principal_name", L("प्रधानाचार्य का नाम", "Principal name")], ["attendance_threshold", L("उपस्थिति सीमा", "Attendance threshold")]];
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container max-w-3xl">
      <h1 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">{L("स्कूल सेटिंग्स", "School settings")}</h1>
      <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("ब्रांडिंग और संचालन डिफ़ॉल्ट जो पूरे प्लेटफॉर्म में उपयोग किए जाते हैं।", "Branding and operational defaults used throughout the platform.")}</p>
      <div className="mt-[var(--space-md)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">{fields.map(([k, l]) => (
        <label key={k} className="mt-[var(--space-md)] block text-[var(--text-sm)] font-semibold text-[var(--color-ink-2)] first:mt-0">{l}<input className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={form[k] ?? ""} onChange={e => setForm({ ...form, [k]: k === "attendance_threshold" ? Number(e.target.value) : e.target.value })} /></label>
      ))}<button onClick={save} className="mt-[var(--space-md)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] font-[var(--font-body)] font-600 text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition">{L("सेटिंग्स सेव करें", "Save settings")}</button></div></div></div>
  );
}
