"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import Link from "next/link";
import {
  GraduationCap, Shield, User, Users, School, Award
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const demoAccounts = [
  {
    category: "प्रशासनिक नेतृत्व (Executive)", role: "admin",
    label: "प्राचार्य / मुख्य प्रशासक", label_en: "Principal / Chief Admin",
    email: "admin@edunexus.edu", pass: "Admin@123",
    desc: "डॉ. अरविंद पाठक (गिद्धौर सेन्ट्रल स्कूल, सर्वोच्च नियंत्रण)", desc_en: "Dr. Arvind Pathak (Gidhaur Central School, Supreme Admin)",
    icon: Shield, badge: "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] border border-[var(--color-rule)]", rank: "स्तर 1"
  },
  {
    category: "विशेष समन्वयक (High Control Faculty)", role: "teacher",
    label: "प्रथम वर्ग समन्वयक (1st Class Coordinator)", label_en: "1st Class Coordinator (Senior Secondary)",
    email: "rameshwar.singh@edunexus.edu", pass: "Teacher@123",
    desc: "डॉ. रामेश्वर प्रसाद सिंह (कक्षा 9-10 मैट्रिक विंग प्रमुख)", desc_en: "Dr. Rameshwar Prasad Singh (Grades 9-10 Matric Wing Head)",
    icon: Award, badge: "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] border border-[var(--color-rule)]", rank: "स्तर 2 समन्वयक"
  },
  {
    category: "विशेष समन्वयक (High Control Faculty)", role: "teacher",
    label: "द्वितीय वर्ग समन्वयक (2nd Class Coordinator)", label_en: "2nd Class Coordinator (Middle Wing)",
    email: "sunita.verma@edunexus.edu", pass: "Teacher@123",
    desc: "श्रीमती सुनीता वर्मा (कक्षा 6-8 मिडिल विंग प्रमुख)", desc_en: "Smt. Sunita Verma (Grades 6-8 Middle Wing Head)",
    icon: Award, badge: "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] border border-[var(--color-rule)]", rank: "स्तर 2 समन्वयक"
  },
  {
    category: "संकाय शिक्षक (Faculty)", role: "teacher",
    label: "गणित विभागाध्यक्ष (Math HOD)", label_en: "Mathematics HOD",
    email: "rajesh.sharma@edunexus.edu", pass: "Teacher@123",
    desc: "राजेश शर्मा (कक्षा 9वीं व 10वीं गणित व विज्ञान)", desc_en: "Rajesh Sharma (Classes 9th & 10th Math/Science)",
    icon: GraduationCap, badge: "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] border border-[var(--color-rule)]", rank: "स्तर 3 विभागाध्यक्ष"
  },
  {
    category: "छात्र (400 नामांकित छात्र)", role: "student",
    label: "कक्षा 10 मैट्रिक छात्र (Class 10 Matric)", label_en: "Class 10 Student (Matric Board)",
    email: "aarav.kumar@edunexus.edu", pass: "Student@123",
    desc: "आरव कुमार · रोल 1001 · ग्राम गांगरा, गिद्धौर (जमुई)", desc_en: "Aarav Kumar · Roll 1001 · Vill Gangra, Gidhaur (Jamui)",
    icon: User, badge: "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] border border-[var(--color-rule)]", rank: "कक्षा 10-A"
  },
  {
    category: "छात्र (400 नामांकित छात्र)", role: "student",
    label: "कक्षा 1 प्राथमिक छात्रा (Class 1 Primary)", label_en: "Class 1 Student (Primary Wing)",
    email: "deepali.kumari@edunexus.edu", pass: "Student@123",
    desc: "दीपाली कुमारी · रोल 0101 · प्राथमिक विंग, गिद्धौर", desc_en: "Deepali Kumari · Roll 0101 · Primary Wing, Gidhaur",
    icon: User, badge: "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] border border-[var(--color-rule)]", rank: "कक्षा 1-A"
  },
  {
    category: "अभिभावक", role: "parent",
    label: "अभिभावक (Parent / Guardian)", label_en: "Parent / Guardian",
    email: "parent@edunexus.edu", pass: "Parent@123",
    desc: "सुनील कुमार (आरव कुमार के पिता, गिद्धौर)", desc_en: "Sunil Kumar (Father of Aarav Kumar, Gidhaur)",
    icon: Users, badge: "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] border border-[var(--color-rule)]", rank: "अभिभावक"
  }
];

export default function LoginPage() {
  const supabase = createBrowserClient();
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);

  async function handleLogin(e?: React.FormEvent, customEmail?: string, customPass?: string) {
    if (e) e.preventDefault();
    setMessage("");
    setIsLoading(true);
    const loginEmail = customEmail || email;
    const loginPass = customPass || password;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass });
      if (error) { setIsLoading(false); setMessage(error.message); return; }
      window.location.href = "/dashboard";
    } catch (err: any) { setIsLoading(false); setMessage(err?.message || "Failed to log in."); }
  }

  function fillAndSubmit(targetEmail: string, targetPass: string) {
    setEmail(targetEmail); setPassword(targetPass); handleLogin(undefined, targetEmail, targetPass);
  }

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] px-4 py-[var(--space-3xl)]">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-[var(--space-xl)]">
          <Link href="/" className="nav-pill wordmark"><span className="mr-2">EN</span>{L("गिद्धौर सेन्ट्रल स्कूल", "Gidhaur Central School")}</Link>
          <div className="flex items-center gap-3">
            <Link href="/report" className="text-[var(--text-xs)] text-[var(--color-muted)] hover:text-[var(--color-accent)] underline">{L("सार्वजनिक अंकतालिका सत्यापन", "Public report card verification")}</Link>
            <div className="border border-[var(--color-rule)] rounded-[var(--radius-card)] p-1 bg-[var(--color-paper-2)]"><LanguageSwitcher /></div>
          </div>
        </div>

        <div className="text-center mb-[var(--space-2xl)]">
          <h1 className="text-[var(--text-display)] font-[var(--font-display)] font-[var(--display-weight)] text-[var(--color-ink)] tracking-[var(--tracking-display)] leading-[1.02] mb-[var(--space-sm)] text-left mx-auto max-w-[30ch]">
            {L("एड्युनेक्सस शैक्षणिक पोर्टल लॉगिन", "EduNexus Academic Portal")}
          </h1>
          <p className="lead text-[var(--color-ink-2)] max-w-2xl mx-auto text-left">{L("बिहार राज्य बोर्ड (BSEB) एवं NCERT पाठ्यक्रम आधारित 400 छात्र, 50 शिक्षक एवं समन्वयक प्रबंधन प्रणाली।", "Integrated Bihar Board (BSEB) & NCERT Workspace. 400 Students, 50 Teachers with Coordinators Hierarchy & Local DB Engine.")}</p>
        </div>

        <div className="grid gap-[var(--space-2xl)] lg:grid-cols-[1.1fr_1.3fr] items-start">
          <section className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
            <div className="head-block mb-[var(--space-lg)]">
              <h2 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] text-[var(--color-ink)] tracking-[var(--tracking-display)]">{L("अपने खाते में साइन इन करें", "Sign in to your account")}</h2>
              <p className="lead text-[var(--color-ink-2)] mt-[var(--space-sm)]">{L("विद्यालय द्वारा प्रदत्त ईमेल व पासवर्ड दर्ज करें", "Use your assigned school credentials")}</p>
            </div>
            {message && (
              <div className="mt-[var(--space-sm)] flex items-start gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-paper-3)] p-[var(--space-sm)] text-[var(--text-xs)] font-semibold text-[var(--color-danger)] border border-[var(--color-danger)]"><span>{message}</span></div>
            )}
            <form onSubmit={handleLogin} className="mt-[var(--space-md)] space-y-[var(--space-md)]">
              <div>
                <label className="block text-[var(--text-sm)] font-medium text-[var(--color-ink-2)] mb-[var(--space-xs)]">{L("ईमेल पता (Email)", "Email Address")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. admin@edunexus.edu" required className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] shadow-xs outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-sm)] font-medium text-[var(--color-ink-2)] mb-[var(--space-xs)]">{L("पासवर्ड (Password)", "Password")}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] shadow-xs outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full mt-[var(--space-sm)] flex items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-[var(--space-lg)] py-[var(--space-sm)] text-[var(--text-md)] font-[var(--font-body)] font-600 shadow-[var(--shadow-card)] hover:translate-y-[-1px] active:translate-y-[1px] active:bg-[var(--color-accent-deep)] transition disabled:opacity-55 disabled:cursor-not-allowed">
                {isLoading ? <span>{L("सत्यापित हो रहा है...", "Authenticating...")}</span> : <span>{L("पोर्टल में प्रवेश करें", "Sign In to Portal")}</span>}
              </button>
            </form>
            <div className="mt-[var(--space-lg)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] text-left">
              <p className="text-[var(--text-xs)] text-[var(--color-muted)]">{L("सार्वजनिक अंकतालिका सत्यापन के लिए ", "Need public report card verification? ")}<Link href="/report" className="font-bold text-[var(--color-accent)] hover:underline">{L("यहाँ रोल नंबर से खोजें", "Lookup with Roll & DOB")}</Link></p>
            </div>
          </section>

          <section className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
            <div className="head-block mb-[var(--space-lg)]">
              <h2 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] text-[var(--color-ink)] tracking-[var(--tracking-display)]">{L("त्वरित परीक्षण लॉगिन", "Instant 1-Click Testing Logins")}</h2>
              <p className="lead text-[var(--color-ink-2)] mt-[var(--space-sm)]">{L("किसी भी भूमिका पर क्लिक करें - ईमेल और पासवर्ड तुरंत भरकर साइन-इन हो जाएगा:", "Click any profile below to autofill and immediately sign into the portal:")}</p>
            </div>
            <div className="space-y-[var(--space-sm)]">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button key={acc.email} onClick={() => fillAndSubmit(acc.email, acc.pass)} className="w-full text-left rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] hover:bg-[var(--color-paper-2)] active:scale-98 transition flex items-start justify-between gap-[var(--space-xs)]">
                    <div className="flex items-start gap-[var(--space-xs)]">
                      <div className="h-[var(--space-xl)] w-[var(--space-xl)] shrink-0 rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center text-white mt-[var(--space-xs)] group-hover:bg-[var(--color-accent-deep)] transition"><Icon size={18} /></div>
                      <div>
                        <div className="flex items-center gap-[var(--space-xs)] flex-wrap">
                          <span className="text-[var(--text-xs)] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition">{L(acc.label, acc.label_en)}</span>
                          <span className={`${acc.badge} text-[10px] px-[var(--space-xs)] py-[0.5px] rounded-full font-bold`}>{acc.rank}</span>
                        </div>
                        <p className="text-[11px] text-[var(--color-ink-2)] mt-[var(--space-xs)] leading-snug">{L(acc.desc, acc.desc_en)}</p>
                        <p className="text-[10px] text-[var(--color-muted)] font-[var(--font-outlier)] mt-[var(--space-xs)]">{acc.email} · <span className="text-[var(--color-accent)]">{acc.pass}</span></p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-[var(--space-lg)] rounded-xl bg-[var(--color-paper-3)] p-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-muted)] space-y-[var(--space-xs)]">
              <p className="font-bold text-[var(--color-accent-2)]">{L("समन्वयक नियंत्रण निर्देश:", "Coordinator Privilege System:")}</p>
              <p className="text-[11px] text-[var(--color-ink-2)]">{L("• 1st Class Coordinator (डॉ. रामेश्वर प्रसाद सिंह): कक्षा 9-10 मैट्रिक मॉडरेशन, ग्रेड प्रमाणीकरण और अनुशासन नियंत्रण।", "• 1st Class Coordinator (Dr. Rameshwar Prasad Singh): Senior Wing head (Grades 9-10 Matric), exam moderation & grade authorization.")}</p>
              <p className="text-[11px] text-[var(--color-ink-2)]">{L("• 2nd Class Coordinator (श्रीमती सुनीता वर्मा): कक्षा 6-8 मिडिल विंग पाठ्यक्रम प्रगति, शिक्षक ऑडिट और उपस्थिति मॉनिटरिंग।", "• 2nd Class Coordinator (Smt. Sunita Verma): Middle Wing head (Grades 6-8), syllabus tracking & faculty attendance compliance.")}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
