"use client";
import Link from "next/link";
import { CalendarCheck, ClipboardEdit, FilePlus2, Upload } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TeacherHome() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container"><p className="text-[var(--text-sm)] font-medium text-[var(--color-muted)]">{L("शिक्षक कार्यक्षेत्र", "Teacher workspace")}</p><h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">Your classroom at a glance</h1><div className="mt-[var(--space-lg)] grid gap-[var(--space-sm)] md:grid-cols-2 xl:grid-cols-4">{[
    ["/teacher/attendance", L("उपस्थिति लें", "Take attendance"), CalendarCheck],
    ["/teacher/marks", L("अंक दर्ज करें", "Enter marks"), ClipboardEdit],
    ["/teacher/assignments", L("असाइनमेंट बनाएं", "Create assignment"), FilePlus2],
    ["/teacher/resources", L("संसाधन अपलोड करें", "Upload resource"), Upload]
  ].map(([href, label, Icon]: any) => (
    <Link key={href} href={href} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)] hover:border-[var(--color-accent-2)] transition"><Icon size={22} className="text-[var(--color-accent-2)]" /><div className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{label}</div><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("मॉड्यूल खोलें", "Open module")}</p></Link>
  ))}</div></div></div>
  );
}
