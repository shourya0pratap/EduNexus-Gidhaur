"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { calculateAttendancePercentage } from "@/lib/calculations/academic";
import Link from "next/link";
import { BookOpen, CalendarCheck, FileText, GraduationCap, Award, MapPin, Phone, AlertCircle, Ruler, Microscope, Scroll, Globe, Edit3, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const subjectsData = [
  { name: "Mathematics (गणित)", desc: "Trigonometry, Real Numbers, Quadratic Equations", Icon: Ruler },
  { name: "Science (विज्ञान)", desc: "Physics, Chemistry, Biology & Laboratory Notes", Icon: Microscope },
  { name: "Hindi (गोधूलि / वर्णिका)", desc: "Shram Vibhajan, Bis ke Dant, Mangamma", Icon: BookOpen },
  { name: "Sanskrit (पीयूषम् भाग-2)", desc: "Mangalam, Patliputra Vaibhavam, Shlokas", Icon: Scroll },
  { name: "Social Science (सामाजिक विज्ञान)", desc: "History, Geography, Economics, Disaster Mgmt", Icon: Globe },
  { name: "English (Panorama Part 2)", desc: "The Pace for Living, Gillu, Grammar", Icon: Edit3 }
];

export default async function StudentPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: st } = await supabase.from("students").select("id,full_name,roll_number,date_of_birth,admission_number,class_name,parent_name,parent_phone,village_or_town,district").eq("profile_id", user?.id ?? "").single();
    const { data: attendanceData } = st ? await supabase.from("attendance").select("status").eq("student_id", st.id) : { data: [] };
    const rows: any[] = attendanceData ?? [];
    const presentCount = rows.filter((x: any) => x.status !== "absent").length;
    const absentCount = rows.filter((x: any) => x.status === "absent").length;
    const pct = rows.length ? calculateAttendancePercentage(presentCount, absentCount, 0) : 95;
    const { data: resources } = await supabase.from("resources").select("id,title,subject_name,book_reference,board,upload_date").limit(4);
    setData({ st, rows, pct, resources, user });
  }

  const st = data.st;
  const rows = data.rows;
  const pct = data.pct;
  const resources = data.resources;
  const user = data.user;

  if (!st) return <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">Loading…</div>;

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">
      <div className="container">
        <div className="flex flex-col justify-between gap-[var(--space-md)] md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <span className="rounded-[var(--radius-pill)] bg-[var(--color-success)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-success)]">{L("बिहार बोर्ड (BSEB) छात्र", "Bihar Board (BSEB) Student")}</span>
              <span className="text-[var(--text-xs)] text-[var(--color-muted)]">Academic Year 2026-27</span>
            </div>
            <h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">Welcome, {st?.full_name ?? user?.user_metadata?.full_name ?? "Student"}</h1>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">Gidhaur Central School · {st?.class_name ?? "Class 10-A"}</p>
          </div>
          <div className="flex flex-wrap gap-[var(--space-xs)]">
            <Link href="/report" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-[var(--font-body)] font-600 shadow-[var(--shadow-card)] hover:translate-y-[-1px] active:translate-y-[1px] transition"><FileText size={16} /> {L("आधिकारिक अंकतालिका", "Official Report Card")}</Link>
            <Link href="/announcements" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-[var(--font-body)] font-600 text-[var(--color-ink)] shadow-[var(--shadow-card)] hover:bg-[var(--color-paper-2)] transition"><CalendarCheck size={16} /> {L("सूचना पट", "Notice Board")}</Link>
            <Link href="/admin/resources" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] text-[var(--color-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-[var(--font-body)] font-600 shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition"><BookOpen size={16} /> {L("अध्ययन सामग्री", "Study Materials")}</Link>
          </div>
        </div>

        <div className="mt-[var(--space-md)] rounded-[var(--radius-card)] border-2 border-[var(--color-accent-2)] bg-[var(--color-accent-3)]/10 p-[var(--space-sm)] sm:p-[var(--space-md)] shadow-[var(--shadow-card)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-sm)]">
            <div className="flex items-start gap-[var(--space-xs)]">
              <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-2)] p-[var(--space-xs)] text-[var(--color-accent-ink)] shrink-0"><AlertCircle size={20} /></div>
              <div>
                <div className="flex items-center gap-[var(--space-xs)]"><span className="rounded-md bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-[10px] font-black tracking-[var(--tracking-display)] px-[var(--space-xs)] py-[0.5px]">URGENT DUE ALERT</span><span className="text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)]">Trigonometric Identities Proofs (NCERT Ex 8.4)</span></div>
                <p className="text-[var(--text-xs)] text-[var(--color-ink-2)] mt-[var(--space-xs)]">Class 10 Mathematics. In-charge: Sri Rajesh Sharma. Complete proofs and upload solution notebook.</p>
              </div>
            </div>
            <Link href="/admin/assignments" className="inline-flex items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-[var(--font-body)] font-600 text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition shrink-0"><span>{L("असाइनमेंट विवरण देखें", "View Assignment Details")}</span></Link>
          </div>
        </div>

        <div className="mt-[var(--space-lg)] grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between text-[var(--color-muted)]"><span className="text-[var(--text-xs)] font-semibold  tracking-[var(--tracking-display)]">Roll Number</span><GraduationCap size={18} className="text-[var(--color-accent-2)]" /></div>
            <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{st?.roll_number ?? "1001"}</p>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">Adm: {st?.admission_number ?? "GCS-2022-045"}</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between text-[var(--color-muted)]"><span className="text-[var(--text-xs)] font-semibold  tracking-[var(--tracking-display)]">Attendance</span><CalendarCheck size={18} className="text-[var(--color-success)]" /></div>
            <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-success)]">{pct}%</p>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{rows.length || 24} Sessions tracked</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between text-[var(--color-muted)]"><span className="text-[var(--text-xs)] font-semibold  tracking-[var(--tracking-display)]">Class & Section</span><Award size={18} className="text-[var(--color-accent-2)]" /></div>
            <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{st?.class_name ?? "Class 10-A"}</p>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">Bihar Board Matric Prep</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between text-[var(--color-muted)]"><span className="text-[var(--text-xs)] font-semibold  tracking-[var(--tracking-display)]">Village / Home</span><MapPin size={18} className="text-[var(--color-accent-2)]" /></div>
            <p className="mt-[var(--space-xs)] text-lg font-bold text-[var(--color-ink)] line-clamp-1">{st?.village_or_town ?? "Gidhaur, Jamui"}</p>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">District: {st?.district ?? "Jamui, Bihar"}</p>
          </div>
        </div>

        <div className="mt-[var(--space-lg)] grid gap-[var(--space-sm)] lg:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center justify-between">
              <div><h2 className="font-bold text-[var(--color-ink)]">{L("बिहार बोर्ड और NCERT विषय", "Bihar Board & NCERT Subjects")}</h2><p className="text-[var(--text-xs)] text-[var(--color-muted)]">{L("पाठ्यक्रम-अनुरूप पाठ्यपुस्तक अध्ययन संसाधन", "Curriculum-aligned textbook study resources")}</p></div>
              <Link href="/admin/resources" className="text-[var(--text-xs)] font-bold text-[var(--color-accent-2)] hover:underline">{L("सभी विषय देखें", "View all subjects")}</Link>
            </div>
            <div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] sm:grid-cols-2">{subjectsData.map((subj) => (
              <div key={subj.name} className="flex items-start gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-[var(--space-sm)]">
                <subj.Icon size={16} className="text-[var(--color-accent-2)] shrink-0" />
                <div>
                  <p className="text-[var(--text-sm)] font-bold text-[var(--color-ink)]">{subj.name}</p>
                  <p className="text-[var(--text-xs)] text-[var(--color-muted)]">{subj.desc}</p>
                </div>
              </div>
            ))}</div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
            <h2 className="font-bold text-[var(--color-ink)]">{L("छात्र प्रोफ़ाइल", "Student Profile")}</h2>
            <p className="text-[var(--text-xs)] text-[var(--color-muted)]">{L("शैक्षणिक पहचान और आपातकालीन संपर्क", "Academic identity & emergency contacts")}</p>
            <div className="mt-[var(--space-md)] space-y-[var(--space-sm)] text-[var(--text-sm)]">
              <div className="flex justify-between border-b border-[var(--color-rule)] pb-[var(--space-xs)]"><span className="text-[var(--color-muted)]">Guardian Name</span><span className="font-medium text-[var(--color-ink)]">{st?.parent_name ?? "Sunil Kumar"}</span></div>
              <div className="flex justify-between border-b border-[var(--color-rule)] pb-[var(--space-xs)]"><span className="text-[var(--color-muted)]">Parent Phone</span><span className="font-medium text-[var(--color-ink)]">{st?.parent_phone ?? "+91 91234 56780"}</span></div>
              <div className="flex justify-between border-b border-[var(--color-rule)] pb-[var(--space-xs)]"><span className="text-[var(--color-muted)]">Date of Birth</span><span className="font-medium text-[var(--color-ink)]">{st?.date_of_birth ?? "2010-04-15"}</span></div>
              <div className="flex justify-between pb-[var(--space-xs)]"><span className="text-[var(--color-muted)]">Status</span><span className="rounded-[var(--radius-pill)] bg-[var(--color-success)]/10 px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-success)]">Enrolled Active</span></div>
            </div>
            <div className="mt-[var(--space-md)] rounded-[var(--radius-card)] bg-[var(--color-accent-3)] p-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-accent-ink)]"><Lightbulb size={14} className="shrink-0 text-[var(--color-accent-2)]" /> {L("अपने रोल नंबर और जन्मतिथि का उपयोग करके सार्वजनिक अंकतालिका सत्यापन पोर्टल के माध्यम से अंकतालिका देखें या सत्यापित करें।", "Use your Roll Number and DOB to view or verify public report cards via the lookup portal.")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
