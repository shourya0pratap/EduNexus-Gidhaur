"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function ExamsPage() {
  const supabase=createBrowserClient();
  const [exams,setExams]=useState<any[]>([]);
  const [classes,setClasses]=useState<any[]>([]);
  const [form,setForm]=useState({name:"",exam_type:"",class_id:"",academic_year:"2026-27",start_date:"",end_date:""});
  async function load(){const [{data:e},{data:c}]=await Promise.all([supabase.from("exams").select("id,name,exam_type,academic_year,start_date,end_date,status,classes(name)").order("start_date",{ascending:false}),supabase.from("classes").select("id,name").order("name")]);setExams(e??[]);setClasses(c??[])}
  useEffect(()=>{load()},[]);
  async function create(e:React.FormEvent){e.preventDefault();const {error}=await supabase.from("exams").insert(form);if(error)alert(error.message);else{setForm({...form,name:"",exam_type:""});load()}}
  return <div className="p-5 md:p-8"><div className="mx-auto max-w-7xl">
    <h1 className="text-3xl font-bold">Examinations</h1><p className="mt-1 text-slate-500">Create configurable Unit Tests, Cycle Tests, Mid-Terms, Pre-Boards or any custom pattern.</p>
    <form onSubmit={create} className="mt-6 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-3">
      <input required className="rounded-lg border p-3" placeholder="Exam name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input required className="rounded-lg border p-3" placeholder="Exam type" value={form.exam_type} onChange={e=>setForm({...form,exam_type:e.target.value})}/>
      <select required className="rounded-lg border p-3" value={form.class_id} onChange={e=>setForm({...form,class_id:e.target.value})}><option value="">Select class</option>{classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
      <input className="rounded-lg border p-3" type="date" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})}/>
      <input className="rounded-lg border p-3" type="date" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})}/>
      <button className="rounded-lg bg-slate-900 p-3 font-semibold text-white">Create examination</button>
    </form>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{exams.map(e=><div key={e.id} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><div><h2 className="font-bold">{e.name}</h2><p className="text-sm text-slate-500">{e.classes?.name} · {e.exam_type}</p></div><span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{e.status}</span></div><div className="mt-4 text-sm text-slate-500">{e.start_date??"Date not set"}{e.end_date?` → ${e.end_date}`:""}</div></div>)}</div>
  </div></div>
}
