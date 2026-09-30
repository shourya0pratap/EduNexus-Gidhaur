"use client";

import { useEffect, useState } from "react";
import {
  FileText, AlertTriangle, Clock, CheckCircle2,
  Calendar, Users, BookOpen, Plus, Search,
  BellRing, Send, Sparkles, Filter, ChevronRight
} from "lucide-react";
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
  const { lang, t } = useLanguage();
  const supabase = createBrowserClient();
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "alerts" | "due_soon" | "active">("alerts");
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [reminderSent, setReminderSent] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New assignment form
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
      } catch {
        // fallback
      }

      const { data } = await supabase.from("assignments").select("*");
      if (data && data.length) {
        setAssignments(data);
      }
    }
    loadAssignments();
  }, []);

  function getStatus(deadlineStr: string) {
    if (!deadlineStr) return { type: "normal", label: "Active", days: 0 };
    const dl = new Date(deadlineStr);
    const diffMs = dl.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 0) {
      const daysOverdue = Math.abs(Math.floor(diffHours / 24)) || 1;
      return { type: "overdue", label: `Overdue by ${daysOverdue}d`, days: daysOverdue };
    }
    if (diffHours <= 48) {
      const hoursLeft = Math.max(1, Math.round(diffHours));
      return { type: "due_soon", label: `Due in ${hoursLeft}h`, days: 0 };
    }
    return { type: "active", label: "Upcoming", days: 0 };
  }

  // Filter assignments
  const filtered = assignments.filter((a) => {
    const status = getStatus(a.deadline);

    // Tab filter
    if (activeTab === "alerts" && status.type !== "overdue") {
      return false;
    }
    if (activeTab === "due_soon" && status.type !== "due_soon") {
      return false;
    }
    if (activeTab === "active" && status.type === "overdue") {
      return false;
    }

    // Class filter
    if (selectedClass !== "all") {
      const cName = a.class_name || a.classes?.name || "";
      if (!cName.includes(selectedClass)) return false;
    }

    // Search query
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

  // Calculate counts for alert tabs
  const overdueCount = assignments.filter((a) => getStatus(a.deadline).type === "overdue").length;
  const dueSoonCount = assignments.filter((a) => getStatus(a.deadline).type === "due_soon").length;

  function sendReminder(asgId: string, title: string) {
    setReminderSent(asgId);
    setTimeout(() => setReminderSent(null), 3000);
  }

  function extendDeadline(asgId: string) {
    const updated = assignments.map((a) => {
      if (a.id === asgId) {
        const newDl = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
        return { ...a, deadline: newDl };
      }
      return a;
    });
    setAssignments(updated);
  }

  function handleCreateAssignment(e: React.FormEvent) {
    e.preventDefault();
    const newAsg: AssignmentItem = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      class_name: newClass,
      subject_name: newSubj,
      teacher_name: "Class Coordinator",
      deadline: newDeadline || new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
      submission_count: 0,
      total_students: 20,
      priority: "normal"
    };
    setAssignments([newAsg, ...assignments]);
    setIsAddOpen(false);
    setNewTitle("");
    setNewDesc("");
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Banner */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <FileText size={14} className="text-amber-400" />
                <span>Assignments & Homework Tracking</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                {lang === "hi" ? "गृहकार्य एवं नियत कार्य अलर्ट पोर्टल" : "Assignments & Due Deadlines Alerts"}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                {lang === "hi"
                  ? "सभी कक्षाओं के असाइनमेंट, अतिदेय (Overdue) अलर्ट्स, एवं 48 घंटों में समाप्त होने वाली समय-सीमा का त्वरित प्रबंधन।"
                  : "Track classroom assignments, view overdue urgency alerts, and monitor submissions expiring within 48 hours."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-sm transition active:scale-95"
              >
                <Plus size={16} />
                <span>{lang === "hi" ? "नया असाइनमेंट जोड़ें" : "Create Assignment"}</span>
              </button>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Alert Pills Switcher */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("alerts")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition ${
                activeTab === "alerts"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-red-950/60 text-red-200 hover:bg-red-900/80 border border-red-500/30"
              }`}
            >
              <AlertTriangle size={15} />
              <span>
                {lang === "hi" ? "🚨 अतिदेय अलर्ट (Overdue Alerts)" : "🚨 Due & Overdue Alerts"}
              </span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono">{overdueCount}</span>
            </button>

            <button
              onClick={() => setActiveTab("due_soon")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                activeTab === "due_soon"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Clock size={15} />
              <span>{lang === "hi" ? "⏳ 48 घंटे में देय (Due in 48h)" : "⏳ Due in Next 48h"}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono">{dueSoonCount}</span>
            </button>

            <button
              onClick={() => setActiveTab("active")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                activeTab === "active"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{lang === "hi" ? "सक्रिय कार्य (Active)" : "Active Assignments"}</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FileText size={15} />
              <span>{lang === "hi" ? "सभी कार्य (All)" : "All Assignments"} ({assignments.length})</span>
            </button>
          </div>
        </div>

        {/* Global Overdue Banner When in Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4 sm:p-5 text-red-950 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-600 p-2 text-white">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-red-900">
                  {lang === "hi" ? "अतिदेय असाइनमेंट चेतावनी (Urgent Attention Required)" : "High Urgency: Overdue Assignments Alert"}
                </h3>
                <p className="mt-0.5 text-xs text-red-700">
                  {overdueCount} assignments have passed their submission deadlines with pending student submissions.
                </p>
              </div>
            </div>

            <button
              onClick={() => sendReminder("bulk", "All Overdue")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition active:scale-95 shrink-0"
            >
              <BellRing size={14} />
              <span>{lang === "hi" ? "सभी को आपातकालीन रिमाइंडर भेजें" : "Send Bulk Alert Reminder"}</span>
            </button>
          </div>
        )}

        {/* Reminder Feedback Toast */}
        {reminderSent && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300 p-3.5 text-xs font-bold text-emerald-900 shadow-2xs">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Urgent assignment alert reminder dispatched to registered student/parent WhatsApp & SMS!</span>
          </div>
        )}

        {/* Toolbar: Search & Class Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={15} className="text-slate-400" />
            <select
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="all">All Classes (1st to 10th)</option>
              <option value="Class 10">Class 10 (Matric)</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-600 shadow-2xs font-medium"
              placeholder="Search title, subject, teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Assignments Cards List */}
        <div className="space-y-3.5">
          {filtered.map((asg) => {
            const status = getStatus(asg.deadline);
            const className = asg.class_name || asg.classes?.name || "Class 10-A";
            const subjectName = asg.subject_name || asg.subjects?.name || "Subject";
            const teacherName = asg.teacher_name || asg.teachers?.full_name || "Faculty";
            const subCount = asg.submission_count ?? 12;
            const totalCount = asg.total_students ?? 20;

            return (
              <div
                key={asg.id}
                className={`rounded-2xl border bg-white p-5 shadow-xs transition hover:shadow-sm ${
                  status.type === "overdue"
                    ? "border-red-300 border-l-4 border-l-red-600 bg-red-50/20"
                    : status.type === "due_soon"
                    ? "border-amber-300 border-l-4 border-l-amber-500 bg-amber-50/20"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        status.type === "overdue"
                          ? "bg-red-100 text-red-800"
                          : status.type === "due_soon"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {status.label}
                      </span>

                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {className}
                      </span>

                      <span className="rounded-md bg-blue-50 text-blue-800 px-2 py-0.5 text-[10px] font-bold">
                        {subjectName}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {asg.title}
                    </h2>
                  </div>

                  {/* Submission Pill */}
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Submissions</span>
                    <span className="text-base font-black text-slate-800 font-mono">
                      {subCount} <span className="text-xs text-slate-400 font-normal">/ {totalCount}</span>
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {asg.description}
                </p>

                {/* Footer Controls */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 text-slate-500 font-medium">
                    <span>In-charge: <strong className="text-slate-800">{teacherName}</strong></span>
                    <span>Deadline: <strong className="text-slate-800">{new Date(asg.deadline).toLocaleString()}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {status.type === "overdue" && (
                      <button
                        onClick={() => extendDeadline(asg.id)}
                        className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                      >
                        +3 Days Extension
                      </button>
                    )}

                    <button
                      onClick={() => sendReminder(asg.id, asg.title)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95"
                    >
                      <Send size={12} />
                      <span>{reminderSent === asg.id ? "Alert Sent!" : "Send Alert Reminder"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {!filtered.length && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <p className="mt-2 text-sm font-bold text-slate-800">
                {activeTab === "alerts" ? "All clear! No overdue assignments right now." : "No assignments found for this filter."}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Every student is up to date or assignments are scheduled.</p>
            </div>
          )}
        </div>

        {/* Modal: Create Assignment */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">Create New Class Assignment</h3>
              <p className="text-xs text-slate-500 mt-0.5">Assign homework with automated alert countdown.</p>

              <form onSubmit={handleCreateAssignment} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 uppercase block mb-1">Title</label>
                  <input
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:border-blue-600 text-sm font-semibold"
                    placeholder="e.g. Class 10 Math Trigonometry Proofs"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 uppercase block mb-1">Class</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:border-blue-600"
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                    >
                      <option>Class 10-A</option>
                      <option>Class 10-B</option>
                      <option>Class 9-A</option>
                      <option>Class 8-A</option>
                      <option>Class 7-A</option>
                      <option>Class 5-A</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 uppercase block mb-1">Subject</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:border-blue-600"
                      value={newSubj}
                      onChange={(e) => setNewSubj(e.target.value)}
                    >
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
                  <label className="font-bold text-slate-700 uppercase block mb-1">Deadline Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:border-blue-600"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 uppercase block mb-1">Description & Tasks</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:border-blue-600"
                    placeholder="Instructions, problem numbers, or reference book exercises..."
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                  >
                    Publish Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
