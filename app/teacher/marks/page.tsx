"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { calculatePercentage, calculatePassFail, calculateGrade } from "@/lib/calculations/academic";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MarksPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [examSubjects, setExamSubjects] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [marks, setMarks] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from("exam_subjects")
      .select("id,maximum_marks,passing_marks,subjects(name),exams(name)")
      .limit(100)
      .then(({ data }: any) => setExamSubjects(data ?? []));
  }, []);

  async function load() {
    if (!selected) return;
    const es = examSubjects.find((x) => x.id === selected);
    if (!es) return;
    const { data } = await supabase
      .from("marks")
      .select("student_id,marks_obtained,students(full_name,roll_number)")
      .eq("exam_subject_id", selected);
    setStudents(data ?? []);
    setMarks(
      Object.fromEntries(
        (data ?? []).map((x: any) => [x.student_id, String(x.marks_obtained)])
      )
    );
  }

  async function save() {
    const es = examSubjects.find((x) => x.id === selected);
    if (!es) return;
    const rows = students.map((s: any) => ({
      exam_subject_id: selected,
      student_id: s.student_id,
      marks_obtained: Number(marks[s.student_id] ?? 0),
    }));
    const { error } = await supabase.from("marks").upsert(rows, {
      onConflict: "exam_subject_id,student_id",
    });
    if (error) alert(error.message);
    else alert(L("अंक डेटाबेस में सफलतापूर्वक सहेज लिए गए।", "Marks saved successfully to database."));
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]">
      <div className="container">
        <h1 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">
          {L("अंक प्रविष्टि", "Marks entry")}
        </h1>
        <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">
          {L("डेटाबेस सीमा पर सत्यापन के साथ विषय अंक दर्ज और बनाए रखें।", "Enter and persist subject marks with validation at the database boundary.")}
        </p>
        <div className="mt-[var(--space-md)] flex flex-wrap gap-[var(--space-sm)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]">
          <select
            className="rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-sm)] text-[var(--text-md)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setTimeout(load, 0);
            }}
          >
            <option value="">{L("परीक्षा + विषय चुनें", "Select exam + subject")}</option>
            {examSubjects.map((x) => (
              <option key={x.id} value={x.id}>
                {x.exams?.name} · {x.subjects?.name} · Max {x.maximum_marks}
              </option>
            ))}
          </select>
          <button
            onClick={load}
            className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-xs)] font-semibold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition"
          >
            {L("रोस्टर लोड करें", "Load roster")}
          </button>
          <button
            onClick={save}
            className="rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] font-[var(--font-body)] font-600 text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition"
          >
            {L("अंक सेव करें", "Save marks")}
          </button>
        </div>
        <div className="mt-[var(--space-md)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
          <table className="w-full text-left text-[var(--text-sm)]">
            <thead className="bg-[var(--color-paper-2)]">
              <tr>
                <th className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--color-ink-2)] font-semibold text-[var(--text-xs)] uppercase tracking-[var(--tracking-display)]">
                  Student
                </th>
                <th className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--color-ink-2)] font-semibold text-[var(--text-xs)] uppercase tracking-[var(--tracking-display)]">
                  Marks
                </th>
                <th className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--color-ink-2)] font-semibold text-[var(--text-xs)] uppercase tracking-[var(--tracking-display)]">
                  Percentage
                </th>
                <th className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--color-ink-2)] font-semibold text-[var(--text-xs)] uppercase tracking-[var(--tracking-display)]">
                  Grade
                </th>
                <th className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--color-ink-2)] font-semibold text-[var(--text-xs)] uppercase tracking-[var(--tracking-display)]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-rule)]">
              {students.map((s: any) => {
                const es = examSubjects.find((x) => x.id === selected);
                const m = Number(marks[s.student_id] ?? 0);
                const pct = calculatePercentage(m, Number(es?.maximum_marks ?? 100));
                const grade = calculateGrade(pct, [
                  { min_percentage: 90, max_percentage: 100, grade: "A+" },
                  { min_percentage: 80, max_percentage: 89.99, grade: "A" },
                  { min_percentage: 70, max_percentage: 79.99, grade: "B+" },
                  { min_percentage: 60, max_percentage: 69.99, grade: "B" },
                  { min_percentage: 50, max_percentage: 59.99, grade: "C" },
                  { min_percentage: 40, max_percentage: 49.99, grade: "D" },
                  { min_percentage: 0, max_percentage: 39.99, grade: "F" },
                ]);
                return (
                  <tr key={s.student_id}>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] font-semibold text-[var(--color-ink)]">
                      {s.students?.roll_number} · {s.students?.full_name}
                    </td>
                    <td>
                      <input
                        className="w-28 rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)]"
                        type="number"
                        min="0"
                        max={es?.maximum_marks}
                        value={marks[s.student_id] ?? ""}
                        onChange={(e) => setMarks({ ...marks, [s.student_id]: e.target.value })}
                      />
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] text-[var(--color-ink-2)]">
                      {pct}%
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] text-[var(--color-ink)]">
                      {grade}
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] text-[var(--color-ink-2)]">
                      {calculatePassFail(m, Number(es?.passing_marks ?? 0))}
                    </td>
                  </tr>
                );
              })}
              {!students.length && (
                <tr>
                  <td colSpan={5} className="p-[var(--space-2xl)] text-center text-[var(--text-sm)] text-[var(--color-muted)]">
                    {L("अपना रोस्टर लोड करने के लिए एक परीक्षा विषय चुनें।", "Select an exam subject and load its roster.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
