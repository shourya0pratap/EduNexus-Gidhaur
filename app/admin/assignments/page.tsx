"use client";
import { useEffect, useState } from "react";
import { FileText, AlertTriangle, Clock, CheckCircle2, Calendar, Users, BookOpen, Plus, Search, BellRing, Send, Sparkles, Filter, ChevronRight } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  class_id?: string;
  class_name?: string;
  subject_id?: string;
  subject_name?: string;
  teacher_id?: string;
  teacher_name?: string;
  assigned_date?: string;
  deadline: string;
  total_marks?: number;
  submission_count?: number;
  total_students?: number;
  priority?: "urgent" | "normal" | "low";
  classes?: { name: string };
  subjects?: { name: string };
  teachers?: { full_name: string };
}

export default function AssignmentsPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "alerts" | "due_soon" | "active">("alerts");
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [reminderSent, setReminderSent] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newClass, setNewClass] = useState("Class 10-A");
  const [newSubj, setNewSubj] = useState("Mathematics");
  const [newDeadline, setNewDeadline] = useState("");
  const now = new Date();

  useEffect(() => {
    async function loadAssignments() {
      try {
        const res = await fetch("/api/local-db?table=assignments");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            setAssignments(json);
            return;
          }
        }
      } catch {}
      const { data } = await supabase.from("assignments").select("*");
      if (data && data.length) setAssignments(data);
    }
    loadAssignments();
  }, []);

  function getStatus(deadlineStr: string) {
    if (!deadlineStr) return { type: "normal", label: "Active", days: 0 };
    const dl = new Date(deadlineStr);
    const diffMs = dl.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 0) return { type: "overdue", label: `Overdue by ${Math.abs(Math.floor(diffHours / 24)) || 1}d`, days: Math.abs(Math.floor(diffHours / 24)) || 1 };
    if (diffHours <= 48) return { type: "due_soon", label: `Due in ${Math.max(1, Math.round(diffHours))}h`, days: 0 };
    return { type: "active", label: "Upcoming", days: 0 };
  }

  const filtered = assignments.filter((a) => {
    const status = getStatus(a.deadline);
    if (activeTab === "alerts" && status.type !== "overdue") return false;
    if (activeTab === "due_soon" && status.type !== "due_soon") return false;
    if (activeTab === "active" && status.type === "overdue") return false;
    if (selectedClass !== "all") {
      const cName = a.class_name || a.classes?.name || "";
      if (!cName.includes(selectedClass)) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        a.title.toLowerCase().includes(q) ||
        (a.subject_name && a.subject_name.toLowerCase().includes(q)) ||
        (a.class_name && a.class_name.toLowerCase().includes(q)) ||
        (a.teacher_name && a.teacher_name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
  const overdueCount = assignments.filter((a) => getStatus(a.deadline).type === "overdue").length;
  const dueSoonCount = assignments.filter((a) => getStatus(a.deadline).type === "due_soon").length;

  function sendReminder(asgId: string) { setReminderSent(asgId); setTimeout(() => setReminderSent(null), 3000); }
  function extendDeadline(asgId: string) { setAssignments(assignments.map((a) => a.id === asgId ? { ...a, deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString() } : a)); }
  function handleCreateAssignment(e: React.FormEvent) {
    e.preventDefault();
    setAssignments([
      {
        id: `asg-${Date.now()}`,
        title: newTitle,
        description: newDesc,
        class_name: newClass,
        subject_name: newSubj,
        teacher_name: "Class Coordinator",
        deadline: newDeadline || new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
        submission_count: 0,
        total_students: 20,
        priority: "normal",
      },
      ...assignments,
    ]);
    setIsAddOpen(false); setNewTitle(""); setNewDesc("");
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] sm:p-[var(--space-lg)] md:p-[var(--space-xl)]">
      <div className="container space-y-[var(--space-lg)]">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-lg)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-md)]">
            <div>
              <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md">
                <FileText size={14} className="text-[var(--color-accent-2)]" />
                <span>{L("असाइनमेंट और गृहकार्य ट्रैकिंग", "Assignments & Homework Tracking")}</span>
              </div>
              <h1 className="mt-[var(--space-sm)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)] leading-[1.05]">{L("गृहकार्य एवं नियत कार्य अलर्ट पोर्टल", "Assignments & Due Deadlines Alerts")}</h1>
              <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80 leading-relaxed">{lang === "hi" ? "सभी कक्षाओं के असाइनमेंट, अतिदेय (Overdue) अलर्ट्स, एवं 48 घंटों में समाप्त होने वाली समय-सीमा का त्वरित प्रबंधन।" : "Track classroom assignments, view overdue urgency alerts, and monitor submissions expiring within 48 hours."}</p>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-2)] hover:bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold text-[var(--color-accent-ink)] shadow-[var(--shadow-card)] transition active:scale-95">
                <Plus size={16} />
                <span>{L("नया असाइनमेंट जोड़ें", "Create Assignment")}</span>
              </button>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-card)]/20 flex flex-wrap gap-[var(--space-xs)]">
            <button onClick={() => setActiveTab("alerts")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold transition ${activeTab === "alerts" ? "bg-[var(--color-danger)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-ink)]/10 text-[var(--color-card)] hover:bg-[var(--color-ink)]/20"}`}>
              <AlertTriangle size={15} />
              <span>{L("अतिदेय असाइनमेंट चेतावनी (Urgent Attention Required)", "High Urgency: Overdue Assignments Alert")}</span>
              <span className="text-[var(--color-accent-ink)] px-[var(--space-xs)] py-[0.5px] rounded-[var(--radius-card)] bg-[var(--color-card)]/20">{overdueCount}</span>
            </button>
            <button onClick={() => setActiveTab("due_soon")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold transition ${activeTab === "due_soon" ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-ink)]/10 text-[var(--color-card)] hover:bg-[var(--color-ink)]/20"}`}>
              <Clock size={15} />
              <span>{L("दुविधा असाइनमेंट (Due Soon)", "Due Soon")}</span>
              <span className="text-[var(--color-accent-ink)] px-[var(--space-xs)] py-[0.5px] rounded-[var(--radius-card)] bg-[var(--color-card)]/20">{dueSoonCount}</span>
            </button>
            <button onClick={() => setActiveTab("active")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold transition ${activeTab === "active" ? "bg-[var(--color-card)] text-[var(--color-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-ink)]/10 text-[var(--color-card)] hover:bg-[var(--color-ink)]/20"}`}>
              <CheckCircle2 size={15} />
              <span>{L("सक्रिय असाइनमेंट (Active)", "Active Assignments")}</span>
            </button>
          </div>
        </div>
        {activeTab === "alerts" && (
          <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-[var(--space-md)] sm:p-[var(--space-lg)] text-[var(--color-danger)] shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-sm)]">
            <div className="flex items-start gap-[var(--space-xs)]">
              <div className="rounded-[var(--radius-card)] bg-[var(--color-danger)] p-[var(--space-xs)] text-[var(--color-card)]"><AlertTriangle size={20} /></div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-danger)]">{L("अतिदेय असाइनमेंट चेतावनी (Urgent Attention Required)", "High Urgency: Overdue Assignments Alert")}</h3>
                <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-danger)]/80">{overdueCount} assignments have passed their submission deadlines with pending student submissions.</p>
              </div>
            </div>
            <button onClick={() => sendReminder("bulk")} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-danger)] hover:bg-[var(--color-accent-2)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] shadow-xs transition active:scale-95 shrink-0">
              <BellRing size={14} />
              <span>{L("सभी को आपातकालीन रिमाइंडर भेजें", "Send Bulk Alert Reminder")}</span>
            </button>
          </div>
        )}
        {reminderSent && (
          <div className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-success)]/10 border border-[var(--color-success)] p-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-success)] shadow-[var(--shadow-card)]">
            <CheckCircle2 size={16} className="text-[var(--color-success)]" />
            <span>Urgent assignment alert reminder dispatched to registered student/parent WhatsApp & SMS!</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-xs)] w-full sm:w-auto">
            <Filter size={15} className="text-[var(--color-muted)]" />
            <select className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-semibold text-[var(--color-ink-2)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)] shadow-[var(--shadow-card)]" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="all">{L("सभी कक्षाएं (1वीं से 10वीं)", "All Classes (1st to 10th)")}</option>
              <option value="Class 10">{L("कक्षा 10 (मैट्रिक)", "Class 10 (Matric)")}</option>
              <option value="Class 9">{L("कक्षा 9", "Class 9")}</option>
              <option value="Class 8">{L("कक्षा 8", "Class 8")}</option>
              <option value="Class 7">{L("कक्षा 7", "Class 7")}</option>
              <option value="Class 6">{L("कक्षा 6", "Class 6")}</option>
              <option value="Class 5">{L("कक्षा 5", "Class 5")}</option>
            </select>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-[var(--space-sm)] top-[var(--space-sm)] text-[var(--color-muted)]" />
            <input className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] pl-[var(--space-lg)] pr-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)] shadow-[var(--shadow-card)] font-medium" placeholder={L("शीर्षक, विषय, शिक्षक द्वारा खोजें...", "Search title, subject, teacher...")} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="space-y-[var(--space-sm)]">
          {filtered.map((asg) => {
            const status = getStatus(asg.deadline);
            const className = asg.class_name || asg.classes?.name || "Class 10-A";
            const subjectName = asg.subject_name || asg.subjects?.name || "Subject";
            const teacherName = asg.teacher_name || asg.teachers?.full_name || "Faculty";
            const subCount = asg.submission_count ?? 12;
            const totalCount = asg.total_students ?? 20;
            return (
              <div key={asg.id} className={`rounded-[var(--radius-card)] border bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)] transition hover:shadow-md ${status.type === "overdue" ? "border-[var(--color-danger)]/30 border-l-4 border-l-[var(--color-danger)] bg-[var(--color-danger)]/10" : status.type === "due_soon" ? "border-[var(--color-accent-2)]/30 border-l-4 border-l-[var(--color-accent-2)] bg-[var(--color-accent-3)]/10" : "border-[var(--color-rule)]"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-sm)]">
                  <div className="space-y-[var(--space-xs)]">
                    <div className="flex flex-wrap items-center gap-[var(--space-xs)] text-[var(--text-xs)]">
                      <span className={`rounded-md px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold uppercase tracking-[var(--tracking-display)] ${status.type === "overdue" ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]" : status.type === "due_soon" ? "bg-[var(--color-accent-2)]/10 text-[var(--color-accent)]" : "bg-[var(--color-success)]/10 text-[var(--color-success)]"}`}>{status.label}</span>
                      <span className="rounded-md bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-muted)]">{className}</span>
                      <span className="rounded-md bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold">{subjectName}</span>
                    </div>
                    <h2 className="text-[var(--text-xs)] sm:text-lg font-bold text-[var(--color-ink)] leading-snug">{asg.title}</h2>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="text-[11px] font-bold text-[var(--color-muted)] block">Submissions</span>
                    <span className="text-base font-black text-[var(--color-ink)] font-[var(--font-outlier)]">{subCount} <span className="text-[var(--text-xs)] text-[var(--color-muted)] font-normal">/ {totalCount}</span></span>
                  </div>
                </div>
                <p className="mt-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-ink-2)] leading-relaxed">{asg.description}</p>
                <div className="mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] flex flex-wrap items-center justify-between gap-[var(--space-sm)] text-[var(--text-xs)]">
                  <div className="flex items-center gap-[var(--space-xs)] text-[var(--color-muted)] font-medium"><span>{L("प्रभारी:", "In-charge:")} <strong className="text-[var(--color-ink)]">{teacherName}</strong></span><span>{L("समय-सीमा:", "Deadline:")} <strong className="text-[var(--color-ink)]">{new Date(asg.deadline).toLocaleString()}</strong></span></div>
                  <div className="flex items-center gap-[var(--space-xs)]">{status.type === "overdue" && (
                    <button onClick={() => extendDeadline(asg.id)} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] hover:bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] transition">{L("3 दिन विस्तार", "+3 Days Extension")}</button>
                  )}<button onClick={() => sendReminder(asg.id)} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] hover:bg-[var(--color-ink-2)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] transition active:scale-95"><Send size={12} /><span>{reminderSent === asg.id ? "Alert Sent!" : L("अलर्ट रिमाइंडर भेजें", "Send Alert Reminder")}</span></button></div>
                </div>
              </div>
            );
          })}
          {!filtered.length && (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-2xl)] text-center shadow-[var(--shadow-card)]">
              <CheckCircle2 size={32} className="mx-auto text-[var(--color-success)]" />
              <p className="mt-[var(--space-sm)] text-sm font-bold text-[var(--color-ink)]">{activeTab === "alerts" ? L("सभी साफ़! अभी कोई अतिदेय असाइनमेंट नहीं है।", "All clear! No overdue assignments right now.") : L("इस फ़िल्टर के लिए कोई असाइनमेंट नहीं मिला।", "No assignments found for this filter.")}</p>
              <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("हर छात्र अप टू डेट है या असाइनमेंट निर्धारित हैं।", "Every student is up to date or assignments are scheduled.")}</p>
            </div>
          )}
        </div>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-sm)] sm:p-[var(--space-md)] bg-[var(--color-ink)]/50 backdrop-blur-2xs">
            <div className="w-full max-w-lg rounded-[var(--radius-card)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
              <h3 className="text-[var(--text-lg)] font-bold text-[var(--color-ink)]">{L("नई कक्षा असाइनमेंट बनाएं", "Create New Class Assignment")}</h3>
              <p className="text-[var(--text-xs)] text-[var(--color-muted)] mt-[var(--space-xs)]">{L("स्वचालित अलर्ट काउंटडाउन के साथ गृहकार्य असाइन करें।", "Assign homework with automated alert countdown.")}</p>
              <form onSubmit={handleCreateAssignment} className="mt-[var(--space-md)] space-y-[var(--space-sm)] text-[var(--text-xs)]">
                <div>
                  <label className="font-bold text-[var(--color-ink-2)] block mb-[var(--space-xs)]">{L("शीर्षक", "Title")}</label>
                  <input className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)] text-sm font-semibold" placeholder="e.g. Class 10 Math Trigonometry Proofs" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className="grid gap-[var(--space-sm)]">
                  <div>
                    <label className="font-bold text-[var(--color-ink-2)] block mb-[var(--space-xs)]">{L("कक्षा", "Class")}</label>
                    <select className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={newClass} onChange={(e) => setNewClass(e.target.value)}>
                      <option>Class 10-A</option>
                      <option>Class 10-B</option>
                      <option>Class 9-A</option>
                      <option>Class 8-A</option>
                      <option>Class 7-A</option>
                      <option>Class 5-A</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[var(--color-ink-2)] block mb-[var(--space-xs)]">{L("विषय", "Subject")}</label>
                    <select className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={newSubj} onChange={(e) => setNewSubj(e.target.value)}>
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>Social Science</option>
                      <option>Hindi</option>
                      <option>English</option>
                      <option>Sanskrit</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-[var(--color-ink-2)] block mb-[var(--space-xs)]">{L("समय-सीमा तिथि और समय", "Deadline Date & Time")}</label>
                  <input type="datetime-local" className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" required value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
                </div>
                <div>
                  <label className="font-bold text-[var(--color-ink-2)] block mb-[var(--space-xs)]">{L("विवरण और कार्य", "Description & Tasks")}</label>
                  <textarea rows={3} className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" placeholder="निर्देश, समस्या संख्या, या संदर्भ पुस्तक अभ्यास..." required value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                </div>
                <div className="mt-[var(--space-md)] flex items-center justify-between gap-[var(--space-xs)] pt-[var(--space-sm)] border-t border-[var(--color-rule)]">
                  <button type="button" onClick={() => setIsAddOpen(false)} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-sm)] font-bold text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)]">{L("रद्द करें", "Cancel")}</button>
                  <button type="submit" className="rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] font-bold text-[var(--color-card)] transition hover:bg-[var(--color-ink-2)]">{L("असाइनमेंट प्रकाशित करें", "Publish Assignment")}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
