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

  async function handleLogout() { await supabase.auth.signOut(); location.href = "/login"; }

  return (
    <div className="flex min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-[var(--color-rule)] bg-[var(--color-card)] lg:block">
        <div className="sticky top-0 h-screen"><Sidebar /></div>
      </aside>

      {/* Mobile Drawer Backdrop and Sliding Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-[var(--color-ink)]/50 backdrop-blur-xs transition-opacity" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs shadow-2xl z-50"><Sidebar isMobile onClose={() => setMobileOpen(false)} /></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-rule)] bg-[var(--color-card)] px-4 py-[var(--space-sm)] backdrop-blur-md lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] active:scale-95" aria-label="Open menu"><Menu size={20} /></button>
          <div className="text-center"><div className="flex items-center justify-center gap-[var(--space-xs)]"><span className="font-extrabold tracking-[var(--tracking-display)] text-[var(--color-ink)]">EduNexus</span><span className="rounded bg-[var(--color-accent)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-accent-ink)]">Gidhaur</span></div><p className="text-[11px] text-[var(--color-muted)]">{isTeacher ? "Teacher Portal" : "Admin Panel"}</p></div>
          <div className="flex items-center gap-2"><LanguageSwitcher /><button onClick={handleLogout} className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-paper-2)]" title="Sign out"><LogOut size={18} /></button></div>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
        <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-[var(--color-rule)] bg-[var(--color-card)] py-2 backdrop-blur-md lg:hidden">
          <Link href={isTeacher ? "/teacher" : "/admin"} className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${pathname === "/admin" || pathname === "/teacher" ? "text-[var(--color-accent-2)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`}><Home size={20} /><span>Home</span></Link>
          <Link href={isTeacher ? "/teacher/attendance" : "/admin/attendance"} className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${pathname.includes("/attendance") ? "text-[var(--color-accent-2)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`}><CalendarCheck size={20} /><span>Attendance</span></Link>
          <Link href="/admin/resources" className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${pathname.includes("/resources") ? "text-[var(--color-accent-2)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`}><FolderOpen size={20} /><span>Resources</span></Link>
          <Link href={isTeacher ? "/teacher/marks" : "/admin/students"} className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${pathname.includes("/students") || pathname.includes("/marks") ? "text-[var(--color-accent-2)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`}><Users size={20} /><span>{isTeacher ? "Marks" : "Students"}</span></Link>
          <button onClick={() => setMobileOpen(true)} className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"><Menu size={20} /><span>More</span></button>
        </nav>
      </div>
    </div>
  );
}
