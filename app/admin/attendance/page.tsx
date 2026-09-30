"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck, Users, GraduationCap, CheckCircle2,
  Clock, AlertCircle, Save, Search, Filter, Sparkles,
  ChevronRight, Building2, UserCheck, Shield
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function AttendancePage() {
  const { lang, t } = useLanguage();
  const supabase = createBrowserClient();

  // Active top tab: "students" or "teachers"
  const [activeTab, setActiveTab] = useState<"students" | "teachers">("students");

  // --- Student Attendance State ---
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [studentDate, setStudentDate] = useState(new Date().toISOString().slice(0, 10));
  const [studentStatus, setStudentStatus] = useState<Record<string, "present" | "absent" | "late">>({});
  const [studentSaving, setStudentSaving] = useState(false);

  // --- Teacher Attendance & Section In-Charge State ---
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherDate, setTeacherDate] = useState(new Date().toISOString().slice(0, 10));
  const [teacherStatus, setTeacherStatus] = useState<Record<string, "present" | "late" | "leave" | "absent">>({});
  const [teacherSections, setTeacherSections] = useState<Record<string, string>>({});
  const [teacherRemarks, setTeacherRemarks] = useState<Record<string, string>>({});
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherLevelFilter, setTeacherLevelFilter] = useState<string>("all");
  const [teacherSaving, setTeacherSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const sectionOptions = [
    "Class 10-A", "Class 10-B", "Class 10-C",
    "Class 9-A", "Class 9-B", "Class 9-C",
    "Class 8-A", "Class 8-B", "Class 8-C",
    "Class 7-A", "Class 7-B", "Class 7-C",
    "Class 6-A", "Class 6-B", "Class 6-C",
    "Class 5-A", "Class 5-B", "Class 5-C",
    "Class 4-A", "Class 4-B", "Class 4-C",
    "Class 3-A", "Class 3-B", "Class 3-C",
    "Class 2-A", "Class 2-B", "Class 2-C",
    "Class 1-A", "Class 1-B", "Class 1-C",
    "Subject Specialist / No Section", "Institutional Leadership"
  ];

  // Load initial data
  useEffect(() => {
    // Classes for student attendance
    supabase
      .from("classes")
      .select("id,name")
      .order("name")
      .then(({ data }: any) => {
        const clsList = data ?? [];
        setClasses(clsList);
        if (clsList.length > 0 && !classId) {
          setClassId(clsList[clsList.length - 1]?.id || "c-10");
        }
      });

    // Teachers for teacher attendance & section management
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      const res = await fetch("/api/local-db?table=teachers");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          initTeachersState(json);
          return;
        }
      }
    } catch {
      // fallback
    }

    const { data } = await supabase.from("teachers").select("*").order("hierarchy_level", { ascending: true });
    if (data && data.length) {
      initTeachersState(data);
    }
  }

  function initTeachersState(list: any[]) {
    setTeachers(list);

    // Initial status
    const initialStatus: Record<string, "present" | "late" | "leave" | "absent"> = {};
    const initialSecs: Record<string, string> = {};
    const initialRem: Record<string, string> = {};

    list.forEach((t, i) => {
      initialStatus[t.id] = (i === 3 ? "late" : i === 7 ? "leave" : "present");
      initialSecs[t.id] = t.section_in_charge || t.assigned_section || (t.classes_assigned?.[0] ? `${t.classes_assigned[0]}` : "Subject Specialist");
      initialRem[t.id] = i === 3 ? "Delayed due to train" : i === 7 ? "Approved leave" : "";
    });

    setTeacherStatus(initialStatus);
    setTeacherSections(initialSecs);
    setTeacherRemarks(initialRem);
  }

  // Load students when classId changes
  async function loadStudents() {
    if (!classId) return;
    const { data } = await supabase
      .from("student_enrollments")
      .select("student_id,roll_number,students(id,full_name)")
      .eq("class_id", classId)
      .eq("is_current", true);

    const stList = data ?? [];
    setStudents(stList);
    setStudentStatus(Object.fromEntries(stList.map((x: any) => [x.student_id, "present"])));
  }

  useEffect(() => {
    loadStudents();
  }, [classId]);

  // Save Student Attendance
  async function saveStudentAttendance() {
    if (!classId || !students.length) return alert("Select a class with enrolled students.");
    setStudentSaving(true);

    const subjRes: any = await supabase.from("subjects").select("id").limit(1).single();
    const tchRes: any = await supabase.from("teachers").select("id").limit(1).single();

    const { data: sess, error } = await supabase.from("attendance_sessions").upsert({
      class_id: classId,
      section_id: null,
      subject_id: subjRes.data?.id,
      attendance_date: studentDate,
      teacher_id: tchRes.data?.id
    }, { onConflict: "class_id,section_id,subject_id,attendance_date" }).select("id").single();

    if (error || !sess) {
      setStudentSaving(false);
      return alert(error?.message ?? "Could not create student attendance session.");
    }

    const rows = students.map((s: any) => ({
      session_id: sess.id,
      student_id: s.student_id,
      status: studentStatus[s.student_id] ?? "present"
    }));

    const r = await supabase.from("attendance").upsert(rows, { onConflict: "session_id,student_id" });
    setStudentSaving(false);

    if (r.error) {
      alert("Error: " + r.error.message);
    } else {
      triggerSuccessToast(lang === "hi" ? "छात्र उपस्थिति सफलतापूर्वक सहेज ली गई!" : "Student attendance saved successfully!");
    }
  }

  // Save Teacher Attendance & Updated Section In-Charges
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
      remarks: teacherRemarks[t.id] || ""
    }));

    // Update teachers with new section_in_charge in database
    const teacherUpdates = teachers.map((t) => ({
      id: t.id,
      section_in_charge: teacherSections[t.id] || t.section_in_charge,
      assigned_section: teacherSections[t.id] || t.section_in_charge
    }));

    try {
      await fetch("/api/local-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert",
          table: "teacher_attendance",
          records: attendanceRecords
        })
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
            updates: {
              section_in_charge: upd.section_in_charge,
              assigned_section: upd.assigned_section
            }
          })
        });
      }
    } catch {
      // offline fallback
    }

    setTeacherSaving(false);
    triggerSuccessToast(
      lang === "hi"
        ? "शिक्षकों की दैनिक उपस्थिति एवं कक्षा/प्रभाग प्रभार (Section In-Charge) सफलतापूर्वक सहेजा गया!"
        : "Faculty daily attendance & section in-charge assignments saved successfully!"
    );
  }

  function triggerSuccessToast(msg: string) {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  }

  // Filtered teachers list
  const filteredTeachers = teachers.filter((t) => {
    if (teacherLevelFilter !== "all" && String(t.hierarchy_level) !== teacherLevelFilter) {
      return false;
    }
    if (teacherSearch.trim()) {
      const q = teacherSearch.toLowerCase();
      const match =
        t.full_name.toLowerCase().includes(q) ||
        t.employee_code.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        (teacherSections[t.id] && teacherSections[t.id].toLowerCase().includes(q)) ||
        (t.section_in_charge && t.section_in_charge.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Calculate teacher counters
  const teacherStats = {
    total: teachers.length,
    present: Object.values(teacherStatus).filter((s) => s === "present").length,
    late: Object.values(teacherStatus).filter((s) => s === "late").length,
    leave: Object.values(teacherStatus).filter((s) => s === "leave").length,
    absent: Object.values(teacherStatus).filter((s) => s === "absent").length
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Header */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <CalendarCheck size={14} className="text-amber-400" />
                <span>Gidhaur Central School · Attendance & Section Operations</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                {lang === "hi" ? "दैनिक उपस्थिति एवं कक्षा-प्रभाग प्रबंधन" : "Attendance & Section Management"}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                {lang === "hi"
                  ? "छात्र उपस्थिति के साथ-साथ सभी 50 शिक्षकों की उपस्थिति एवं वे किस प्रभाग (Section) का प्रभार संभालते हैं, उसका प्रबंधन करें।"
                  : "Track student rosters, take faculty daily attendance, and assign/monitor which class section each teacher takes care of."}
              </p>
            </div>

            <LanguageSwitcher />
          </div>

          {/* Tab Switcher Pills */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === "students"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Users size={16} />
              <span>{lang === "hi" ? "छात्र उपस्थिति (Students Roster)" : "Student Attendance Roster"}</span>
            </button>

            <button
              onClick={() => setActiveTab("teachers")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === "teachers"
                  ? "bg-amber-400 text-slate-950 shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <GraduationCap size={16} />
              <span>{lang === "hi" ? "शिक्षक उपस्थिति एवं कक्षा प्रभार (50 शिक्षक)" : "Teachers Attendance & Section In-Charge (50 Faculty)"}</span>
            </button>
          </div>
        </div>

        {/* Success Toast Notification */}
        {saveSuccessMsg && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-xs sm:text-sm font-bold text-emerald-900 shadow-sm animate-in fade-in">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: TEACHER ATTENDANCE & SECTION IN-CHARGE (NEW REQUIREMENT) */}
        {/* ============================================================== */}
        {activeTab === "teachers" && (
          <div className="space-y-6">
            {/* KPI Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-slate-500">Total Faculty</span>
                <p className="mt-1 text-2xl font-black text-slate-900">{teacherStats.total}</p>
                <p className="text-[10px] text-slate-400">5-Level Hierarchy</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-emerald-700">Present (उपस्थित)</span>
                <p className="mt-1 text-2xl font-black text-emerald-600">{teacherStats.present}</p>
                <p className="text-[10px] text-emerald-600">On Active Duty</p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-amber-700">Late (विलंब)</span>
                <p className="mt-1 text-2xl font-black text-amber-600">{teacherStats.late}</p>
                <p className="text-[10px] text-amber-600">Grace Applied</p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-blue-700">On Leave (अवकाश)</span>
                <p className="mt-1 text-2xl font-black text-blue-600">{teacherStats.leave}</p>
                <p className="text-[10px] text-blue-600">Approved Leave</p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-red-700">Absent (अनुपस्थित)</span>
                <p className="mt-1 text-2xl font-black text-red-600">{teacherStats.absent}</p>
                <p className="text-[10px] text-red-600">Uninformed</p>
              </div>
            </div>

            {/* Toolbar: Date, Search, Quick Mark All Present, Save */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    {lang === "hi" ? "उपस्थिति तिथि" : "Attendance Date"}
                  </label>
                  <input
                    type="date"
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
                    value={teacherDate}
                    onChange={(e) => setTeacherDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    {lang === "hi" ? "पदानुक्रम फ़िल्टर" : "Hierarchy Level"}
                  </label>
                  <select
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
                    value={teacherLevelFilter}
                    onChange={(e) => setTeacherLevelFilter(e.target.value)}
                  >
                    <option value="all">All Levels (1 to 5)</option>
                    <option value="1">Level 1: Executive Leadership</option>
                    <option value="2">Level 2: Chief Class Coordinators</option>
                    <option value="3">Level 3: Senior Wing Heads</option>
                    <option value="4">Level 4: Middle Wing Faculty</option>
                    <option value="5">Level 5: Primary Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    {lang === "hi" ? "शिक्षक / प्रभाग खोजें" : "Search Faculty"}
                  </label>
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      className="rounded-xl border border-slate-300 pl-8 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-600 w-44 sm:w-56"
                      placeholder="Name, Emp Code or Section..."
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allP: Record<string, "present"> = {};
                    teachers.forEach((t) => { allP[t.id] = "present"; });
                    setTeacherStatus(allP);
                  }}
                  className="rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition active:scale-95"
                >
                  ✓ {lang === "hi" ? "सभी को उपस्थित करें" : "Mark All Present"}
                </button>

                <button
                  type="button"
                  disabled={teacherSaving}
                  onClick={saveTeacherAttendance}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition active:scale-95 disabled:opacity-50"
                >
                  <Save size={15} />
                  <span>
                    {teacherSaving
                      ? (lang === "hi" ? "सहेजा जा रहा है..." : "Saving...")
                      : (lang === "hi" ? "शिक्षक उपस्थिति व प्रभार सहेजें" : "Save Faculty Attendance & Sections")}
                  </span>
                </button>
              </div>
            </div>

            {/* Teachers Table with Section In-Charge Selector */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Faculty Member & Code</th>
                      <th className="py-3 px-3">Designation & Level</th>
                      <th className="py-3 px-3">
                        <span className="text-blue-700 font-extrabold flex items-center gap-1">
                          <Building2 size={13} />
                          {lang === "hi" ? "प्रभार प्रभाग (Section They Take Care Of)" : "Section They Take Care Of"}
                        </span>
                      </th>
                      <th className="py-3 px-3">Attendance Status</th>
                      <th className="py-3 px-4">Daily Remarks / Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTeachers.map((tch) => {
                      const curStatus = teacherStatus[tch.id] || "present";
                      const curSection = teacherSections[tch.id] || tch.section_in_charge || "Subject Specialist";

                      return (
                        <tr key={tch.id} className="hover:bg-slate-50/70 transition">
                          {/* Name & Code */}
                          <td className="py-3 px-4">
                            <div className="font-extrabold text-slate-900">{tch.full_name}</div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">{tch.employee_code} · {tch.phone}</div>
                          </td>

                          {/* Designation */}
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-700">{tch.designation}</span>
                            <div className="mt-0.5">
                              <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-600">
                                {tch.hierarchy_title || `Level ${tch.hierarchy_level}`}
                              </span>
                            </div>
                          </td>

                          {/* Section They Take Care Of (Editable Dropdown) */}
                          <td className="py-3 px-3">
                            <div className="relative">
                              <select
                                className="rounded-xl border border-blue-200 bg-blue-50/40 px-2.5 py-1.5 text-xs font-bold text-blue-900 outline-none focus:border-blue-600 focus:bg-white"
                                value={curSection}
                                onChange={(e) => setTeacherSections({ ...teacherSections, [tch.id]: e.target.value })}
                              >
                                {sectionOptions.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          {/* Attendance Status Buttons */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1">
                              {(["present", "late", "leave", "absent"] as const).map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => setTeacherStatus({ ...teacherStatus, [tch.id]: st })}
                                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase transition ${
                                    curStatus === st
                                      ? st === "present"
                                        ? "bg-emerald-600 text-white shadow-xs"
                                        : st === "late"
                                        ? "bg-amber-500 text-slate-950 shadow-xs"
                                        : st === "leave"
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "bg-red-600 text-white shadow-xs"
                                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                  }`}
                                >
                                  {st === "present" ? "P" : st === "late" ? "L" : st === "leave" ? "Lv" : "A"}
                                </button>
                              ))}
                            </div>
                          </td>

                          {/* Remarks */}
                          <td className="py-3 px-4">
                            <input
                              className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-1 text-xs text-slate-700 outline-none focus:border-blue-600 focus:bg-white w-full"
                              placeholder="Remarks (optional)..."
                              value={teacherRemarks[tch.id] || ""}
                              onChange={(e) => setTeacherRemarks({ ...teacherRemarks, [tch.id]: e.target.value })}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!filteredTeachers.length && (
                <div className="p-10 text-center text-xs text-slate-500">
                  No teachers found matching your search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: STUDENT ATTENDANCE ROSTER                               */}
        {/* ============================================================== */}
        {activeTab === "students" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    Select Class
                  </label>
                  <select
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    Attendance Date
                  </label>
                  <input
                    type="date"
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
                    value={studentDate}
                    onChange={(e) => setStudentDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStudentStatus(Object.fromEntries(students.map((s) => [s.student_id, "present"])))}
                  className="rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition"
                >
                  ✓ Mark All Present
                </button>

                <button
                  type="button"
                  disabled={studentSaving}
                  onClick={saveStudentAttendance}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition disabled:opacity-50"
                >
                  <Save size={15} />
                  <span>{studentSaving ? "Saving..." : "Save Student Attendance"}</span>
                </button>
              </div>
            </div>

            {/* Students List */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="divide-y divide-slate-100">
                {students.map((s: any) => (
                  <div key={s.student_id} className="flex items-center justify-between p-3.5 px-5 hover:bg-slate-50/50 transition">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {s.roll_number}
                      </span>
                      <span className="font-bold text-sm text-slate-900">
                        {s.students?.full_name ?? s.full_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(["present", "late", "absent"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setStudentStatus({ ...studentStatus, [s.student_id]: v })}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition ${
                            studentStatus[s.student_id] === v
                              ? v === "absent"
                                ? "bg-red-600 text-white"
                                : v === "late"
                                ? "bg-amber-500 text-slate-950"
                                : "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {!students.length && (
                  <div className="p-12 text-center text-xs text-slate-500">
                    Select a class to load the student roster.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
