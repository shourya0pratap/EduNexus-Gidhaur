"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, CalendarCheck, FileText, FolderOpen, BarChart3, Settings, LogOut, X, Sparkles, ClipboardEdit, Search } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface SidebarProps { onClose?: () => void; isMobile?: boolean; }

export default function Sidebar({ onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const supabase = createBrowserClient();
  const { language, t } = useLanguage();
  const isTeacherRoute = pathname.startsWith("/teacher");

  const adminLinks = [
    { href: "/admin", key: "navDashboard", defaultLabel: "Dashboard", Icon: LayoutDashboard },
    { href: "/admin/students", key: "navStudents", defaultLabel: "Students Roster (600)", Icon: Users },
    { href: "/admin/teachers", key: "navTeachers", defaultLabel: "Faculty & Hierarchy (50)", Icon: GraduationCap },
    { href: "/admin/attendance", key: "navAttendance", defaultLabel: "Teacher & Student Attendance", Icon: CalendarCheck },
    { href: "/admin/assignments", key: "navAssignments", defaultLabel: "Due Assignments & Alerts", Icon: FileText },
    { href: "/admin/resources", key: "navResources", defaultLabel: "Curriculum Resources", Icon: FolderOpen },
    { href: "/admin/classes", key: "navClasses", defaultLabel: "Classes (1st-10th)", Icon: BookOpen },
    { href: "/admin/exams", key: "navExams", defaultLabel: "Examinations", Icon: ClipboardList },
    { href: "/announcements", key: "navAnnouncements", defaultLabel: "Public Notice Board", Icon: Sparkles },
    { href: "/admin/analytics", key: "navAnalytics", defaultLabel: "Analytics", Icon: BarChart3 },
    { href: "/admin/settings", key: "navSettings", defaultLabel: "School Settings", Icon: Settings },
  ];

  const teacherLinks = [
    { href: "/teacher", key: "navDashboard", defaultLabel: "Teacher Home", Icon: LayoutDashboard },
    { href: "/teacher/attendance", key: "navAttendance", defaultLabel: "Take Attendance", Icon: CalendarCheck },
    { href: "/admin/attendance", key: "navFacultyAttendance", defaultLabel: "Faculty Attendance & Sections", Icon: CalendarCheck },
    { href: "/admin/assignments", key: "navAssignments", defaultLabel: "Due Assignments & Alerts", Icon: FileText },
    { href: "/teacher/marks", key: "navExams", defaultLabel: "Enter Marks", Icon: ClipboardEdit },
    { href: "/admin/resources", key: "navResources", defaultLabel: "Curriculum Resources", Icon: FolderOpen },
    { href: "/announcements", key: "navAnnouncements", defaultLabel: "Public Notice Board", Icon: Sparkles },
    { href: "/admin/students", key: "navStudents", defaultLabel: "View Students (600)", Icon: Users },
    { href: "/admin/teachers", key: "navTeachers", defaultLabel: "Faculty & Hierarchy (50)", Icon: GraduationCap }
  ];

  const links = isTeacherRoute ? teacherLinks : adminLinks;

  async function logout() { await supabase.auth.signOut(); location.href = "/login"; }

  return (
    <div className={`flex flex-col h-full bg-[var(--color-card)] ${isMobile ? "w-72 p-[var(--space-sm)]" : "p-[var(--space-sm)]"}`}>
      <div className="flex items-center justify-between px-[var(--space-sm)] py-[var(--space-sm)] border-b border-[var(--color-rule)]">
        <div>
          <div className="flex items-center gap-[var(--space-xs)]"><span className="text-xl font-extrabold tracking-[var(--tracking-display)] text-[var(--color-ink)]">EduNexus</span><span className="rounded bg-[var(--color-accent)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-accent-ink)]">BSEB</span></div><div className="text-xs font-medium text-[var(--color-muted)]">{language === "hi" ? "गिद्धौर सेन्ट्रल स्कूल, जमुई" : "Gidhaur Central School, Jamui"}</div>
        </div>
        {isMobile && <button onClick={onClose} className="rounded-[var(--radius-card)] p-[var(--space-xs)] text-[var(--color-muted)] hover:bg-[var(--color-paper-2)]" aria-label="Close menu"><X size={20} /></button>}
      </div>

      <div className="mx-[var(--space-sm)] mt-[var(--space-sm)] flex items-center justify-between gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-[var(--space-xs)]"><span className="text-[11px] font-bold text-[var(--color-muted)] pl-1">{t("switchLanguage", "Language")}:</span><LanguageSwitcher /></div>

      <div className="mx-[var(--space-sm)] mt-[var(--space-sm)] flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold text-[var(--color-ink)]"><Sparkles size={14} className="text-[var(--color-accent)] shrink-0" /><span className="truncate">{isTeacherRoute ? (language === "hi" ? "शिक्षक कार्यक्षेत्र" : "Teacher Workspace") : (language === "hi" ? "प्रशासकीय पोर्टल (50 शिक्षक, 400 छात्र)" : "Admin Portal (50 Teachers, 400 Students)")}</span></div>

      <nav className="mt-[var(--space-sm)] flex-1 space-y-[var(--space-xs)] overflow-y-auto">
        {links.map(({ href, key, defaultLabel, Icon }) => {
          const active = pathname === href || (href !== "/admin" && href !== "/teacher" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} onClick={onClose} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-sm font-medium transition active:scale-[0.98] ${active ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "text-[var(--color-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"}`}>
              <Icon size={18} /><span>{t(key, defaultLabel)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-[var(--space-sm)] border-t border-[var(--color-rule)] pt-[var(--space-sm)] space-y-[var(--space-xs)]">
        <Link href="/report" onClick={onClose} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-medium text-[var(--color-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"><Search size={14} className="text-[var(--color-accent-2)]" /><span>{t("navReportLookup", "Public Report Lookup")}</span></Link>
      </div>
      <div className="mt-[var(--space-sm)] border-t border-[var(--color-rule)] pt-[var(--space-sm)]"><button onClick={logout} className="flex w-full items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] transition"><LogOut size={18} /><span>{t("navSignOut", "Sign out")}</span></button></div>
    </div>
  );
}
