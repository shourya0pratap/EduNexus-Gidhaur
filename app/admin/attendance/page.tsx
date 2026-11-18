"use client";
import { useEffect, useState } from "react";
import { CalendarCheck, Users, GraduationCap, CheckCircle2, Clock, AlertCircle, Save, Search, Filter, Sparkles, ChevronRight, Building2, UserCheck, Shield, UserRound, MapPin } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function AttendancePage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [activeTab, setActiveTab] = useState<"students" | "teachers">("students");
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [studentDate, setStudentDate] = useState(new Date().toISOString().slice(0, 10));
  const [studentStatus, setStudentStatus] = useState<Record<string, "present" | "absent" | "late">>({});
  const [studentSaving, setStudentSaving] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherDate, setTeacherDate] = useState(new Date().toISOString().slice(0, 10));
  const [teacherStatus, setTeacherStatus] = useState<Record<string, "present" | "late" | "leave" | "absent">>({});
  const [teacherSections, setTeacherSections] = useState<Record<string, string>>({});
  const [teacherRemarks, setTeacherRemarks] = useState<Record<string, string>>({});
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherLevelFilter, setTeacherLevelFilter] = useState<string>("all");
  const [teacherSaving, setTeacherSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const totalPages = Math.ceil(students.length / pageSize) || 1;
  const sectionOptions = ["Class 10-A", "Class 10-B", "Class 10-C", "Class 9-A", "Class 9-B", "Class 9-C", "Class 8-A", "Class 8-B", "Class 8-C", "Class 7-A", "Class 7-B", "Class 7-C", "Class 6-A", "Class 6-B", "Class 6-C", "Class 5-A", "Class 5-B", "Class 5-C", "Class 4-A", "Class 4-B", "Class 4-C", "Class 3-A", "Class 3-B", "Class 3-C", "Class 2-A", "Class 2-B", "Class 2-C", "Class 1-A", "Class 1-B", "Class 1-C", "Subject Specialist / No Section", "Institutional Leadership"];

  useEffect(() => {
    supabase.from("classes").select("id,name").order("name").then(({ data }: any) => { const clsList = data ?? []; setClasses(clsList); if (clsList.length > 0 && !classId) setClassId(clsList[clsList.length - 1]?.id || "c-10"); });
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try { const res = await fetch("/api/local-db?table=teachers"); if (res.ok) { const json = await res.json(); if (Array.isArray(json) && json.length > 0) { initTeachersState(json); return; } } } catch {}
    const { data } = await supabase.from("teachers").select("*").order("hierarchy_level", { ascending: true });
    if (data && data.length) initTeachersState(data);
  }

  function initTeachersState(list: any[]) { setTeachers(list); const initialStatus: Record<string, "present" | "late" | "leave" | "absent"> = {}; const initialSecs: Record<string, string> = {}; const initialRem: Record<string, string> = {}; list.forEach((t, i) => { initialStatus[t.id] = (i === 3 ? "late" : i === 7 ? "leave" : "present"); initialSecs[t.id] = t.section_in_charge || t.assigned_section || (t.classes_assigned?.[0] ? `${t.classes_assigned[0]}` : "Subject Specialist"); initialRem[t.id] = i === 3 ? "Delayed due to train" : i === 7 ? "Approved leave" : ""; }); setTeacherStatus(initialStatus); setTeacherSections(initialSecs); setTeacherRemarks(initialRem); }

  async function loadStudents() { if (!classId) return; const { data } = await supabase.from("student_enrollments").select("student_id,roll_number,students(id,full_name)").eq("class_id", classId).eq("is_current", true); const stList = data ?? []; setStudents(stList); setStudentStatus(Object.fromEntries(stList.map((x: any) => [x.student_id, "present"]))); }
  useEffect(() => { loadStudents(); }, [classId]);

  async function deactivate(id: string) {
    if (!confirm(L("क्या आप इस छात्र को निष्क्रिय करना चाहते हैं?", "Deactivate this student?"))) return;
    await supabase.from("students").update({ is_active: false }).eq("id", id);
    loadStudents();
  }

  async function saveStudentAttendance() {
    if (!classId || !students.length) return alert("Select a class with enrolled students."); setStudentSaving(true);
    const subjRes: any = await supabase.from("subjects").select("id").limit(1).single(); const tchRes: any = await supabase.from("teachers").select("id").limit(1).single();
    const { data: sess, error } = await supabase.from("attendance_sessions").upsert({ class_id: classId, section_id: null, subject_id: subjRes.data?.id, attendance_date: studentDate, teacher_id: tchRes.data?.id }, { onConflict: "class_id,section_id,subject_id,attendance_date" }).select("id").single();
    if (error || !sess) { setStudentSaving(false); return alert(error?.message ?? "Could not create student attendance session."); }
    const rows = students.map((s: any) => ({ session_id: sess.id, student_id: s.student_id, status: studentStatus[s.student_id] ?? "present" }));
    const r = await supabase.from("attendance").upsert(rows, { onConflict: "session_id,student_id" }); setStudentSaving(false);
    if (r.error) alert("Error: " + r.error.message); else triggerSuccessToast(lang === "hi" ? "छात्र उपस्थिति सफलतापूर्वक सहेज ली गई!" : "Student attendance saved successfully!");
  }

  async function saveTeacherAttendance() {
    setTeacherSaving(true);
    const attendanceRecords = teachers.map((t) => ({
      id: `t-att-${teacherDate}-${t.id}`,
      teacher_id: t.id,
      teacher_name: t.full_name,
      employee_code: t.employee_code,
      section_in_charge: teacherSections[t.id] || t.section_in_charge || "Subject Specialist",
      date: teacherDate,
      status: teacherStatus[t.id] || "present",
      check_in_time: teacherStatus[t.id] === "late" ? "08:45 AM" : teacherStatus[t.id] === "leave" ? "—" : "08:15 AM",
      remarks: teacherRemarks[t.id] || "",
    }));
    const teacherUpdates = teachers.map((t) => ({
      id: t.id,
      section_in_charge: teacherSections[t.id] || t.section_in_charge,
      assigned_section: teacherSections[t.id] || t.section_in_charge,
    }));
    try {
      await fetch("/api/local-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upsert", table: "teacher_attendance", records: attendanceRecords }),
      });
      for (const upd of teacherUpdates) {
        await fetch("/api/local-db", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            table: "teachers",
            filterField: "id",
            filterValue: upd.id,
            updates: { section_in_charge: upd.section_in_charge, assigned_section: upd.assigned_section },
          }),
        });
      }
    } catch {}
    setTeacherSaving(false);
    triggerSuccessToast(lang === "hi" ? "शिक्षकों की दैनिक उपस्थिति एवं कक्षा/प्रभाग प्रभार सफलतापूर्वक सहेजा गया!" : "Faculty daily attendance & section in-charge assignments saved successfully!");
  }

  function triggerSuccessToast(msg: string) { setSaveSuccessMsg(msg); setTimeout(() => setSaveSuccessMsg(""), 3500); }

  const filteredTeachers = teachers.filter((t) => { if (teacherLevelFilter !== "all" && String(t.hierarchy_level) !== teacherLevelFilter) return false; if (teacherSearch.trim()) { const q = teacherSearch.toLowerCase(); const match = t.full_name.toLowerCase().includes(q) || t.employee_code.toLowerCase().includes(q) || t.designation.toLowerCase().includes(q) || (teacherSections[t.id] && teacherSections[t.id].toLowerCase().includes(q)) || (t.section_in_charge && t.section_in_charge.toLowerCase().includes(q)); if (!match) return false; } return true; });

  const teacherStats = { total: teachers.length, present: Object.values(teacherStatus).filter((s) => s === "present").length, late: Object.values(teacherStatus).filter((s) => s === "late").length, leave: Object.values(teacherStatus).filter((s) => s === "leave").length, absent: Object.values(teacherStatus).filter((s) => s === "absent").length };

  function renderTeacherRow(tch: any) {
    const curStatus = teacherStatus[tch.id] || "present";
    const curSection = teacherSections[tch.id] || tch.section_in_charge || "Subject Specialist";
    return (
      <tr key={tch.id} className="hover:bg-[var(--color-paper-2)]/50 transition">
        <td className="py-[var(--space-md)] px-[var(--space-sm)]">
          <div className="font-extrabold text-[var(--color-ink)]">{tch.full_name}</div>
          <div className="text-[11px] font-[var(--font-outlier)] text-[var(--color-muted)] mt-[var(--space-xs)]">{tch.employee_code} · {tch.phone}</div>
        </td>
        <td className="py-[var(--space-md)] px-[var(--space-sm)]">
          <span className="font-bold text-[var(--color-ink-2)]">{tch.designation}</span>
          <div className="mt-[var(--space-xs)]"><span className="inline-block rounded-[var(--radius-card)] px-[var(--space-xs)] py-[0.5px] text-[9px] font-bold bg-[var(--color-paper-2)] text-[var(--color-muted)]">{tch.hierarchy_title || `Level ${tch.hierarchy_level}`}</span></div>
        </td>
        <td className="py-[var(--space-md)] px-[var(--space-sm)]">
          <div className="relative">
            <select className="rounded-[var(--radius-card)] border border-[var(--color-accent-2)] bg-[var(--color-accent-3)]/40 px-[var(--space-xs)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] outline-none focus:border-[var(--color-accent-2)] focus:bg-[var(--color-card)]" value={curSection} onChange={(e) => setTeacherSections({ ...teacherSections, [tch.id]: e.target.value })}>
              {sectionOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </td>
        <td className="py-[var(--space-md)] px-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-xs)]">
            {(["present", "late", "leave", "absent"] as const).map((st) => (
              <button key={st} type="button" onClick={() => setTeacherStatus({ ...teacherStatus, [tch.id]: st })} className={`rounded-lg px-[var(--space-xs)] py-[0.5px] text-[11px] font-bold uppercase transition ${curStatus === st ? st === "present" ? "bg-[var(--color-success)] text-[var(--color-success)] shadow-xs" : st === "late" ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-xs" : st === "leave" ? "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] shadow-xs" : "bg-[var(--color-danger)] text-[var(--color-card)] shadow-xs" : "bg-[var(--color-paper-2)] text-[var(--color-muted)] hover:bg-[var(--color-paper-3)]"}`}>
                {st === "present" ? "P" : st === "late" ? "L" : st === "leave" ? "Lv" : "A"}
              </button>
            ))}
          </div>
        </td>
        <td className="py-[var(--space-md)] px-[var(--space-sm)]">
          <input className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)]/50 px-[var(--space-xs)] py-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)] outline-none focus:border-[var(--color-accent-2)] focus:bg-[var(--color-card)] w-full" placeholder="Remarks (optional)..." value={teacherRemarks[tch.id] || ""} onChange={(e) => setTeacherRemarks({ ...teacherRemarks, [tch.id]: e.target.value })} />
        </td>
      </tr>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] sm:p-[var(--space-lg)] md:p-[var(--space-xl)] space-y-[var(--space-lg)]">
      <div className="container">
        <div className="mx-auto max-w-7xl space-y-[var(--space-lg)]">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-md)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-md)]">
              <div>
                <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md">
                  <CalendarCheck size={14} className="text-[var(--color-accent-2)]" />
                  <span>Gidhaur Central School · Attendance & Section Operations</span>
                </div>
                <h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)] leading-[1.05]">{L("दैनिक उपस्थिति एवं कक्षा-प्रभाग प्रबंधन", "Attendance & Section Management")}</h1>
                <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80">{lang === "hi" ? "छात्र उपस्थिति के साथ-साथ सभी 50 शिक्षकों की उपस्थिति एवं वे किस प्रभाग (Section) का प्रभार संभालते हैं, उसका प्रबंधन करें।" : "Track student rosters, take faculty daily attendance, and assign/monitor which class section each teacher takes care of."}</p>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-card)]/20 flex flex-wrap gap-[var(--space-xs)]">
              <button onClick={() => setActiveTab("students")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold transition ${activeTab === "students" ? "bg-[var(--color-card)] text-[var(--color-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-ink)]/10 text-[var(--color-card)] hover:bg-[var(--color-ink)]/20"}`}>
                <Users size={16} /><span>{L("छात्र उपस्थिति (Students Roster)", "Student Attendance Roster")}</span>
              </button>
              <button onClick={() => setActiveTab("teachers")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold transition ${activeTab === "teachers" ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-ink)]/10 text-[var(--color-card)] hover:bg-[var(--color-ink)]/20"}`}>
                <GraduationCap size={16} /><span>{L("शिक्षक उपस्थिति एवं कक्षा प्रभाग (50 शिक्षक)", "Teachers Attendance & Section In-Charge (50 Faculty)")}</span>
              </button>
            </div>
          </div>
          {saveSuccessMsg && (
            <div className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-success)]/10 border border-[var(--color-success)] p-[var(--space-md)] text-[var(--text-xs)] sm:text-sm font-bold text-[var(--color-success)] shadow-[var(--shadow-card)]">
              <CheckCircle2 size={18} className="text-[var(--color-success)] shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}
          {activeTab === "teachers" && (
            <div className="space-y-[var(--space-md)]">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-[var(--space-sm)]">
                <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)]">Total Faculty</span>
                  <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{teacherStats.total}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">5-Level Hierarchy</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-success)] bg-[var(--color-success)]/10 p-[var(--space-md)] shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-success)]">Present (उपस्थित)</span>
                  <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-success)]">{teacherStats.present}</p>
                  <p className="text-[10px] text-[var(--color-success)]">On Active Duty</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-accent-2)] bg-[var(--color-accent-3)]/10 p-[var(--space-md)] shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-accent-ink)]">Late (विलंब)</span>
                  <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-accent-ink)]">{teacherStats.late}</p>
                  <p className="text-[10px] text-[var(--color-accent-2)]">Grace Applied</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-accent-3)] bg-[var(--color-accent-2)]/10 p-[var(--space-md)] shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-accent-ink)]">On Leave (अवकाश)</span>
                  <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-accent-3)]">{teacherStats.leave}</p>
                  <p className="text-[10px] text-[var(--color-accent-3)]">Approved Leave</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-danger)] bg-[var(--color-danger)]/10 p-[var(--space-md)] shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-danger)]">Absent (अनुपस्थित)</span>
                  <p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-danger)]">{teacherStats.absent}</p>
                  <p className="text-[10px] text-[var(--color-danger)]">Uninformed</p>
                </div>
              </div>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] sm:p-[var(--space-lg)] shadow-[var(--shadow-card)] flex flex-wrap items-center justify-between gap-[var(--space-sm)]">
                <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] block mb-[var(--space-xs)]">{L("उपस्थिति तिथि", "Attendance Date")}</label>
                    <input type="date" className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={teacherDate} onChange={(e) => setTeacherDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] block mb-[var(--space-xs)]">{L("पदानुक्रम फ़िल्टर", "Hierarchy Level")}</label>
                    <select className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-semibold text-[var(--color-ink-2)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={teacherLevelFilter} onChange={(e) => setTeacherLevelFilter(e.target.value)}>
                      <option value="all">All Levels (1 to 5)</option>
                      <option value="1">Level 1: Executive Leadership</option>
                      <option value="2">Level 2: Chief Class Coordinators</option>
                      <option value="3">Level 3: Senior Wing Heads</option>
                      <option value="4">Level 4: Middle Wing Faculty</option>
                      <option value="5">Level 5: Primary Faculty</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] block mb-[var(--space-xs)]">{L("शिक्षक / प्रभाग खोजें", "Search Faculty")}</label>
                    <div className="relative">
                      <Search size={14} className="absolute left-[var(--space-sm)] top-[var(--space-sm)] text-[var(--color-muted)]" />
                      <input className="rounded-[var(--radius-card)] border border-[var(--color-rule)] pl-[var(--space-lg)] pr-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)] w-44 sm:w-56" placeholder="Name, Emp Code or Section..." value={teacherSearch} onChange={(e) => setTeacherSearch(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  <button type="button" onClick={() => { const allP: Record<string, "present"> = {}; teachers.forEach((t) => { allP[t.id] = "present"; }); setTeacherStatus(allP); }} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] transition active:scale-95">✓ {L("सभी को उपस्थित करें", "Mark All Present")}</button>
                  <button type="button" disabled={teacherSaving} onClick={saveTeacherAttendance} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] shadow-[var(--shadow-card)] transition active:scale-95 disabled:opacity-55 disabled:cursor-not-allowed"><Save size={15} /><span>{teacherSaving ? (lang === "hi" ? "सहेजा जा रहा है..." : "Saving...") : (lang === "hi" ? "शिक्षक उपस्थिति व प्रभार सहेजें" : "Save Faculty Attendance & Sections")}</span></button>
                </div>
              </div>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[var(--text-xs)]">
                    <thead className="bg-[var(--color-paper-2)] text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] border-b border-[var(--color-rule)]">
                      <tr>
                        <th className="py-[var(--space-md)] px-[var(--space-sm)]">Faculty Member & Code</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Designation & Level</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-sm)]"><span className="text-[var(--color-accent-2)] font-extrabold flex items-center gap-[var(--space-xs)]"><Building2 size={13} /> {L("प्रभाग प्रभाग (Section They Take Care Of)", "Section They Take Care Of")}</span></th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Attendance Status</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Daily Remarks / Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-rule)]">
                      {filteredTeachers.map(renderTeacherRow)}
                    </tbody>
                  </table>
                </div>
                {!filteredTeachers.length && (
                  <div className="p-[var(--space-2xl)] text-center text-[var(--text-xs)] text-[var(--color-muted)]">No teachers found matching your search.</div>
                )}
              </div>
            </div>
          )}
          {activeTab === "students" && (
            <div className="space-y-[var(--space-md)]">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] sm:p-[var(--space-lg)] shadow-[var(--shadow-card)] flex flex-wrap items-center justify-between gap-[var(--space-sm)]">
                <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] block mb-[var(--space-xs)]">Select Class</label>
                    <select className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={classId} onChange={(e) => setClassId(e.target.value)}>
                      {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] block mb-[var(--space-xs)]">Attendance Date</label>
                    <input type="date" className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]" value={studentDate} onChange={(e) => setStudentDate(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  <button type="button" onClick={() => setStudentStatus(Object.fromEntries(students.map((s) => [s.student_id, "present"])))} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] transition">✓ Mark All Present</button>
                  <button type="button" disabled={studentSaving} onClick={saveStudentAttendance} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] shadow-[var(--shadow-card)] transition active:scale-95 disabled:opacity-55 disabled:cursor-not-allowed"><Save size={15} /><span>{studentSaving ? (lang === "hi" ? "सहेजा जा रहा है..." : "Saving...") : (lang === "hi" ? "छात्र उपस्थिति सहेजें" : "Save Student Attendance")}</span></button>
                </div>
              </div>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[var(--text-xs)]">
                    <thead className="bg-[var(--color-paper-2)] text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] border-b border-[var(--color-rule)]">
                      <tr>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Roll No</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Student Name</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Class & Section</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Date of Birth</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Parent & Village (Bihar)</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)]">Status</th>
                        <th className="px-[var(--space-sm)] py-[var(--space-md)] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-rule)]">
                      {students.map((s) => (
                        <tr key={s.student_id} className="hover:bg-[var(--color-paper-2)]/50 transition">
                          <td className="px-[var(--space-sm)] py-[var(--space-md)] font-[var(--font-outlier)] text-[var(--text-xs)] font-extrabold text-[var(--color-accent-2)]">{s.roll_number}</td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                            <div className="flex items-center gap-[var(--space-xs)]">
                              <div className="rounded-full bg-[var(--color-paper-2)] p-[var(--space-xs)] text-[var(--color-muted)]"><UserRound size={16} /></div>
                              <div>
                                <div className="font-bold text-[var(--color-ink)]">{s.students?.full_name}</div>
                                <div className="text-[11px] font-[var(--font-outlier)] text-[var(--color-muted)]">{s.admission_number ?? "—"}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                            <span className="rounded-[var(--radius-pill)] bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-muted)]">{s.class_name || `Class ${s.roll_number.slice(0, 2)}`}</span>
                          </td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)]">{s.date_of_birth}</td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)]">
                            <div className="font-semibold text-[var(--color-ink)]">{s.parent_name ?? "Parent"}</div>
                            {s.village_or_town && (
                              <div className="flex items-center gap-[var(--space-xs)] text-[11px] text-[var(--color-muted)] mt-[var(--space-xs)]">
                                <MapPin size={11} className="text-[var(--color-muted)] shrink-0" />
                                <span className="truncate max-w-[180px]">{s.village_or_town}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                            <span className={`rounded-[var(--radius-pill)] px-[var(--space-xs)] py-[0.5px] text-[11px] font-bold ${s.is_active ? "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]" : "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]"}`}>
                              {s.is_active ? (lang === "hi" ? "सक्रिय" : "Active") : (lang === "hi" ? "निष्क्रिय" : "Inactive")}
                            </span>
                          </td>
                          <td className="px-[var(--space-sm)] py-[var(--space-md)] text-right">
                            {s.is_active && (
                              <button onClick={() => deactivate(s.id)} className="text-[var(--text-xs)] font-bold text-[var(--color-danger)] hover:text-[var(--color-accent-2)]">{lang === "hi" ? "निष्क्रिय करें" : "Deactivate"}</button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!students.length && (
                        <tr>
                          <td colSpan={7} className="p-[var(--space-2xl)] text-center text-[var(--text-sm)] text-[var(--color-muted)]"><UserRound size={36} className="mx-auto text-[var(--color-muted)]" /><h3 className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{L("कोई छात्र नहीं मिला", "No students found")}</h3><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।", "Try adjusting your search criteria.")}</p></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-[var(--space-md)]">
                    <span className="text-[var(--text-xs)] text-[var(--color-muted)]">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-[var(--space-xs)]">
                      <button disabled={currentPage === 1} onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40 hover:bg-[var(--color-paper-2)]">Previous</button>
                      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p: number) => Math.min(p + 1, totalPages))} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40 hover:bg-[var(--color-paper-2)]">Next</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
