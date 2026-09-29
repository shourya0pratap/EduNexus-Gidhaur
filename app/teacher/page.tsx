import Link from "next/link";
import { CalendarCheck, ClipboardEdit, FilePlus2, Upload } from "lucide-react";
export default function TeacherHome(){
  return <div className="p-5 md:p-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold text-slate-500">Teacher workspace</p><h1 className="mt-1 text-3xl font-bold">Your classroom at a glance</h1><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
    ["/teacher/attendance","Take attendance",CalendarCheck],["/teacher/marks","Enter marks",ClipboardEdit],["/teacher/assignments","Create assignment",FilePlus2],["/teacher/resources","Upload resource",Upload]
  ].map(([href,label,Icon]:any)=><Link key={href} href={href} className="rounded-2xl border bg-white p-6 shadow-sm hover:border-slate-400"><Icon size={22}/><div className="mt-4 font-bold">{label}</div><p className="mt-1 text-sm text-slate-500">Open module</p></Link>)}</div></div></div>
}
