"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import Link from "next/link";
import {
  GraduationCap, Shield, User, Users, Sparkles,
  ArrowRight, KeyRound, CheckCircle2, AlertCircle, School, Award
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LoginPage() {
  const supabase = createBrowserClient();
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      category: lang === "hi" ? "प्रशासनिक नेतृत्व (Executive)" : "Administrative Leadership",
      role: "admin",
      label: lang === "hi" ? "प्राचार्य / मुख्य प्रशासक" : "Principal / Chief Admin",
      email: "admin@edunexus.edu",
      pass: "Admin@123",
      desc: lang === "hi" ? "डॉ. अरविंद पाठक (गिद्धौर सेन्ट्रल स्कूल, सर्वोच्च नियंत्रण)" : "Dr. Arvind Pathak (Gidhaur Central School, Supreme Admin)",
      icon: Shield,
      badgeColor: "bg-purple-100 text-purple-900 border border-purple-300",
      rank: "Level 1"
    },
    {
      category: lang === "hi" ? "विशेष समन्वयक (High Control Faculty)" : "Class Coordinators (Special Authority)",
      role: "teacher",
      label: lang === "hi" ? "प्रथम वर्ग समन्वयक (1st Class Coordinator)" : "1st Class Coordinator (Senior Secondary)",
      email: "rameshwar.singh@edunexus.edu",
      pass: "Teacher@123",
      desc: lang === "hi" ? "डॉ. रामेश्वर प्रसाद सिंह (कक्षा 9-10 मैट्रिक विंग प्रमुख - उच्च नियंत्रण व परीक्षा मॉडरेशन)" : "Dr. Rameshwar Prasad Singh (Grades 9-10 Matric Wing Head - Higher Moderation & Discipline Control)",
      icon: Award,
      badgeColor: "bg-amber-100 text-amber-900 border border-amber-300 font-bold",
      rank: "Level 2 Coordinator"
    },
    {
      category: lang === "hi" ? "विशेष समन्वयक (High Control Faculty)" : "Class Coordinators (Special Authority)",
      role: "teacher",
      label: lang === "hi" ? "द्वितीय वर्ग समन्वयक (2nd Class Coordinator)" : "2nd Class Coordinator (Middle Wing)",
      email: "sunita.verma@edunexus.edu",
      pass: "Teacher@123",
      desc: lang === "hi" ? "श्रीमती सुनीता वर्मा (कक्षा 6-8 मिडिल विंग प्रमुख - उच्च पाठ्यक्रम ऑडिट व उपस्थिति नियंत्रण)" : "Smt. Sunita Verma (Grades 6-8 Middle Wing Head - Higher Syllabus Audit & Attendance Control)",
      icon: Award,
      badgeColor: "bg-amber-100 text-amber-900 border border-amber-300 font-bold",
      rank: "Level 2 Coordinator"
    },
    {
      category: lang === "hi" ? "संकाय शिक्षक (Faculty)" : "Faculty & Subject Heads",
      role: "teacher",
      label: lang === "hi" ? "गणित विभागाध्यक्ष (Math HOD)" : "Mathematics HOD",
      email: "rajesh.sharma@edunexus.edu",
      pass: "Teacher@123",
      desc: lang === "hi" ? "राजेश शर्मा (कक्षा 9-10th गणित व विज्ञान)" : "Rajesh Sharma (Classes 9th & 10th Math/Science)",
      icon: GraduationCap,
      badgeColor: "bg-blue-100 text-blue-900 border border-blue-200",
      rank: "Level 3 HOD"
    },
    {
      category: lang === "hi" ? "छात्र (400 नामांकित छात्र)" : "Students (400 Bihar Enrolled)",
      role: "student",
      label: lang === "hi" ? "कक्षा 10 मैट्रिक छात्र (Class 10 Matric)" : "Class 10 Student (Matric Board)",
      email: "aarav.kumar@edunexus.edu",
      pass: "Student@123",
      desc: lang === "hi" ? "आरव कुमार · रोल 1001 · ग्राम गांगरा, गिद्धौर (जमुई)" : "Aarav Kumar · Roll 1001 · Vill Gangra, Gidhaur (Jamui)",
      icon: User,
      badgeColor: "bg-emerald-100 text-emerald-900 border border-emerald-200",
      rank: "Grade 10-A"
    },
    {
      category: lang === "hi" ? "छात्र (400 नामांकित छात्र)" : "Students (400 Bihar Enrolled)",
      role: "student",
      label: lang === "hi" ? "कक्षा 1 प्राथमिक छात्रा (Class 1 Primary)" : "Class 1 Student (Primary Wing)",
      email: "deepali.kumari@edunexus.edu",
      pass: "Student@123",
      desc: lang === "hi" ? "दीपाली कुमारी · रोल 0101 · प्राथमिक विंग, गिद्धौर" : "Deepali Kumari · Roll 0101 · Primary Wing, Gidhaur",
      icon: User,
      badgeColor: "bg-teal-100 text-teal-900 border border-teal-200",
      rank: "Grade 1-A"
    },
    {
      category: lang === "hi" ? "अभिभावक" : "Parents & Guardians",
      role: "parent",
      label: lang === "hi" ? "अभिभावक (Parent)" : "Parent / Guardian",
      email: "parent@edunexus.edu",
      pass: "Parent@123",
      desc: lang === "hi" ? "सुनील कुमार (आरव कुमार के पिता, गिद्धौर)" : "Sunil Kumar (Father of Aarav Kumar, Gidhaur)",
      icon: Users,
      badgeColor: "bg-amber-100 text-amber-900 border border-amber-200",
      rank: "Guardian"
    }
  ];

  async function handleLogin(e?: React.FormEvent, customEmail?: string, customPass?: string) {
    if (e) e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPass
      });

      if (error) {
        setIsLoading(false);
        setMessage(error.message);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      setIsLoading(false);
      setMessage(err?.message || "Failed to log in.");
    }
  }

  function fillAndSubmit(targetEmail: string, targetPass: string) {
    setEmail(targetEmail);
    setPassword(targetPass);
    handleLogin(undefined, targetEmail, targetPass);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-8 md:py-14 text-slate-100">
      <div className="mx-auto max-w-5xl">
        {/* Top Controls: Language Switcher + School Brand */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md hover:bg-white/20 transition">
            <School size={15} className="text-amber-400" />
            <span>{t("school_name")} · {t("school_location")}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/report" className="text-xs text-slate-300 hover:text-white underline">
              {t("public_lookup")}
            </Link>
            <div className="bg-white/10 rounded-xl p-1 backdrop-blur-md">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Portal Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {lang === "hi" ? "एड्युनेक्सस शैक्षणिक पोर्टल लॉगिन" : "EduNexus Academic Portal"}
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">
            {lang === "hi"
              ? "बिहार राज्य बोर्ड (BSEB) एवं NCERT पाठ्यक्रम आधारित 400 छात्र, 50 शिक्षक एवं समन्वयक प्रबंधन प्रणाली।"
              : "Integrated Bihar Board (BSEB) & NCERT Workspace. 400 Students, 50 Teachers with Coordinators Hierarchy & Local DB Engine."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr] items-start">
          {/* Sign In Form */}
          <div className="rounded-3xl border border-white/10 bg-white/95 p-6 md:p-8 text-slate-900 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {lang === "hi" ? "अपने खाते में साइन इन करें" : "Sign in to your account"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === "hi" ? "विद्यालय द्वारा प्रदत्त ईमेल व पासवर्ड दर्ज करें" : "Use your assigned school credentials"}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Local DB Active
              </span>
            </div>

            {message && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {lang === "hi" ? "ईमेल पता (Email)" : "Email Address"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@edunexus.edu"
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 shadow-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {lang === "hi" ? "पासवर्ड (Password)" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 shadow-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-98 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <span>{lang === "hi" ? "सत्यापित हो रहा है..." : "Authenticating..."}</span>
                ) : (
                  <>
                    <span>{lang === "hi" ? "पोर्टल में प्रवेश करें" : "Sign In to Portal"}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                {lang === "hi" ? "सार्वजनिक अंकतालिका सत्यापन के लिए " : "Need public report card verification? "}
                <Link href="/report" className="font-bold text-blue-600 hover:underline">
                  {lang === "hi" ? "यहाँ रोल नंबर से खोजें" : "Lookup with Roll & DOB"}
                </Link>
              </p>
            </div>
          </div>

          {/* Quick-Fill Demo Logins with Coordinator Highlights */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <Sparkles size={16} />
              <span>{lang === "hi" ? "त्वरित परीक्षण लॉगिन (Quick Test Logins)" : "Instant 1-Click Testing Logins"}</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              {lang === "hi"
                ? "किसी भी भूमिका पर क्लिक करें - ईमेल और पासवर्ड तुरंत भरकर साइन-इन हो जाएगा:"
                : "Click any profile below to autofill and immediately sign into the portal:"}
            </p>

            <div className="space-y-3">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.email}
                    onClick={() => fillAndSubmit(acc.email, acc.pass)}
                    className="w-full text-left rounded-2xl border border-white/10 bg-white/10 p-3.5 hover:bg-white/20 active:scale-98 transition flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white mt-0.5 group-hover:bg-white group-hover:text-slate-900 transition">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                            {acc.label}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${acc.badgeColor}`}>
                            {acc.rank}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                          {acc.desc}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">
                          {acc.email} · <span className="text-amber-300">{acc.pass}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={15} className="text-slate-400 shrink-0 mt-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-black/20 p-3.5 border border-white/5 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-300">
                {lang === "hi" ? "📌 समन्वयक नियंत्रण निर्देश:" : "📌 Coordinator Privilege System:"}
              </p>
              <p className="text-[11px] text-slate-300">
                {lang === "hi"
                  ? "• 1st Class Coordinator (डॉ. रामेश्वर प्रसाद सिंह): कक्षा 9-10th मैट्रिक मॉडरेशन, ग्रेड प्रमाणीकरण और अनुशासन नियंत्रण।"
                  : "• 1st Class Coordinator (Dr. Rameshwar Prasad Singh): Senior Wing head (Grades 9-10 Matric), exam moderation & grade authorization."}
              </p>
              <p className="text-[11px] text-slate-300">
                {lang === "hi"
                  ? "• 2nd Class Coordinator (श्रीमती सुनीता वर्मा): कक्षा 6-8th मिडिल विंग पाठ्यक्रम प्रगति, शिक्षक ऑडिट और उपस्थिति मॉनिटरिंग।"
                  : "• 2nd Class Coordinator (Smt. Sunita Verma): Middle Wing head (Grades 6-8), syllabus tracking & faculty attendance compliance."}
              </p>
              <p className="text-[10px] text-slate-400 pt-1">
                {lang === "hi" ? "पूर्ण 400 छात्र व 50 शिक्षकों की सूची login.md में उपलब्ध है।" : "See login.md for complete credentials of all 50 teachers & 400 students."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
