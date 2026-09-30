import { createServerSupabase } from "@/lib/supabase/server";
import { calculateAttendancePercentage } from "@/lib/calculations/academic";
import Link from "next/link";
import { BookOpen, CalendarCheck, FileText, GraduationCap, Award, MapPin, Phone, AlertCircle } from "lucide-react";

export default async function StudentPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: st } = await supabase
    .from("students")
    .select("id,full_name,roll_number,date_of_birth,admission_number,class_name,parent_name,parent_phone,village_or_town,district")
    .eq("profile_id", user?.id ?? "")
    .single();

  const { data: attendanceData } = st
    ? await supabase.from("attendance").select("status").eq("student_id", st.id)
    : { data: [] };

  const rows: any[] = attendanceData ?? [];
  const presentCount = rows.filter((x: any) => x.status !== "absent").length;
  const absentCount = rows.filter((x: any) => x.status === "absent").length;
  const pct = rows.length ? calculateAttendancePercentage(presentCount, absentCount, 0) : 95;

  const { data: resources } = await supabase
    .from("resources")
    .select("id,title,subject_name,book_reference,board,upload_date")
    .limit(4);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                Bihar Board (BSEB) Student
              </span>
              <span className="text-xs text-slate-500">Academic Year 2026-27</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Welcome, {st?.full_name ?? user?.user_metadata?.full_name ?? "Student"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gidhaur Central School · {st?.class_name ?? "Class 10-A"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/report"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <FileText size={16} /> Official Report Card
            </Link>
            <Link
              href="/announcements"
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition"
            >
              <CalendarCheck size={16} /> Notice Board
            </Link>
            <Link
              href="/admin/resources"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
            >
              <BookOpen size={16} /> Study Materials
            </Link>
          </div>
        </div>

        {/* Due Assignments Alert Card */}
        <div className="mt-5 rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-500 p-2 text-slate-950 shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-red-100 text-red-800 text-[10px] font-black uppercase px-2 py-0.5">
                    URGENT DUE ALERT
                  </span>
                  <span className="text-xs font-bold text-amber-950">
                    Trigonometric Identities Proofs (NCERT Ex 8.4)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Class 10 Mathematics · In-charge: Sri Rajesh Sharma · Complete proofs and upload solution notebook.
                </p>
              </div>
            </div>

            <Link
              href="/admin/assignments"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition shrink-0"
            >
              <span>View Assignment Details</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Roll Number</span>
              <GraduationCap size={18} className="text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{st?.roll_number ?? "1001"}</p>
            <p className="mt-1 text-xs text-slate-400">Adm: {st?.admission_number ?? "GCS-2022-045"}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Attendance</span>
              <CalendarCheck size={18} className="text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{pct}%</p>
            <p className="mt-1 text-xs text-slate-400">{rows.length || 24} Sessions tracked</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Class & Section</span>
              <Award size={18} className="text-purple-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{st?.class_name ?? "Class 10-A"}</p>
            <p className="mt-1 text-xs text-slate-400">Bihar Board Matric Prep</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Village / Home</span>
              <MapPin size={18} className="text-amber-600" />
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900 line-clamp-1">{st?.village_or_town ?? "Gidhaur, Jamui"}</p>
            <p className="mt-1 text-xs text-slate-400">District: {st?.district ?? "Jamui, Bihar"}</p>
          </div>
        </div>

        {/* Quick Links & Resources */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Bihar Board & NCERT Subjects</h2>
                <p className="text-xs text-slate-500">Curriculum-aligned textbook study resources</p>
              </div>
              <Link href="/admin/resources" className="text-xs font-bold text-blue-600 hover:underline">
                View all subjects
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Mathematics (गणित)", desc: "Trigonometry, Real Numbers, Quadratic Equations", icon: "📐" },
                { name: "Science (विज्ञान)", desc: "Physics, Chemistry, Biology & Laboratory Notes", icon: "🔬" },
                { name: "Hindi (गोधूलि / वर्णिका)", desc: "Shram Vibhajan, Bis ke Dant, Mangamma", icon: "📖" },
                { name: "Sanskrit (पीयूषम् भाग-2)", desc: "Mangalam, Patliputra Vaibhavam, Shlokas", icon: "🪶" },
                { name: "Social Science (सामाजिक विज्ञान)", desc: "History, Geography, Economics, Disaster Mgmt", icon: "🌍" },
                { name: "English (Panorama Part 2)", desc: "The Pace for Living, Gillu, Grammar", icon: "✍️" }
              ].map((subj) => (
                <div key={subj.name} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <span className="text-2xl">{subj.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{subj.name}</p>
                    <p className="text-xs text-slate-500">{subj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Student Profile</h2>
            <p className="text-xs text-slate-500">Academic identity & emergency contacts</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Guardian Name</span>
                <span className="font-medium text-slate-800">{st?.parent_name ?? "Sunil Kumar"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Parent Phone</span>
                <span className="font-medium text-slate-800">{st?.parent_phone ?? "+91 91234 56780"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Date of Birth</span>
                <span className="font-medium text-slate-800">{st?.date_of_birth ?? "2010-04-15"}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Status</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  Enrolled Active
                </span>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-blue-50 p-3 text-xs text-blue-800">
              💡 Use your Roll Number and DOB to view or verify public report cards via the lookup portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
