import { createServerSupabase } from "@/lib/supabase/server";

export default async function AssignmentsPage() {
  const supabase=await createServerSupabase();
  const {data}=await supabase.from("assignments").select("id,title,description,deadline,classes(name),subjects(name),teachers(full_name)").order("deadline",{ascending:true}).limit(100);
  const now=new Date();
  return <div className="p-5 md:p-8"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold">Assignments</h1><p className="mt-1 text-slate-500">Homework and assignment deadlines across classes.</p><div className="mt-6 overflow-hidden rounded-2xl border bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Assignment</th><th>Class</th><th>Subject</th><th>Deadline</th><th>Status</th></tr></thead><tbody className="divide-y">{(data??[]).map((a:any)=>{const overdue=a.deadline&&new Date(a.deadline)<now;return <tr key={a.id}><td className="px-5 py-4 font-semibold">{a.title}</td><td>{a.classes?.name}</td><td>{a.subjects?.name}</td><td>{a.deadline?new Date(a.deadline).toLocaleString():"—"}</td><td><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${overdue?"bg-red-50 text-red-700":"bg-green-50 text-green-700"}`}>{overdue?"Overdue":"Upcoming"}</span></td></tr>})}</tbody></table>{!data?.length&&<div className="p-12 text-center text-sm text-slate-500">No assignments available.</div>}</div></div></div>
}
