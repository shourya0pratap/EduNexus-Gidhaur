"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function AttendancePage() {
  const supabase = createBrowserClient();
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<Record<string, "present" | "absent" | "late">>({});

  useEffect(() => {
    supabase.from("classes").select("id,name").order("name").then(({ data }: any) => setClasses(data ?? []));
  }, []);

  async function loadStudents() {
    if (!classId) return;
    const { data } = await supabase.from("student_enrollments").select("student_id,roll_number,students(id,full_name)").eq("class_id", classId).eq("is_current", true);
    setStudents(data ?? []);
    setStatus(Object.fromEntries((data ?? []).map((x: any) => [x.student_id, "present"])));
  }

  useEffect(() => {
    loadStudents();
  }, [classId]);

  async function save() {
    if (!classId || !students.length) return alert("Select a class with enrolled students.");
    const subjRes: any = await supabase.from("subjects").select("id").limit(1).single();
    const tchRes: any = await supabase.from("teachers").select("id").limit(1).single();

    const { data: sess, error } = await supabase.from("attendance_sessions").upsert({
      class_id: classId,
      section_id: null,
      subject_id: subjRes.data?.id,
      attendance_date: date,
      teacher_id: tchRes.data?.id
    }, { onConflict: "class_id,section_id,subject_id,attendance_date" }).select("id").single();

    if (error || !sess) return alert(error?.message ?? "Could not create attendance session.");
    const rows = students.map((s: any) => ({
      session_id: sess.id,
      student_id: s.student_id,
      status: status[s.student_id] ?? "present"
    }));
    const r = await supabase.from("attendance").upsert(rows, { onConflict: "session_id,student_id" });
    if (r.error) alert(r.error.message);
    else alert("Attendance saved successfully to database.");
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="mt-1 text-slate-500">Fast roster marking with local persistence and Supabase compatibility.</p>
        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border bg-white p-5">
          <select className="rounded-lg border p-3" value={classId} onChange={e => setClassId(e.target.value)}>
            <option value="">Select class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="rounded-lg border p-3" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <button onClick={() => setStatus(Object.fromEntries(students.map(s => [s.student_id, "present"])))} className="rounded-lg border px-4 py-3 font-semibold">
            Mark all present
          </button>
          <button onClick={save} className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">
            Save attendance
          </button>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-white">
          {students.map((s: any) => (
            <div key={s.student_id} className="flex items-center justify-between border-b p-4 last:border-0">
              <div>
                <span className="mr-3 text-sm text-slate-400">{s.roll_number}</span>
                <span className="font-semibold">{s.students?.full_name ?? s.full_name}</span>
              </div>
              <div className="flex gap-2">
                {(["present", "late", "absent"] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setStatus({ ...status, [s.student_id]: v })}
                    className={`rounded-lg px-3 py-2 text-xs font-bold ${
                      status[s.student_id] === v
                        ? (v === "absent" ? "bg-red-100 text-red-700" : v === "late" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700")
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!students.length && <div className="p-12 text-center text-sm text-slate-500">Select a class to load the roster.</div>}
        </div>
      </div>
    </div>
  );
}
