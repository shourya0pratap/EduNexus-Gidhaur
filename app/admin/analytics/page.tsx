import { createServerSupabase } from "@/lib/supabase/server";
import { calculateAttendancePercentage } from "@/lib/calculations/academic";

export default async function AnalyticsPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("attendance").select("status,student_id");
  const rows: any[] = data ?? [];
  const present = rows.filter((x: any) => x.status !== "absent").length;
  const pct = calculateAttendancePercentage(present, rows.length - present, 0);

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-slate-500">Operational metrics from persisted academic data.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-slate-500">Attendance records</p>
            <p className="mt-2 text-3xl font-bold">{rows.length}</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-slate-500">Present / late</p>
            <p className="mt-2 text-3xl font-bold">{present}</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-slate-500">Recorded attendance</p>
            <p className="mt-2 text-3xl font-bold">{pct}%</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="font-bold">Chart layer ready</h2>
          <p className="mt-2 text-sm text-slate-500">
            Operational metrics are live and synchronized with the local database. Classes, examinations, and subject performance can be visualized dynamically.
          </p>
        </div>
      </div>
    </div>
  );
}
