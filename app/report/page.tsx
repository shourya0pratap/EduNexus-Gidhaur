"use client";

import { useState } from "react";
import Link from "next/link";
import {
  School, Search, ArrowLeft, CheckCircle2, AlertCircle, Sparkles,
  Printer, Share2, Award, Calendar, User, FileText, Check, ShieldCheck,
  BookOpen, BellRing, RefreshCw
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PublicReportPage() {
  const { lang, t } = useLanguage();
  const [roll, setRoll] = useState("");
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quick 1-click test roll numbers across different classes
  const sampleRolls = [
    { roll: "1001", name: "Aarav Kumar", grade: "Class 10-A (Rank 1)", badge: "Matric Board" },
    { roll: "1002", name: "Priya Kumari", grade: "Class 10-A (Rank 2)", badge: "Matric Board" },
    { roll: "0901", name: "Md. Tariq Anwar", grade: "Class 9-A", badge: "Class 9" },
    { roll: "0801", name: "Aditya Prakash", grade: "Class 8-A", badge: "Class 8" },
    { roll: "0501", name: "Suman Kumari", grade: "Class 5-A", badge: "Class 5" },
    { roll: "0101", name: "Deepali Kumari", grade: "Class 1-A", badge: "Class 1" }
  ];

  async function handleLookup(rollToSearch?: string) {
    const queryRoll = (rollToSearch || roll).trim();
    if (!queryRoll) {
      setError(lang === "hi" ? "कृपया विद्यालय द्वारा दिया गया 4-अंकीय रोल नंबर दर्ज करें।" : "Please enter the 4-digit roll number given by the school.");
      return;
    }

    setBusy(true);
    setError("");
    setReport(null);

    try {
      const res = await fetch("/api/report/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll_number: queryRoll })
      });
      const data = await res.json();
      setBusy(false);

      if (!res.ok) {
        setError(data.error || "Student record could not be found for this roll number.");
        return;
      }

      setReport(data.student);
      setRoll(queryRoll);
    } catch {
      setBusy(false);
      setError("Network or lookup error occurred. Please check connection.");
    }
  }

  function printReportCard() {
    window.print();
  }

  function copyVerificationLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100/70 px-3 py-6 sm:px-6 md:py-10 text-slate-900 antialiased font-sans">
      <div className="mx-auto max-w-4xl">
        {/* Navigation & Utilities (Hidden on Print) */}
        <div className="print:hidden flex items-center justify-between mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition"
          >
            <ArrowLeft size={16} />
            <span>{lang === "hi" ? "मुख्य पृष्ठ पर लौटें" : "Back to Home"}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/announcements"
              className="inline-flex items-center gap-1 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <BellRing size={13} className="text-amber-600" />
              <span>{lang === "hi" ? "सूचना पट" : "Notice Board"}</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Search Box Card (Hidden on Print) */}
        <div className="print:hidden rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <School size={16} className="text-amber-600" />
            <span>Gidhaur Central School, Jamui (Bihar)</span>
          </div>

          <h1 className="mt-1.5 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === "hi" ? "सार्वजनिक अंकतालिका एवं परीक्षा परिणाम" : "Official Examination Report Card Portal"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {lang === "hi"
              ? "विद्यालय द्वारा प्रदत्त छात्र के रोल नंबर (Roll No) द्वारा आधिकारिक परीक्षा अंकतालिका देखें एवं डाउनलोड करें।"
              : "Access and print student academic report cards using only the school-issued 4-digit Roll Number."}
          </p>

          {/* Quick Roll Pickers */}
          <div className="mt-4 rounded-xl bg-amber-50/80 border border-amber-200/70 p-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 mb-2">
              <Sparkles size={14} className="text-amber-600" />
              <span>{lang === "hi" ? "त्वरित परीक्षण रोल नंबर (1-क्लिक खोज):" : "Sample Student Roll Numbers (1-Click):"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleRolls.map((s) => (
                <button
                  key={s.roll}
                  type="button"
                  onClick={() => { setRoll(s.roll); handleLookup(s.roll); }}
                  className="rounded-lg border border-amber-300/80 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900 hover:bg-amber-100 hover:border-amber-400 active:scale-95 transition shadow-2xs"
                >
                  <span className="font-mono font-bold text-blue-700">{s.roll}</span> · {s.name} ({s.badge})
                </button>
              ))}
            </div>
          </div>

          {/* Roll Number Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleLookup(); }}
            className="mt-5 flex flex-col sm:flex-row items-center gap-2.5"
          >
            <div className="relative w-full">
              <input
                id="school-roll-input"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono tracking-wider font-bold"
                placeholder={lang === "hi" ? "विद्यालय रोल नंबर दर्ज करें (उदा. 1001, 1002, 0901, 0101)" : "Enter School Roll Number (e.g. 1001, 1002, 0901, 0101)"}
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <button
              disabled={busy}
              type="submit"
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 active:scale-98 transition disabled:opacity-50"
            >
              <Search size={16} />
              <span>
                {busy
                  ? (lang === "hi" ? "अंकतालिका लोड हो रही है..." : "Loading Marksheet...")
                  : (lang === "hi" ? "अंकतालिका खोलें" : "Open Report Card")}
              </span>
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-800 border border-red-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* OFFICIAL SCHOOL REPORT CARD / MARKSHEET (PRINTABLE)           */}
        {/* ============================================================== */}
        {report && (
          <div className="mt-6 space-y-4">
            {/* Top Toolbar (Hidden on Print) */}
            <div className="print:hidden flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white border border-slate-200 p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>{lang === "hi" ? "प्रमाणित स्कूल रिकॉर्ड सत्यापित" : "Official Record Verified"}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyVerificationLink}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copied ? "Link Copied" : "Share"}</span>
                </button>

                <button
                  onClick={printReportCard}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-95 transition"
                >
                  <Printer size={15} />
                  <span>{lang === "hi" ? "अंकतालिका प्रिंट / PDF डाउनलोड" : "Print / Download PDF"}</span>
                </button>
              </div>
            </div>

            {/* Printable Marksheet Certificate */}
            <div id="printable-report-card" className="rounded-2xl border-2 border-slate-800 bg-white p-6 sm:p-10 shadow-md text-slate-900 print:shadow-none print:border-2 print:border-black print:p-6 print:m-0">
              {/* Institution Header */}
              <div className="text-center border-b-2 border-slate-800 pb-5">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700">
                  <span>Affiliation Code: BSEB-PAT-JAM-811305 · U-DISE: 10220304501</span>
                </div>
                <h2 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 font-serif">
                  Gidhaur Central School
                </h2>
                <p className="text-sm font-bold text-slate-800 font-serif">
                  गिद्धौर सेन्ट्रल स्कूल, जमुई (बिहार) - 811305
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Affiliated to Bihar School Examination Board (BSEB, Patna) & Aligned with NCERT Curriculum
                </p>
                <div className="mt-2 inline-block rounded-md bg-slate-900 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                  Academic Progress Report Card · Session 2026-27
                </div>
              </div>

              {/* Student Credentials Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Student Name</span>
                  <span className="font-extrabold text-sm text-slate-900">{report.full_name}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Roll Number</span>
                  <span className="font-mono font-black text-sm text-blue-700">{report.roll_number}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Class & Section</span>
                  <span className="font-extrabold text-sm text-slate-900">{report.class_name} · {report.section_name}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Admission No.</span>
                  <span className="font-mono font-bold text-slate-800">{report.admission_number}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Father / Guardian</span>
                  <span className="font-bold text-slate-800">{report.parent_name}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Mother&apos;s Name</span>
                  <span className="font-bold text-slate-800">{report.mother_name}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Date of Birth</span>
                  <span className="font-bold text-slate-800">{report.date_of_birth}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Town / Village</span>
                  <span className="font-bold text-slate-800 truncate block">{report.village_or_town}</span>
                </div>
              </div>

              {/* Marks Table */}
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-300">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Subject / विषय</th>
                      <th className="py-2.5 px-2 text-center">Theory (80)</th>
                      <th className="py-2.5 px-2 text-center">Practical (20)</th>
                      <th className="py-2.5 px-2 text-center">Max Marks</th>
                      <th className="py-2.5 px-2 text-center">Marks Obtained</th>
                      <th className="py-2.5 px-2 text-center">Grade</th>
                      <th className="py-2.5 px-3 text-right">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {report.subjects.map((sub: any) => (
                      <tr key={sub.subject_code} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {sub.subject_name}
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono text-slate-700">{sub.theory_obtained}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-slate-700">{sub.practical_obtained}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.total_max}</td>
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-sm text-slate-950">
                          {sub.total_obtained}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`inline-block font-extrabold px-2 py-0.5 rounded text-[11px] ${
                            sub.grade.startsWith("A") ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-600">
                          {sub.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Row */}
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold text-xs">
                    <tr>
                      <td className="py-3 px-3 uppercase font-extrabold text-slate-900">
                        Grand Aggregate Total
                      </td>
                      <td colSpan={2} className="py-3 px-2 text-center text-slate-500 font-normal">
                        Sum Total
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold">{report.total_max_marks}</td>
                      <td className="py-3 px-2 text-center font-mono font-black text-base text-blue-800">
                        {report.total_marks_obtained}
                      </td>
                      <td className="py-3 px-2 text-center font-black text-sm text-emerald-700">
                        {report.overall_grade}
                      </td>
                      <td className="py-3 px-3 text-right font-extrabold text-emerald-800">
                        {report.overall_division}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Summary Performance Cards */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Aggregate Percentage</p>
                  <p className="mt-1 text-2xl font-black text-blue-700 font-mono">{report.overall_percentage}%</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{report.overall_division}</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Section Rank</p>
                  <p className="mt-1 text-2xl font-black text-amber-600 font-mono">
                    #{report.class_rank} <span className="text-xs text-slate-400 font-normal">/ {report.total_students_in_section}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{report.section_name}</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Attendance Rate</p>
                  <p className="mt-1 text-2xl font-black text-emerald-600 font-mono">{report.attendance_percentage}%</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{report.days_present} / {report.total_working_days} Days</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Result Status</p>
                  <p className="mt-1 text-lg font-black text-emerald-700 uppercase">Passed</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">BSEB Compliant</p>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Teacher & Institutional Remarks:</span>
                <p className="italic leading-relaxed">{report.teacher_remarks}</p>
              </div>

              {/* Official Signatures & Seal */}
              <div className="mt-10 pt-6 border-t-2 border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 mx-auto w-32 mb-1.5 flex items-end justify-center pb-1 font-serif italic text-slate-600">
                    Sunita Verma
                  </div>
                  <span className="font-bold text-slate-900 block">Class Teacher</span>
                  <span className="text-[10px] text-slate-500">Section In-Charge</span>
                </div>

                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 mx-auto w-32 mb-1.5 flex items-end justify-center pb-1 font-serif italic text-slate-600">
                    Dr. R. P. Singh
                  </div>
                  <span className="font-bold text-slate-900 block">Examination Controller</span>
                  <span className="text-[10px] text-slate-500">1st Class Coordinator</span>
                </div>

                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 mx-auto w-32 mb-1.5 flex items-end justify-center pb-1 font-serif italic text-slate-600 font-bold">
                    Dr. Arvind Pathak
                  </div>
                  <span className="font-bold text-slate-900 block">Principal</span>
                  <span className="text-[10px] text-slate-500">Gidhaur Central School</span>
                </div>
              </div>

              {/* Security Verification Footer */}
              <div className="mt-6 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
                <span>Security Verification Hash: {report.verification_code}</span>
                <span>Date of Issue: {report.issue_date} · Official Institutional Marksheet</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
