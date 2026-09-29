"use client";

import { useState } from "react";
import Link from "next/link";
import { School, Search, ArrowLeft, CheckCircle2, AlertCircle, Sparkles, User, Calendar, FileText } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PublicReportPage() {
  const { lang, t } = useLanguage();
  const [roll, setRoll] = useState("");
  const [dob, setDob] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const sampleStudents = [
    { name: "Aarav Kumar (आरव कुमार)", roll: "1001", dob: "2010-04-12", grade: "10-A (Matric)" },
    { name: "Priya Kumari (प्रिया कुमारी)", roll: "1002", dob: "2010-08-23", grade: "10-A (Matric)" },
    { name: "Deepali Kumari (दीपाली कुमारी)", roll: "0101", dob: "2019-03-15", grade: "1-A (Primary)" },
  ];

  async function submit(e: React.FormEvent, customRoll?: string, customDob?: string) {
    if (e) e.preventDefault();
    setBusy(true);
    setError("");
    setStudent(null);

    const rollQuery = customRoll || roll;
    const dobQuery = customDob || dob;

    try {
      const r = await fetch("/api/report/lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ roll_number: rollQuery, date_of_birth: dobQuery })
      });
      const j = await r.json();
      setBusy(false);
      if (!r.ok) return setError(j.error || "Student record could not be verified.");
      setStudent(j.student);
    } catch (err: any) {
      setBusy(false);
      setError("Network or lookup error occurred.");
    }
  }

  function fillAndLookup(rNum: string, dBirth: string) {
    setRoll(rNum);
    setDob(dBirth);
    submit(undefined as any, rNum, dBirth);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:py-14 text-slate-900">
      <div className="mx-auto max-w-2xl">
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft size={15} />
            <span>{lang === "hi" ? "मुख्य पृष्ठ पर लौटें" : "Back to Home"}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Verification Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <School size={16} className="text-amber-600" />
            <span>Gidhaur Central School, Jamui (Bihar)</span>
          </div>

          <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === "hi" ? "सार्वजनिक अंकतालिका एवं छात्र सत्यापन" : "Public Report Card & Student Verification"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            {lang === "hi"
              ? "छात्र के रोल नंबर एवं पंजीकृत जन्मतिथि द्वारा आधिकारिक रिकॉर्ड की जांच करें।"
              : "Verify a student's enrollment, attendance and identity using their exact 4-digit roll number and date of birth."}
          </p>

          {/* Quick Test Samples */}
          <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
              <Sparkles size={14} className="text-amber-600" />
              <span>{lang === "hi" ? "त्वरित परीक्षण छात्र (1-क्लिक खोज):" : "Sample Test Students (1-Click Lookup):"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleStudents.map((s) => (
                <button
                  key={s.roll}
                  type="button"
                  onClick={() => fillAndLookup(s.roll, s.dob)}
                  className="rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 hover:border-amber-400 active:scale-95 transition shadow-2xs"
                >
                  {s.name} · <span className="font-mono font-bold text-blue-700">Roll {s.roll}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {lang === "hi" ? "छात्र रोल नंबर (Roll Number)" : "Student Roll Number"}
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono"
                placeholder="e.g. 1001 or 0101"
                required
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {lang === "hi" ? "जन्मतिथि (Date of Birth)" : "Date of Birth"}
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <button
              disabled={busy}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-98 transition disabled:opacity-50"
            >
              <Search size={16} />
              <span>
                {busy
                  ? (lang === "hi" ? "सत्यापित हो रहा है..." : "Verifying record...")
                  : (lang === "hi" ? "छात्र रिकॉर्ड खोजें" : "Verify Student Record")}
              </span>
            </button>
          </form>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {student && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>{lang === "hi" ? "प्रमाणित छात्र रिकॉर्ड" : "Verified School Record"}</span>
              </div>

              <h2 className="text-xl font-black text-slate-900">{student.full_name}</h2>
              <p className="mt-1 text-xs text-slate-600">
                {lang === "hi" ? "कक्षा" : "Class"} <span className="font-bold text-slate-900">{student.class_name}</span> · {lang === "hi" ? "वर्ग" : "Section"} <span className="font-bold text-slate-900">{student.section_name}</span> · {lang === "hi" ? "रोल नं" : "Roll"}: <span className="font-mono font-bold text-blue-700">{student.roll_number}</span>
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/80 bg-white p-3.5 shadow-2xs">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {lang === "hi" ? "उपस्थिति प्रतिशत" : "Attendance Rate"}
                  </p>
                  <p className="mt-1 text-2xl font-black text-emerald-600">
                    {student.attendance_percentage == null ? "N/A" : `${student.attendance_percentage}%`}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {student.attendance_percentage >= 75 ? "Compliant (अर्हता प्राप्त)" : "Requires Attention"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/80 bg-white p-3.5 shadow-2xs">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {lang === "hi" ? "शैक्षणिक बोर्ड" : "Academic Board"}
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    BSEB / NCERT
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Gidhaur Central School
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Verification ID: EN-{student.roll_number}-{dob.replace(/-/g, "")}</span>
                <span className="font-semibold text-emerald-700">Official Record</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
