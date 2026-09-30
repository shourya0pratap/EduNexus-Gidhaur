import { createServerSupabase } from "@/lib/supabase/server";
import ResourceExplorer from "@/components/resources/ResourceExplorer";
import Link from "next/link";
import { ArrowLeft, BookOpen, BellRing, FileCheck, School } from "lucide-react";

export default async function PublicResourcesPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("resources")
    .select("*")
    .order("grade_level", { ascending: false });

  const resources = data && data.length > 0 ? data : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Public Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={16} /> Home
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
                ER
              </div>
              <span className="text-sm font-extrabold text-slate-900">EduNexus Resources</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/announcements"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <BellRing size={14} className="text-amber-500" /> Notice Board
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100"
            >
              <FileCheck size={14} /> Report Card
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8">
        <ResourceExplorer initialResources={resources} />
      </main>
    </div>
  );
}
