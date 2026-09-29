"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList,
  CalendarCheck, FileText, FolderOpen, BarChart3, Settings, LogOut,
  X, Sparkles, ClipboardEdit, Search
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const supabase = createBrowserClient();
  const { language, t } = useLanguage();
  const isTeacherRoute = pathname.startsWith("/teacher");

  const adminLinks = [
    { href: "/admin", key: "navDashboard", defaultLabel: "Dashboard", Icon: LayoutDashboard },
    { href: "/admin/students", key: "navStudents", defaultLabel: "Students Roster (400)", Icon: Users },
    { href: "/admin/teachers", key: "navTeachers", defaultLabel: "Faculty & Hierarchy (50)", Icon: GraduationCap },
    { href: "/admin/classes", key: "navClasses", defaultLabel: "Classes (1st-10th)", Icon: BookOpen },
    { href: "/admin/exams", key: "navExams", defaultLabel: "Examinations", Icon: ClipboardList },
    { href: "/admin/attendance", key: "navAttendance", defaultLabel: "Daily Attendance", Icon: CalendarCheck },
    { href: "/admin/resources", key: "navResources", defaultLabel: "Curriculum Resources", Icon: FolderOpen },
    { href: "/admin/assignments", key: "navAssignments", defaultLabel: "Assignments", Icon: FileText },
    { href: "/admin/analytics", key: "navAnalytics", defaultLabel: "Analytics", Icon: BarChart3 },
    { href: "/admin/settings", key: "navSettings", defaultLabel: "School Settings", Icon: Settings },
  ];

  const teacherLinks = [
    { href: "/teacher", key: "navDashboard", defaultLabel: "Teacher Home", Icon: LayoutDashboard },
    { href: "/teacher/attendance", key: "navAttendance", defaultLabel: "Take Attendance", Icon: CalendarCheck },
    { href: "/teacher/marks", key: "navExams", defaultLabel: "Enter Marks", Icon: ClipboardEdit },
    { href: "/admin/resources", key: "navResources", defaultLabel: "Curriculum Resources", Icon: FolderOpen },
    { href: "/teacher/assignments", key: "navAssignments", defaultLabel: "Assignments", Icon: FileText },
    { href: "/admin/students", key: "navStudents", defaultLabel: "View Students (400)", Icon: Users },
    { href: "/admin/teachers", key: "navTeachers", defaultLabel: "Faculty & Hierarchy (50)", Icon: GraduationCap }
  ];

  const links = isTeacherRoute ? teacherLinks : adminLinks;

  async function logout() {
    await supabase.auth.signOut();
    location.href = "/login";
  }

  return (
    <div className={`flex flex-col h-full bg-white ${isMobile ? "w-72 p-4" : "p-4"}`}>
      {/* Brand header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">EduNexus</span>
            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
              BSEB
            </span>
          </div>
          <div className="text-xs font-medium text-slate-500">
            {language === "hi" ? "गिद्धौर सेन्ट्रल स्कूल, जमुई" : "Gidhaur Central School, Jamui"}
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Language switcher bar inside sidebar */}
      <div className="mx-3 mt-3 flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-1.5 border border-slate-100">
        <span className="text-[11px] font-bold text-slate-500 pl-1">{t("switchLanguage", "Language")}:</span>
        <LanguageSwitcher />
      </div>

      {/* Role tag */}
      <div className="mx-3 mt-2 flex items-center gap-2 rounded-xl bg-blue-50/70 border border-blue-100 px-3 py-2 text-xs font-semibold text-blue-900">
        <Sparkles size={14} className="text-blue-600 shrink-0" />
        <span className="truncate">
          {isTeacherRoute
            ? (language === "hi" ? "शिक्षक कार्यक्षेत्र" : "Teacher Workspace")
            : (language === "hi" ? "प्रशासकीय पोर्टल (50 शिक्षक, 400 छात्र)" : "Admin Portal (50 Teachers, 400 Students)")}
        </span>
      </div>

      {/* Nav items */}
      <nav className="mt-3 flex-1 space-y-1 overflow-y-auto">
        {links.map(({ href, key, defaultLabel, Icon }) => {
          const active = pathname === href || (href !== "/admin" && href !== "/teacher" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
                active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              <span>{t(key, defaultLabel)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switch role quick links */}
      <div className="mt-2 border-t border-slate-100 pt-2 space-y-1">
        <Link
          href="/report"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          <Search size={14} className="text-blue-600" />
          <span>{t("navReportLookup", "Public Report Lookup")}</span>
        </Link>
      </div>

      {/* Sign out */}
      <div className="mt-2 border-t border-slate-100 pt-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          <span>{t("navSignOut", "Sign out")}</span>
        </button>
      </div>
    </div>
  );
}
