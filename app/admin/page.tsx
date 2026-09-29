import { createServerSupabase } from "@/lib/supabase/server";
import { Users, GraduationCap, CalendarCheck, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const today = new Date().toISOString().slice(0, 10);

  const [
    { count: students },
    { count: teachers },
    { data: sessions },
    { data: exams }
  ] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("teachers").select("*", { count: "exact", head: true }),
    supabase.from("attendance_sessions").select("id, attendance(status)").eq("attendance_date", today).limit(20),
    supabase.from("exams").select("id,name,exam_type,status,start_date,classes(name)").order("start_date", { ascending: true }).limit(5)
  ]);

  const attendanceRows = sessions?.flatMap((s: any) => s.attendance ?? []) ?? [];
  const attendancePct = attendanceRows.length
    ? Math.round(attendanceRows.filter((x: any) => x.status !== "absent").length / attendanceRows.length * 100)
    : 0;

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-500">School administration</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Good morning, Admin</h1>
          <p className="mt-2 text-slate-500">A live overview of today&apos;s academic operations.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Students" value={students ?? 0} icon={Users}/>
          <StatCard label="Total Teachers" value={teachers ?? 0} icon={GraduationCap}/>
          <StatCard label="Attendance Today" value={`${attendancePct}%`} icon={CalendarCheck} helper="Based on recorded sessions"/>
          <StatCard label="Upcoming Exams" value={exams?.length ?? 0} icon={ClipboardList}/>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Upcoming examinations</h2>
                <p className="mt-1 text-sm text-slate-500">The next scheduled assessments.</p>
              </div>
              <Link href="/admin/exams" className="text-sm font-semibold text-slate-700">View all</Link>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {(exams ?? []).map((exam: any) => (
                <div key={exam.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-semibold">{exam.name}</p>
                    <p className="text-sm text-slate-500">{exam.classes?.name ?? "Class"} · {exam.exam_type}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{exam.status}</span>
                </div>
              ))}
              {!exams?.length && <p className="py-8 text-center text-sm text-slate-500">No upcoming exams.</p>}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Quick actions</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["/admin/students","Add / manage students"],
                ["/admin/exams","Configure an examination"],
                ["/admin/attendance","Review attendance"],
                ["/admin/resources","Manage study resources"]
              ].map(([href,label]) => (
                <Link key={href} href={href} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                  <span className="text-sm font-semibold">{label}</span><ArrowRight size={17}/>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
