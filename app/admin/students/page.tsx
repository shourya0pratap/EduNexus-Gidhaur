"use client";

import { useEffect, useState } from "react";
import {
  Plus, Search, UserRound, X, ChevronLeft, ChevronRight,
  Filter, MapPin, Phone, GraduationCap, Sparkles
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type Student = {
  id: string;
  full_name: string;
  roll_number: string;
  date_of_birth: string;
  admission_number: string | null;
  parent_name: string | null;
  parent_phone?: string;
  village_or_town?: string;
  class_id?: string;
  class_name?: string;
  section_name?: string;
  is_active: boolean;
};

export default function StudentsPage() {
  const { language, t } = useLanguage();
  const supabase = createBrowserClient();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    roll_number: "",
    date_of_birth: "",
    admission_number: "",
    parent_name: "",
    parent_phone: "",
    village_or_town: "",
    class_name: "Class 10-A",
    section_name: "Section A"
  });

  async function load() {
    const { data } = await supabase
      .from("students")
      .select("id,full_name,roll_number,date_of_birth,admission_number,parent_name,parent_phone,village_or_town,class_id,class_name,section_name,is_active")
      .order("roll_number", { ascending: true })
      .limit(500);

    setStudents(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createStudent(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("students").insert(form);
    setBusy(false);
    if (error) return alert(error.message);
    setForm({
      full_name: "",
      roll_number: "",
      date_of_birth: "",
      admission_number: "",
      parent_name: "",
      parent_phone: "",
      village_or_town: "",
      class_name: "Class 10-A",
      section_name: "Section A"
    });
    setOpen(false);
    load();
  }

  async function deactivate(id: string) {
    if (!confirm(language === "hi" ? "क्या आप इस छात्र को निष्क्रिय करना चाहते हैं?" : "Deactivate this student?")) return;
    await supabase.from("students").update({ is_active: false }).eq("id", id);
    load();
  }

  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filtered = students.filter((s) => {
    // Grade filter
    if (selectedGrade !== "all") {
      const targetPrefix = String(selectedGrade).padStart(2, "0");
      if (!s.roll_number.startsWith(targetPrefix)) {
        return false;
      }
    }

    // Section filter
    if (selectedSection !== "all") {
      if (s.section_name && !s.section_name.includes(selectedSection)) {
        return false;
      }
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        s.full_name.toLowerCase().includes(q) ||
        s.roll_number.toLowerCase().includes(q) ||
        (s.admission_number && s.admission_number.toLowerCase().includes(q)) ||
        (s.village_or_town && s.village_or_town.toLowerCase().includes(q)) ||
        (s.parent_name && s.parent_name.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Banner */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles size={14} className="text-amber-400" />
                <span>
                  {language === "hi"
                    ? "स्थानीय डेटाबेस इंजन — 400 छात्र प्रणाली"
                    : "Local Persistent Engine — 400 Student System"}
                </span>
              </div>
              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
                {language === "hi" ? "छात्र नामावली एवं अभिलेख" : "Students Roster & Records"}
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                {language === "hi"
                  ? "कक्षा 1 से 10वीं तक (प्रत्येक कक्षा 40 छात्र, प्रभाग क एवं ख)। जमुई एवं गिद्धौर के प्रामाणिक छात्र अभिलेख।"
                  : "Complete 400 student database across Classes 1st through 10th (40 per grade, Sections A & B). Authentic Bihar state student records."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs md:text-sm font-bold text-slate-950 shadow-sm transition active:scale-95"
              >
                <Plus size={18} /> {t("addStudent", "Add Student")}
              </button>
            </div>
          </div>

          {/* Quick Counter Pills */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">
              🎓 {students.length} {language === "hi" ? "कुल नामांकित छात्र" : "Enrolled Students"}
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">
              🏫 10 {language === "hi" ? "कक्षाएँ (1ली - 10वीं)" : "Grades (1st - 10th)"}
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">
              📍 {language === "hi" ? "जमुई, गिद्धौर, गांगरा, सेवा, झाझा" : "Jamui, Gidhaur, Gangra, Seva"}
            </span>
          </div>
        </div>

        {/* Grade Filter Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter size={14} /> {t("filterByClass", "Filter by Grade")}
            </span>
            <span className="text-xs text-slate-400">
              {language === "hi" ? "प्रत्येक कक्षा में 40 छात्र" : "40 Students per Grade"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => { setSelectedGrade("all"); setCurrentPage(1); }}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedGrade === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("allClasses", "All (400 Students)")}
            </button>
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => { setSelectedGrade(grade); setCurrentPage(1); }}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  selectedGrade === grade
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Class {grade} {grade === 10 ? (language === "hi" ? "⭐ मैट्रिक" : "⭐ Matric") : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Section Filter */}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              className="w-full text-sm outline-none placeholder:text-slate-400"
              placeholder={
                language === "hi"
                  ? "छात्र का नाम, रोल नंबर, नामांकन संख्या या गाँव द्वारा खोजें..."
                  : "Search student name, roll number, admission number, village..."
              }
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">
                {language === "hi" ? "हटाएँ" : "Clear"}
              </button>
            )}
          </div>

          <select
            value={selectedSection}
            onChange={(e) => { setSelectedSection(e.target.value); setCurrentPage(1); }}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none shadow-xs"
          >
            <option value="all">{language === "hi" ? "सभी प्रभाग (A व B)" : "All Sections (A & B)"}</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        {/* Results Counter & Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-semibold px-1">
          <span>
            {language === "hi"
              ? `दिखाए जा रहे हैं: ${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, filtered.length)} (कुल ${filtered.length} में से)`
              : `Showing ${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, filtered.length)} of ${filtered.length} students`}
          </span>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft size={14} /> {language === "hi" ? "पिछला" : "Previous"}
              </button>
              <span className="text-slate-600">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                {language === "hi" ? "अगला" : "Next"} <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Students Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Roll No</th>
                  <th className="px-5 py-3.5">Student Name</th>
                  <th className="px-5 py-3.5">Class & Section</th>
                  <th className="px-5 py-3.5">Date of Birth</th>
                  <th className="px-5 py-3.5">Parent & Village (Bihar)</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-mono text-xs font-extrabold text-blue-700">
                      {s.roll_number}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                          <UserRound size={16} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{s.full_name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{s.admission_number ?? "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                        {s.class_name || `Class ${s.roll_number.slice(0, 2)}`}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium text-slate-600">
                      {s.date_of_birth}
                    </td>
                    <td className="px-5 py-3.5 text-xs">
                      <div className="font-semibold text-slate-800">{s.parent_name ?? "Parent"}</div>
                      {s.village_or_town && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <MapPin size={11} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{s.village_or_town}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          s.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {s.is_active ? (language === "hi" ? "सक्रिय" : "Active") : (language === "hi" ? "निष्क्रिय" : "Inactive")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {s.is_active && (
                        <button
                          onClick={() => deactivate(s.id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800"
                        >
                          {language === "hi" ? "निष्क्रिय करें" : "Deactivate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!filtered.length && (
            <div className="p-12 text-center text-sm text-slate-500">
              <UserRound size={36} className="mx-auto text-slate-300" />
              <h3 className="mt-3 font-bold text-slate-800">
                {language === "hi" ? "कोई छात्र नहीं मिला" : "No students found"}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {language === "hi" ? "कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।" : "Try adjusting your search criteria."}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <form onSubmit={createStudent} className="w-full max-w-xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">
                {language === "hi" ? "नया छात्र नामांकित करें" : "Add Student to Roster"}
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs font-semibold text-slate-700">
              <div>
                <label>Full Name (छात्र का नाम)</label>
                <input
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>

              <div>
                <label>Roll Number (4 डिजिट, e.g. 1041)</label>
                <input
                  required
                  placeholder="e.g. 1041"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.roll_number}
                  onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
                />
              </div>

              <div>
                <label>Date of Birth (जन्म तिथि)</label>
                <input
                  required
                  type="date"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.date_of_birth}
                  onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                />
              </div>

              <div>
                <label>Class & Section</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.class_name}
                  onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                >
                  {grades.map((g) => (
                    <option key={g} value={`Class ${g}-A`}>Class {g}-A</option>
                  ))}
                  {grades.map((g) => (
                    <option key={`b-${g}`} value={`Class ${g}-B`}>Class {g}-B</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Parent Name (अभिभावक का नाम)</label>
                <input
                  placeholder="e.g. Binod Kumar Singh"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.parent_name}
                  onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                />
              </div>

              <div>
                <label>Parent Phone (फ़ोन नंबर)</label>
                <input
                  placeholder="+91 98351 xxxxx"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.parent_phone}
                  onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label>Village / Town, District (गाँव / पता, बिहार)</label>
                <input
                  placeholder="e.g. Vill Gangra, Gidhaur, Jamui, Bihar"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 font-normal outline-none"
                  value={form.village_or_town}
                  onChange={(e) => setForm({ ...form, village_or_town: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={busy}
              className="mt-6 w-full rounded-xl bg-slate-900 p-3 text-xs font-bold text-white shadow-sm disabled:opacity-50"
            >
              {busy ? "Saving to Local DB..." : t("save", "Create Student")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
