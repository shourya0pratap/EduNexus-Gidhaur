"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function SettingsPage() {
  const supabase=createBrowserClient();
  const [id,setId]=useState(""); const [form,setForm]=useState<any>({});
  useEffect(()=>{supabase.from("school_settings").select("*").limit(1).single().then(({data}: any)=>{if(data){setId(data.id);setForm(data)}})},[]);
  async function save(){const {error}=await supabase.from("school_settings").update(form).eq("id",id);if(error)alert(error.message);else alert("School settings saved.");}
  const fields=[["school_name","School name"],["address","Address"],["phone","Phone"],["email","Email"],["website","Website"],["principal_name","Principal name"],["attendance_threshold","Attendance threshold"]];
  return <div className="p-5 md:p-8"><div className="mx-auto max-w-3xl"><h1 className="text-3xl font-bold">School settings</h1><p className="mt-1 text-slate-500">Branding and operational defaults used throughout the platform.</p><div className="mt-6 rounded-2xl border bg-white p-6">{fields.map(([k,l])=><label key={k} className="mt-4 block text-sm font-semibold first:mt-0">{l}<input className="mt-1 w-full rounded-lg border p-3 font-normal" value={form[k]??""} onChange={e=>setForm({...form,[k]:k==="attendance_threshold"?Number(e.target.value):e.target.value})}/></label>)}<button onClick={save} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">Save settings</button></div></div></div>
}
