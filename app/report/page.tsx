"use client";

import { useState } from "react";
import Link from "next/link";
import {
  School, Search, ArrowLeft, Printer, Share2, FileText, Check, ShieldCheck,
  BookOpen, BellRing, RefreshCw, CheckCircle2, Sparkles
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const sampleRolls = [
  { roll: "1001", name: "Aarav Kumar", grade: "कक्षा 10-A (Rank 1)", grade_en: "Class 10-A (Rank 1)", badge: "मैट्रिक बोर्ड" },
  { roll: "1002", name: "Priya Kumari", grade: "कक्षा 10-A (Rank 2)", grade_en: "Class 10-A (Rank 2)", badge: "मैट्रिक बोर्ड" },
  { roll: "0901", name: "Md. Tariq Anwar", grade: "कक्षा 9-A", grade_en: "Class 9-A", badge: "कक्षा 9" },
  { roll: "0801", name: "Aditya Prakash", grade: "कक्षा 8-A", grade_en: "Class 8-A", badge: "कक्षा 8" },
  { roll: "0501", name: "Suman Kumari", grade: "कक्षा 5-A", grade_en: "Class 5-A", badge: "कक्षा 5" },
  { roll: "0101", name: "Deepali Kumari", grade: "कक्षा 1-A", grade_en: "Class 1-A", badge: "कक्षा 1" }
];

export default function PublicReportPage() {
  const { lang } = useLanguage();
  const [roll, setRoll] = useState("");
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);

  async function handleLookup(rollToSearch?: string) {
    const queryRoll = (rollToSearch || roll).trim();
    if (!queryRoll) { setError(L("कृपया विद्यालय द्वारा दिया गया 4-अंकीय रोल नंबर दर्ज करें।", "Please enter the 4-digit roll number given by the school.")); return; }
    setBusy(true); setError(""); setReport(null);
    try {
      const res = await fetch("/api/report/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roll_number: queryRoll }) });
      const data = await res.json(); setBusy(false);
      if (!res.ok) { setError(data.error || "Student record could not be found for this roll number."); return; }
      setReport(data.student); setRoll(queryRoll);
    } catch { setBusy(false); setError("Network or lookup error occurred. Please check connection."); }
  }

  function printReportCard() { window.print(); }
  function copyVerificationLink() { if (typeof window !== "undefined") { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } }

  // Build subject rows as a separate variable to keep JSX simple
  const subjectRows = report ? report.subjects.map((sub: any) => {
    const gradeClass = sub.grade.startsWith("A") ? "bg-[var(--color-success)] text-[var(--color-accent-ink)]" : "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)]";
    return (
    <tr key={sub.subject_code} className="hover:bg-[var(--color-paper-2)]/50 transition">
      <td className="py-[var(--space-sm)] px-[var(--space-sm)] font-bold text-[var(--color-ink)]">{sub.subject_name}</td>
      <td className="py-[var(--space-sm)] px-[var(--space-xs)] text-center font-[var(--font-outlier)] text-[var(--color-ink-2)]">{sub.theory_obtained}</td>
      <td className="py-[var(--space-sm)] px-[var(--space-xs)] text-center font-[var(--font-outlier)] text-[var(--color-ink-2)]">{sub.practical_obtained}</td>
      <td className="py-[var(--space-sm)] px-[var(--space-xs)] text-center font-[var(--font-outlier)] text-[var(--color-muted)]">{sub.total_max}</td>
      <td className="py-[var(--space-sm)] px-[var(--space-xs)] text-center font-[var(--font-outlier)] font-bold text-sm text-[var(--color-ink)]">{sub.total_obtained}</td>
      <td className="py-[var(--space-sm)] px-[var(--space-xs)] text-center">
        <span className={`inline-block font-extrabold px-[var(--space-xs)] py-[0.5px] rounded text-[11px] ${gradeClass}`}>{sub.grade}</span>
      </td>
      <td className="py-[var(--space-sm)] px-[var(--space-sm)] text-right font-medium text-[var(--color-muted)]">{sub.status}</td>
    </tr>
    );
  }) : null;

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased px-4 py-[var(--space-3xl)]">
      <div className="container">
        <div className="flex items-center justify-between mb-[var(--space-lg)]">
          <Link href="/" className="nav-pill wordmark" aria-label="Home"><ArrowLeft size={14} /><span>{L("मुख्य पृष्ठ पर लौटें", "Back to Home")}</span></Link>
          <div className="flex items-center gap-2">
            <Link href="/announcements" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]"><BellRing size={13} className="text-[var(--color-accent)]" /><span>{L("सूचना पट", "Notice Board")}</span></Link>
            <LanguageSwitcher />
          </div>
        </div>

        <section className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
          <h1 className="mt-[var(--space-sm)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] text-[var(--color-ink)] tracking-[var(--tracking-display)] leading-[1.05]">{L("सार्वजनिक अंकतालिका एवं परीक्षा परिणाम", "Official Examination Report Card Portal")}</h1>
          <p className="lead text-[var(--color-ink-2)] mt-[var(--space-xs)]">{lang === "hi" ? "विद्यालय द्वारा प्रदत्त छात्र के रोल नंबर (Roll No) द्वारा आधिकारिक परीक्षा अंकतालिका देखें एवं डाउनलोड करें।" : "Access and print student academic report cards using only the school-issued 4-digit Roll Number."}</p>

          <div className="mt-[var(--space-md)] rounded-xl bg-[var(--color-paper-2)] border border-[var(--color-rule)] p-[var(--space-sm)]">
            <div className="flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-deep)] mb-[var(--space-xs)]"><Sparkles size={14} className="text-[var(--color-accent)]" /><span>{L("त्वरित परीक्षण रोल नंबर (1-क्लिक खोज):", "Sample Student Roll Numbers (1-Click):")}</span></div>
            <div className="flex flex-wrap gap-[var(--space-xs)]">{sampleRolls.map((s) => (
              <button key={s.roll} type="button" onClick={() => { setRoll(s.roll); handleLookup(s.roll); }} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] active:scale-95 transition shadow-2xs"><span className="font-[var(--font-outlier)] font-bold text-[var(--color-accent-2)]">{s.roll}</span> · {s.name} ({lang === "hi" ? s.badge : s.grade_en})</button>
            ))}</div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }} className="mt-[var(--space-md)] flex flex-col sm:flex-row items-center gap-[var(--space-sm)]">
            <div className="relative w-full"><input id="school-roll-input" className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-sm)] text-base text-[var(--color-ink)] font-[var(--font-outlier)] font-bold tracking-wider outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" placeholder={lang === "hi" ? "विद्यालय रोल नंबर दर्ज करें (उदा. 1001, 1002, 0901, 0101)" : "Enter School Roll Number (e.g. 1001, 1002, 0901, 0101)"} value={roll} onChange={(e) => setRoll(e.target.value)} autoComplete="off" required /></div>
            <button disabled={busy} type="submit" className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-[var(--space-lg)] py-[var(--space-sm)] text-[var(--text-md)] font-[var(--font-body)] font-600 shadow-[var(--shadow-card)] hover:translate-y-[-1px] active:translate-y-[1px] active:bg-[var(--color-accent-deep)] transition disabled:opacity-55 disabled:cursor-not-allowed"><Search size={16} /><span>{busy ? (lang === "hi" ? "अंकतालिका लोड हो रही है..." : "Loading Marksheet...") : (lang === "hi" ? "अंकतालिका खोलें" : "Open Report Card")}</span></button>
          </form>
          {error && <div className="mt-[var(--space-sm)] flex items-start gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-paper-3)] p-[var(--space-sm)] text-[var(--text-xs)] font-semibold text-[var(--color-danger)] border border-[var(--color-danger)]"><span>{error}</span></div>}
        </section>

        {report && (
          <div className="mt-[var(--space-2xl)] space-y-[var(--space-lg)]">
            <div className="print:hidden flex flex-wrap items-center justify-between gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-card)] border border-[var(--color-rule)] p-[var(--space-sm)] shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-success)] bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-success)]"><CheckCircle2 size={16} className="text-[var(--color-success)]" /><span>{L("प्रमाणित स्कूल रिकॉर्ड सत्यापित", "Official Record Verified")}</span></div>
              <div className="flex items-center gap-[var(--space-xs)]"><button onClick={copyVerificationLink} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition">{copied ? <Check size={14} className="text-[var(--color-success)]" /> : <Share2 size={14} />}<span>{copied ? "Link Copied" : "Share"}</span></button><button onClick={printReportCard} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] shadow-xs hover:bg-[var(--color-accent-deep)] active:scale-95 transition"><Printer size={15} /><span>{lang === "hi" ? "अंकतालिका प्रिंट / PDF डाउनलोड" : "Print / Download PDF"}</span></button></div>
            </div>
            <div id="printable-report-card" className="rounded-[var(--radius-card)] border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-[var(--space-lg)] sm:p-[var(--space-xl)] shadow-md text-[var(--color-ink)] print:shadow-none print:border-2 print:border-black print:p-[var(--space-lg)] print:m-0">
              <div className="text-center border-b border-[var(--color-ink)] pb-[var(--space-md)]">
                <div className="flex items-center justify-center gap-[var(--space-xs)] text-[var(--text-xs)] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)]"><span>Affiliation Code: BSEB-PAT-JAM-811305 · U-DISE: 10220304501</span></div>
                <h2 className="mt-[var(--space-xs)] text-2xl sm:text-3xl font-[var(--font-display)] font-[var(--display-weight)] text-[var(--color-ink)] tracking-[var(--tracking-display)]  text-left mx-auto max-w-[20ch]">Gidhaur Central School</h2>
                <p className="text-sm font-bold text-[var(--color-ink-2)] text-left mt-1">गिद्धौर सेन्ट्रल स्कूल, जमुई (बिहार) - 811305</p>
                <p className="mt-0.5 text-[var(--text-xs)] text-[var(--color-muted)] text-left">Affiliated to Bihar School Examination Board (BSEB, Patna) & Aligned with NCERT Curriculum</p>
                <div className="mt-[var(--space-sm)] inline-block rounded-md bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-extrabold  tracking-[var(--tracking-display)] text-[var(--color-card)]">Academic Progress Report Card · Session 2026-27</div>
              </div>
              <div className="mt-[var(--space-lg)] grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-sm)] bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-[var(--radius-card)] p-[var(--space-sm)] text-[var(--text-xs)]">
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Student Name</span><span className="font-extrabold text-sm text-[var(--color-ink)]">{report.full_name}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Roll Number</span><span className="font-[var(--font-outlier)] font-black text-sm text-[var(--color-accent-2)]">{report.roll_number}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Class & Section</span><span className="font-extrabold text-sm text-[var(--color-ink)]">{report.class_name} · {report.section_name}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Admission No.</span><span className="font-[var(--font-outlier)] font-bold text-sm text-[var(--color-ink-2)]">{report.admission_number}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Father / Guardian</span><span className="font-bold text-sm text-[var(--color-ink-2)]">{report.parent_name}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Mother’s Name</span><span className="font-bold text-sm text-[var(--color-ink-2)]">{report.mother_name}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Date of Birth</span><span className="font-bold text-sm text-[var(--color-ink-2)]">{report.date_of_birth}</span></div>
                <div><span className="text-[11px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)] block">Town / Village</span><span className="font-bold text-sm text-[var(--color-ink-2)] truncate block">{report.village_or_town}</span></div>
              </div>
              <div className="mt-[var(--space-lg)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)]"><table className="w-full text-left text-[var(--text-xs)]"><thead className="bg-[var(--color-ink)] text-white font-bold  tracking-[var(--tracking-display)] text-[11px]"><tr><th className="py-[var(--space-sm)] px-[var(--space-sm)]">Subject / विषय</th><th className="py-[var(--space-sm)] px-[var(--space-xs)] text-center">Theory (80)</th><th className="py-[var(--space-sm)] px-[var(--space-xs)] text-center">Practical (20)</th><th className="py-[var(--space-sm)] px-[var(--space-xs)] text-center">Max Marks</th><th className="py-[var(--space-sm)] px-[var(--space-xs)] text-center">Marks Obtained</th><th className="py-[var(--space-sm)] px-[var(--space-sm)] text-center">Grade</th><th className="py-[var(--space-sm)] px-[var(--space-sm)] text-right">Remarks</th></tr></thead>{subjectRows}</table></div>
              <div className="mt-[var(--space-lg)] grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-sm)] text-center">
                <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]"><p className="text-[10px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)]">Aggregate Percentage</p><p className="mt-[var(--space-xs)] text-2xl font-black text-[var(--color-accent-2)] font-[var(--font-outlier)]">{report.overall_percentage}%</p><p className="text-[10px] text-[var(--color-muted)] mt-[var(--space-xs)]">{report.overall_division}</p></div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]"><p className="text-[10px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)]">Section Rank</p><p className="mt-[var(--space-xs)] text-2xl font-black text-[var(--color-accent)] font-[var(--font-outlier)]">#{report.class_rank} <span className="text-[var(--text-xs)] text-[var(--color-muted)] font-normal">/ {report.total_students_in_section}</span></p><p className="text-[10px] text-[var(--color-muted)] mt-[var(--space-xs)]">{report.section_name}</p></div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]"><p className="text-[10px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)]">Attendance Rate</p><p className="mt-[var(--space-xs)] text-2xl font-black text-[var(--color-success)] font-[var(--font-outlier)]">{report.attendance_percentage}%</p><p className="text-[10px] text-[var(--color-muted)] mt-[var(--space-xs)]">{report.days_present} / {report.total_working_days} Days</p></div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]"><p className="text-[10px] font-bold  tracking-[var(--tracking-display)] text-[var(--color-muted)]">Result Status</p><p className="mt-[var(--space-xs)] text-lg font-bold text-[var(--color-success)]">Passed</p><p className="text-[10px] text-[var(--color-muted)] mt-[var(--space-xs)]">BSEB Compliant</p></div>
              </div>
              <div className="mt-[var(--space-lg)] rounded-[var(--radius-card)] bg-[var(--color-paper-2)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-ink-2)]"><span className="font-bold text-[var(--color-ink)] block mb-[var(--space-xs)]">Teacher & Institutional Remarks:</span><p className="italic leading-relaxed">{report.teacher_remarks}</p></div>
              <div className="mt-[var(--space-2xl)] pt-[var(--space-lg)] border-t border-[var(--color-rule)] grid grid-cols-3 gap-[var(--space-sm)] text-center text-[var(--text-xs)]">
                <div><div className="h-[var(--space-xl)] border-b border-[var(--color-ink)] mx-auto w-32 mb-[var(--space-xs)] flex items-end justify-center pb-[var(--space-xs)] font-serif italic text-[var(--color-muted)]">Sunita Verma</div><span className="font-bold text-[var(--color-ink)] block">Class Teacher</span><span className="text-[10px] text-[var(--color-muted)]">Section In-Charge</span></div>
                <div><div className="h-[var(--space-xl)] border-b border-[var(--color-ink)] mx-auto w-32 mb-[var(--space-xs)] flex items-end justify-center pb-[var(--space-xs)] font-serif italic text-[var(--color-muted)]">Dr. R. P. Singh</div><span className="font-bold text-[var(--color-ink)] block">Examination Controller</span><span className="text-[10px] text-[var(--color-muted)]">1st Class Coordinator</span></div>
                <div><div className="h-[var(--space-xl)] border-b border-[var(--color-ink)] mx-auto w-32 mb-[var(--space-xs)] flex items-end justify-center pb-[var(--space-xs)] font-serif italic text-[var(--color-muted)] font-bold">Dr. Arvind Pathak</div><span className="font-bold text-[var(--color-ink)] block">Principal</span><span className="text-[10px] text-[var(--color-muted)]">Gidhaur Central School</span></div>
              </div>
              <div className="mt-[var(--space-lg)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--color-muted)]"><span>Security Verification Hash: {report.verification_code}</span><span>Date of Issue: {report.issue_date} · Official Institutional Marksheet</span></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
