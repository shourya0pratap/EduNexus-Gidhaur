"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Home, Users, FolderOpen, CalendarCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createBrowserClient();
  const isTeacher = pathname.startsWith("/teacher");

  async function handleLogout() {
    await supabase.auth.signOut();
    location.href = "/login";
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Drawer Backdrop and Sliding Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          {/* Slide-out drawer */}
          <div className="fixed inset-y-0 left-0 max-w-xs shadow-2xl z-50">
            <Sidebar isMobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        {/* Mobile App Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900">EduNexus</span>
              <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800">
                Gidhaur
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {isTeacher ? "Teacher Portal" : "Admin Panel"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="min-w-0 flex-1">
          {children}
        </main>

        {/* Mobile Application Bottom Navigation Bar (Thumb-reach navigation) */}
        <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 py-2 backdrop-blur-md lg:hidden">
          <Link
            href={isTeacher ? "/teacher" : "/admin"}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              pathname === "/admin" || pathname === "/teacher"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            href={isTeacher ? "/teacher/attendance" : "/admin/attendance"}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              pathname.includes("/attendance")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <CalendarCheck size={20} />
            <span>Attendance</span>
          </Link>

          <Link
            href="/admin/resources"
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              pathname.includes("/resources")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <FolderOpen size={20} />
            <span>Resources</span>
          </Link>

          <Link
            href={isTeacher ? "/teacher/marks" : "/admin/students"}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              pathname.includes("/students") || pathname.includes("/marks")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Users size={20} />
            <span>{isTeacher ? "Marks" : "Students"}</span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-900"
          >
            <Menu size={20} />
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
