"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { Plus } from "lucide-react";

export default function ClassesPage() {
  const supabase=createBrowserClient();
  const [classes,setClasses]=useState<any[]>([]);
  const [name,setName]=useState(""); const [year,setYear]=useState("2026-27");
  async function load(){const {data}=await supabase.from("classes").select("id,name,academic_year,sections(id,name)").order("name");setClasses(data??[])}
  useEffect(()=>{load()},[]);
  async function add(){if(!name)return; const {error}=await supabase.from("classes").insert({name,academic_year:year}); if(error)alert(error.message);else{setName("");load()}}
  return <div className="p-5 md:p-8"><div className="mx-auto max-w-6xl">
    <h1 className="text-3xl font-bold">Classes & sections</h1><p className="mt-1 text-slate-500">Maintain academic structure used by enrolment, exams and attendance.</p>
    <div className="mt-6 flex gap-3 rounded-2xl border bg-white p-4"><input className="flex-1 rounded-lg border p-3" placeholder="Class name e.g. 10-A" value={name} onChange={e=>setName(e.target.value)}/><input className="w-32 rounded-lg border p-3" value={year} onChange={e=>setYear(e.target.value)}/><button onClick={add} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 font-semibold text-white"><Plus size={18}/>Add</button></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{classes.map(c=><div key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="font-bold">{c.name}</div><div className="mt-1 text-sm text-slate-500">{c.academic_year}</div><div className="mt-4 text-xs font-semibold uppercase text-slate-400">{c.sections?.length??0} sections</div></div>)}</div>
  </div></div>
}
