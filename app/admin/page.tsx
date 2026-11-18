"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { Users, GraduationCap, CalendarCheck, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AdminPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [stats, setStats] = useState<any>({});
  const [exams, setExams] = useState<any[]>([]);
  
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const today = new Date().toISOString().slice(0, 10);
    const [
      { count: students },
      { count: teachers },
      { data: sessions },
      { data: examsData }
    ] = await Promise.all([
      supabase.from("students").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("teachers").select("*", { count: "exact", head: true }),
      supabase.from("attendance_sessions").select("id, attendance(status)").eq("attendance_date", today).limit(20),
      supabase.from("exams").select("id,name,exam_type,status,start_date,classes(name)").order("start_date", { ascending: true }).limit(5)
    ]);

    const attendanceRows = sessions?.flatMap((s: any) => s.attendance ?? []) ?? [];
    const attendancePct = attendanceRows.length
      ? Math.round(attendanceRows.filter((x: any) => x.status !== "absent").length / attendanceRows.length * 100)
      : 0;

    setStats({ students, teachers, attendancePct });
    setExams(examsData ?? []);
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">
      <div className="container">
        <div className="mb-[var(--space-2xl)]">
          <p className="text-[var(--text-sm)] font-medium text-[var(--color-muted)]">{L("स्कूल प्रशासन", "School administration")}</p>
          <h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">Good morning, Admin</h1>
          <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("आज के शैक्षणिक संचालन का लाइव अवलोकन।", "A live overview of today's academic operations.")}</p>
        </div>

        <div className="grid gap-[var(--space-sm)] sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label={L("कुल छात्र", "Total Students")} value={stats.students ?? 0} icon={Users} helper={L("नामांकित छात्र", "Based on recorded sessions")} />
          <StatCard label={L("कुल शिक्षक", "Total Teachers")} value={stats.teachers ?? 0} icon={GraduationCap} helper={L("संकाय सदस्य", "")} />
          <StatCard label={L("आज उपस्थिति", "Attendance Today")} value={`${stats.attendancePct ?? 0}%`} icon={CalendarCheck} helper={L("रिकॉर्ड किए गए सत्रों के आधार पर", "Based on recorded sessions")} />
          <StatCard label={L("आगामी परीक्षाएं", "Upcoming Exams")} value={exams?.length ?? 0} icon={ClipboardList} helper={L("अगली निर्धारित आकलन", "The next scheduled assessments")} />
        </div>

        <div className="mt-[var(--space-lg)] grid gap-[var(--space-md)] xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between"><div><h2 className="font-bold text-[var(--color-ink)]">{L("आगामी परीक्षाएं", "Upcoming examinations")}</h2><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("अगली निर्धारित आकलन।", "The next scheduled assessments.")}</p></div><Link href="/admin/exams" className="text-[var(--text-xs)] font-bold text-[var(--color-accent-2)] hover:underline">{L("सभी देखें", "View all")}</Link></div>
            <div className="mt-[var(--space-md)] divide-y divide-[var(--color-rule)]">{exams?.length ? exams.map((exam: any) => (
              <div key={exam.id} className="flex items-center justify-between py-[var(--space-sm)]"><div><p className="font-semibold text-[var(--color-ink)]">{exam.name}</p><p className="text-[var(--text-xs)] text-[var(--color-muted)]">{exam.classes?.name ?? "Class"} · {exam.exam_type}</p></div><span className="rounded-[var(--radius-pill)] bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[0.5px] text-[10px] font-bold text-[var(--color-muted)]">{exam.status}</span></div>
            )) : <p className="py-[var(--space-2xl)] text-center text-[var(--text-xs)] text-[var(--color-muted)]">{L("कोई आगामी परीक्षा नहीं।", "No upcoming exams.")}</p>}</div>
          </section>
          <section className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
            <h2 className="font-bold text-[var(--color-ink)]">{L("त्वरित क्रियाएं", "Quick actions")}</h2>
            <div className="mt-[var(--space-md)] grid gap-[var(--space-xs)]">{[
              ["/admin/students", L("छात्र जोड़ें / प्रबंधित करें", "Add / manage students")],
              ["/admin/exams", L("परीक्षा कॉन्फ़िगर करें", "Configure an examination")],
              ["/admin/attendance", L("उपस्थिति समीक्षा करें", "Review attendance")],
              ["/admin/resources", L("अध्ययन संसाधन प्रबंधित करें", "Manage study resources")]
            ].map(([href, label]) => (
              <Link key={href} href={href} className="flex items-center justify-between rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-md)] hover:bg-[var(--color-paper-2)]"><span className="text-[var(--text-xs)] font-bold text-[var(--color-ink)]">{label}</span><ArrowRight size={17} className="text-[var(--color-muted)]" /></Link>
            ))}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
