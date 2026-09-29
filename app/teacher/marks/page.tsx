"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { calculatePercentage, calculatePassFail, calculateGrade } from "@/lib/calculations/academic";

export default function MarksPage() {
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
    const es = examSubjects.find(x => x.id === selected);
    if (!es) return;
    const { data } = await supabase
      .from("marks")
      .select("student_id,marks_obtained,students(full_name,roll_number)")
      .eq("exam_subject_id", selected);
    setStudents(data ?? []);
    setMarks(Object.fromEntries((data ?? []).map((x: any) => [x.student_id, String(x.marks_obtained)])));
  }

  async function save() {
    const es = examSubjects.find(x => x.id === selected);
    if (!es) return;
    const rows = students.map((s: any) => ({
      exam_subject_id: selected,
      student_id: s.student_id,
      marks_obtained: Number(marks[s.student_id] ?? 0)
    }));
    const { error } = await supabase.from("marks").upsert(rows, { onConflict: "exam_subject_id,student_id" });
    if (error) alert(error.message);
    else alert("Marks saved successfully to database.");
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Marks entry</h1>
        <p className="mt-1 text-slate-500">Enter and persist subject marks with validation at the database boundary.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <select className="rounded-lg border p-3" value={selected} onChange={e => { setSelected(e.target.value); setTimeout(load, 0); }}>
            <option value="">Select exam + subject</option>
            {examSubjects.map(x => (
              <option key={x.id} value={x.id}>
                {x.exams?.name} · {x.subjects?.name} · Max {x.maximum_marks}
              </option>
            ))}
          </select>
          <button onClick={load} className="rounded-lg border px-4 font-semibold">Load roster</button>
          <button onClick={save} className="rounded-lg bg-slate-900 px-5 font-semibold text-white">Save marks</button>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((s: any) => {
                const es = examSubjects.find(x => x.id === selected);
                const m = Number(marks[s.student_id] ?? 0);
                const pct = calculatePercentage(m, Number(es?.maximum_marks ?? 100));
                const grade = calculateGrade(pct, [
                  { min_percentage: 90, max_percentage: 100, grade: "A+" },
                  { min_percentage: 80, max_percentage: 89.99, grade: "A" },
                  { min_percentage: 70, max_percentage: 79.99, grade: "B+" },
                  { min_percentage: 60, max_percentage: 69.99, grade: "B" },
                  { min_percentage: 50, max_percentage: 59.99, grade: "C" },
                  { min_percentage: 40, max_percentage: 49.99, grade: "D" },
                  { min_percentage: 0, max_percentage: 39.99, grade: "F" }
                ]);
                return (
                  <tr key={s.student_id}>
                    <td className="px-5 py-4 font-semibold">
                      {s.students?.roll_number} · {s.students?.full_name}
                    </td>
                    <td>
                      <input
                        className="w-28 rounded border p-2"
                        type="number"
                        min="0"
                        max={es?.maximum_marks}
                        value={marks[s.student_id] ?? ""}
                        onChange={e => setMarks({ ...marks, [s.student_id]: e.target.value })}
                      />
                    </td>
                    <td>{pct}%</td>
                    <td>{grade}</td>
                    <td>{calculatePassFail(m, Number(es?.passing_marks ?? 0))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!students.length && <div className="p-12 text-center text-sm text-slate-500">Select an exam subject and load its roster.</div>}
        </div>
      </div>
    </div>
  );
}
