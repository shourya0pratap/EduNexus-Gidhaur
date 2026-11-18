"use client";

import { useEffect, useState } from "react";
import { Plus, Search, UserRound, X, ChevronLeft, ChevronRight, Filter, MapPin, Phone, GraduationCap, Sparkles } from "lucide-react";
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
  const { language } = useLanguage();
  const L = (hi: string, en: string) => (language === "hi" ? hi : en);
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
    section_name: "Section A",
  });

  async function load() {
    try {
      const res = await fetch("/api/local-db?table=students");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length >= 600) {
          setStudents(json);
          return;
        }
      }
    } catch {}
    const { data } = await supabase
      .from("students")
      .select(
        "id,full_name,roll_number,date_of_birth,admission_number,parent_name,parent_phone,village_or_town,class_id,class_name,section_name,is_active"
      )
      .order("roll_number", { ascending: true })
      .limit(2000);
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
      section_name: "Section A",
    });
    setOpen(false);
    load();
  }

  async function deactivate(id: string) {
    if (
      !confirm(L("क्या आप इस छात्र को निष्क्रिय करना चाहते हैं?", "Deactivate this student?"))
    )
      return;
    await supabase.from("students").update({ is_active: false }).eq("id", id);
    load();
  }

  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filtered = students.filter((s) => {
    if (selectedGrade !== "all") {
      const targetPrefix = String(selectedGrade).padStart(2, "0");
      if (!s.roll_number.startsWith(targetPrefix)) return false;
    }
    if (selectedSection !== "all") {
      if (s.section_name && !s.section_name.includes(selectedSection)) return false;
    }
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
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">
      <div className="container">
        <div className="mx-auto max-w-7xl space-y-[var(--space-lg)]">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-md)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-md)]">
              <div>
                <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md">
                  <Sparkles size={14} className="text-[var(--color-accent-2)]" />
                  <span>
                    {L("स्थानीय डेटाबेस इंजन — 600 छात्र प्रणाली", "Local Persistent Engine — 600 Student System")}
                  </span>
                </div>
                <h1 className="mt-[var(--space-xs)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)] leading-[1.05]">
                  {L("छात्र नामावली एवं अभिलेख", "Students Roster & Records")}
                </h1>
                <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80">
                  {L("कक्षा 1 से 10वीं तक (प्रत्येक कक्षा 60 छात्र, प्रभाग क, ख एवं ग)। जमुई एवं गिद्धौर के प्रामाणिक छात्र अभिलेख।", "Complete 600 student database across Classes 1st through 10th (60 per grade, Sections A, B & C). Authentic Bihar state student records.")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-xs)]">
                <LanguageSwitcher />
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-2)] hover:bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] md:text-sm font-bold text-[var(--color-accent-ink)] shadow-[var(--shadow-card)] transition active:scale-95"
                >
                  <Plus size={18} />
                  <span>{L("छात्र जोड़ें", "Add Student")}</span>
                </button>
              </div>
            </div>
            <div className="mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-card)]/20 flex flex-wrap gap-[var(--space-xs)] text-[var(--text-xs)]">
              <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">
                {L("कुल नामांकित छात्र", "Enrolled Students")}: {students.length}
              </span>
              <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">
                {L("कक्षाएं (1वीं - 10वीं)", "Grades (1st - 10th)")}: {10}
              </span>
              <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">
                {L("जमुई, गिद्धौर, गांगरा, सेवा", "Jamui, Gidhaur, Gangra, Seva")}
              </span>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-[var(--space-xs)]">
              <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] flex items-center gap-[var(--space-xs)]">
                <Filter size={14} /> {L("कक्षा के अनुसार फ़िल्टर", "Filter by Grade")}
              </span>
              <span className="text-[var(--text-xs)] text-[var(--color-muted)]">
                {L("प्रत्येक कक्षा में 60 छात्र (प्रभाग A, B, C)", "60 Students per Grade (Sec A, B, C)")}
              </span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)] overflow-x-auto pb-[var(--space-xs)] scrollbar-thin">
              <button
                onClick={() => {
                  setSelectedGrade("all");
                  setCurrentPage(1);
                }}
                className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedGrade === "all" ? "bg-[var(--color-ink)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}
              >
                {L("सभी (600 छात्र)", "All (600 Students)")}
              </button>
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => {
                    setSelectedGrade(grade);
                    setCurrentPage(1);
                  }}
                  className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedGrade === grade ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}
                >
                  Class {grade} {grade === 10 && <span className="text-[10px] text-[var(--color-accent-2)] font-extrabold">★</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-[var(--space-sm)] sm:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] shadow-[var(--shadow-card)]">
              <Search size={18} className="text-[var(--color-muted)] shrink-0" />
              <input
                className="w-full text-[var(--text-sm)] outline-none placeholder:text-[var(--color-muted)]"
                placeholder={L("छात्र का नाम, रोल नंबर, नामांकन संख्या या गाँव द्वारा खोजें...", "Search student name, roll number, admission number, village...")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-[var(--text-xs)]"
                >
                  {L("हटाएँ", "Clear")}
                </button>
              )}
            </div>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-sm)] font-semibold text-[var(--color-ink-2)] outline-none shadow-[var(--shadow-card)]"
            >
              <option value="all">{L("सभी प्रभाग (A व B)", "All Sections (A & B)")}</option>
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-muted)] font-semibold px-1">
            <span>
              {L("दिखाए जा रहे हैं: ", "Showing ")}{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filtered.length)} {L("कुल में से", "of")} {filtered.length} {L("छात्र", "students")}
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-[var(--space-xs)]">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40 hover:bg-[var(--color-paper-2)]"
                >
                  <ChevronLeft size={14} /> {L("पिछला", "Previous")}
                </button>
                <span className="text-[var(--color-ink-2)]">{currentPage} / {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40 hover:bg-[var(--color-paper-2)]"
                >
                  {L("अगला", "Next")} <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[var(--text-sm)]">
                <thead className="bg-[var(--color-paper-2)] text-[11px] uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] font-bold border-b border-[var(--color-rule)]">
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
                  {paginated.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--color-paper-2)]/50 transition">
                      <td className="px-[var(--space-sm)] py-[var(--space-md)] font-[var(--font-outlier)] text-[var(--text-xs)] font-extrabold text-[var(--color-accent-2)]">
                        {s.roll_number}
                      </td>
                      <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                        <div className="flex items-center gap-[var(--space-xs)]">
                          <div className="rounded-full bg-[var(--color-paper-2)] p-[var(--space-xs)] text-[var(--color-muted)]">
                            <UserRound size={16} />
                          </div>
                          <div>
                            <div className="font-bold text-[var(--color-ink)]">{s.full_name}</div>
                            <div className="text-[11px] font-[var(--font-outlier)] text-[var(--color-muted)]">
                              {s.admission_number ?? "—"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                        <span className="rounded-[var(--radius-pill)] bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-muted)]">
                          {s.class_name || `Class ${s.roll_number.slice(0, 2)}`}
                        </span>
                      </td>
                      <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)]">
                        {s.date_of_birth}
                      </td>
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
                          {s.is_active ? (language === "hi" ? "सक्रिय" : "Active") : (language === "hi" ? "निष्क्रिय" : "Inactive")}
                        </span>
                      </td>
                      <td className="px-[var(--space-sm)] py-[var(--space-md)] text-right">
                        {s.is_active && (
                          <button
                            onClick={() => deactivate(s.id)}
                            className="text-[var(--text-xs)] font-bold text-[var(--color-danger)] hover:text-[var(--color-accent-2)]"
                          >
                            {language === "hi" ? "निष्क्रिय करें" : "Deactivate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={7} className="p-[var(--space-2xl)] text-center text-[var(--text-sm)] text-[var(--color-muted)]">
                        <UserRound size={36} className="mx-auto text-[var(--color-muted)]" />
                        <h3 className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{L("कोई छात्र नहीं मिला", "No students found")}</h3>
                        <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।", "Try adjusting your search criteria.")}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-[var(--space-md)]">
                <span className="text-[var(--text-xs)] text-[var(--color-muted)]">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-[var(--space-xs)]">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)] disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/40 p-[var(--space-md)] backdrop-blur-xs">
              <form
                onSubmit={createStudent}
                className="w-full max-w-xl rounded-[var(--radius-card)] bg-[var(--color-card)] p-[var(--space-md)] md:p-[var(--space-lg)] shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-[var(--space-sm)]">
                  <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-ink)]">{L("नया छात्र नामांकित करें", "Add Student to Roster")}</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-[var(--radius-card)] p-[var(--space-xs)] text-[var(--color-muted)] hover:bg-[var(--color-paper-2)]"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] sm:grid-cols-2 text-[var(--text-xs)] font-semibold text-[var(--color-ink-2)]">
                  <div>
                    <label>Full Name (छात्र का नाम)</label>
                    <input
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Roll Number (4 डिजिट, e.g. 1041)</label>
                    <input
                      required
                      placeholder="e.g. 1041"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.roll_number}
                      onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Date of Birth (जन्म तिथि)</label>
                    <input
                      required
                      type="date"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.date_of_birth}
                      onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Class & Section</label>
                    <select
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.class_name}
                      onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                    >
                      {grades.map((g) => (
                        <option key={g} value={`Class ${g}-A`}>
                          Class {g}-A
                        </option>
                      ))}
                      {grades.map((g) => (
                        <option key={`b-${g}`} value={`Class ${g}-B`}>
                          Class {g}-B
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Parent Name (अभिभावक का नाम)</label>
                    <input
                      placeholder="e.g. Binod Kumar Singh"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.parent_name}
                      onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Parent Phone (फ़ोन नंबर)</label>
                    <input
                      placeholder="+91 98351 xxxxx"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.parent_phone}
                      onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label>Village / Town, District (गाँव / पता, बिहार)</label>
                    <input
                      placeholder="e.g. Vill Gangra, Gidhaur, Jamui, Bihar"
                      className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-normal outline-none"
                      value={form.village_or_town}
                      onChange={(e) => setForm({ ...form, village_or_town: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  disabled={busy}
                  className="mt-[var(--space-md)] w-full rounded-[var(--radius-card)] bg-[var(--color-ink)] p-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] shadow-[var(--shadow-card)] disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {busy ? "Saving to Local DB..." : L("छात्र बनाएं", "Create Student")}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
