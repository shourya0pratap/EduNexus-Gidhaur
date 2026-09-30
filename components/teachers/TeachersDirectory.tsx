"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, Search, Shield, Award, Users, Filter,
  Layers, Phone, Mail, CheckCircle2, ChevronRight, BookOpen,
  Sparkles, Star, Building2, UserCheck
} from "lucide-react";
import { Teacher } from "@/lib/local-db/initial-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface TeachersDirectoryProps {
  teachers: Teacher[];
}

export default function TeachersDirectory({ teachers }: TeachersDirectoryProps) {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filtered = teachers.filter((t) => {
    if (selectedLevel !== "all" && t.hierarchy_level !== selectedLevel) {
      return false;
    }
    if (selectedRole === "coordinators" && !t.coordinator_role) {
      return false;
    }
    if (selectedRole === "hods" && !t.designation.includes("HOD")) {
      return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        t.full_name.toLowerCase().includes(q) ||
        t.employee_code.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        t.specialization.toLowerCase().includes(q) ||
        (t.subjects && t.subjects.some((s) => s.toLowerCase().includes(q))) ||
        t.classes_assigned.some((c) => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const firstCoordinator = teachers.find((t) => t.coordinator_role === "1st_class_coordinator") || teachers[2];
  const secondCoordinator = teachers.find((t) => t.coordinator_role === "2nd_class_coordinator") || teachers[3];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
              <Award size={14} className="text-amber-400" />
              <span>
                {language === "hi"
                  ? "गिद्धौर सेन्ट्रल स्कूल — 50 सदस्यीय संकाय एवं प्रशासनिक पदानुक्रम"
                  : "Gidhaur Central School — 50 Faculty Members & Institutional Hierarchy"}
              </span>
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
              {language === "hi"
                ? "शिक्षक पदानुक्रम एवं कक्षा समन्वयक प्रणाली"
                : "Faculty Hierarchy & Class Coordinators Framework"}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === "hi"
                ? "संस्थान के 50 शिक्षकों का स्तरबद्ध पदानुक्रम। प्रथम एवं द्वितीय कक्षा समन्वयकों को विशेष प्रशासनिक, परीक्षा निरीक्षण एवं संकाय समन्वय नियंत्रण प्राप्त है।"
                : "Complete governance and hierarchy across all 50 educators. 1st & 2nd Class Coordinators hold designated higher administrative oversight, moderation, and wing supervision powers."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/attendance"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition active:scale-95"
            >
              <UserCheck size={16} />
              <span>{language === "hi" ? "शिक्षक उपस्थिति व प्रभाग प्रबंधन" : "Teacher Attendance & Section In-Charge"}</span>
            </Link>
            <LanguageSwitcher />
            <div className="rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md text-xs">
              <span className="font-bold text-amber-400 text-sm">50</span>
              <span className="text-slate-300 ml-1.5">{language === "hi" ? "कुल शिक्षक" : "Total Faculty"}</span>
            </div>
          </div>
        </div>

        {/* Highlighted Class Coordinators Privilege Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid gap-3 sm:grid-cols-2">
          {/* 1st Class Coordinator Spotlight */}
          {firstCoordinator && (
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 p-4 border border-amber-400/30 backdrop-blur-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                  {language === "hi" ? "★ प्रथम कक्षा समन्वयक (उच्च नियंत्रण)" : "★ 1st Class Coordinator (Higher Control)"}
                </span>
                <span className="text-xs text-amber-300 font-bold">{firstCoordinator.employee_code}</span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-white">
                {firstCoordinator.full_name}
              </h3>
              <p className="text-xs text-amber-200 mt-0.5">{firstCoordinator.designation}</p>
              <div className="mt-2 text-[11px] text-slate-200 leading-relaxed bg-black/20 p-2 rounded-lg">
                <span className="font-bold text-amber-300">
                  {language === "hi" ? "उच्च प्रशासनिक नियंत्रण: " : "Higher Administrative Control: "}
                </span>
                {firstCoordinator.control_level || "Direct Senior Wing Moderation & Disciplinary Authority"}
              </div>
            </div>
          )}

          {/* 2nd Class Coordinator Spotlight */}
          {secondCoordinator && (
            <div className="rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/10 p-4 border border-blue-400/30 backdrop-blur-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-blue-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                  {language === "hi" ? "★ द्वितीय कक्षा समन्वयक (उच्च नियंत्रण)" : "★ 2nd Class Coordinator (Higher Control)"}
                </span>
                <span className="text-xs text-blue-300 font-bold">{secondCoordinator.employee_code}</span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-white">
                {secondCoordinator.full_name}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">{secondCoordinator.designation}</p>
              <div className="mt-2 text-[11px] text-slate-200 leading-relaxed bg-black/20 p-2 rounded-lg">
                <span className="font-bold text-blue-300">
                  {language === "hi" ? "माध्यमिक प्रभाग नियंत्रण: " : "Middle Wing Control: "}
                </span>
                {secondCoordinator.control_level || "Curriculum Audit, Attendance Reviews & Teacher Evaluation"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hierarchy Level Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Layers size={15} />
            <span>{language === "hi" ? "पदानुक्रम स्तर चुनें" : "Filter by Hierarchy Level"}</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === "cards" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              {language === "hi" ? "कार्ड दृश्य" : "Cards View"}
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              {language === "hi" ? "तालिका दृश्य" : "Table View"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => { setSelectedLevel("all"); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              selectedLevel === "all" && selectedRole === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "सभी शिक्षक (50)" : "All Faculty (50)"}
          </button>

          <button
            onClick={() => { setSelectedLevel(1); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              selectedLevel === 1
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "स्तर 1: संस्थान नेतृत्व" : "Level 1: Executive (2)"}
          </button>

          <button
            onClick={() => { setSelectedLevel(2); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              selectedLevel === 2
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
          >
            {language === "hi" ? "स्तर 2: मुख्य कक्षा समन्वयक (1st & 2nd)" : "Level 2: Chief Coordinators (4)"}
          </button>

          <button
            onClick={() => { setSelectedLevel(3); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              selectedLevel === 3
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "स्तर 3: विभागाध्यक्ष (HODs)" : "Level 3: Department HODs (8)"}
          </button>

          <button
            onClick={() => { setSelectedLevel(4); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              selectedLevel === 4
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "स्तर 4: वरिष्ठ विषय शिक्षक (8वीं-10वीं)" : "Level 4: Senior Faculty (18)"}
          </button>

          <button
            onClick={() => { setSelectedLevel(5); setSelectedRole("all"); }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              selectedLevel === 5
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "स्तर 5: प्राथमिक व माध्यमिक शिक्षक (1ली-7वीं)" : "Level 5: Middle & Primary (18)"}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          className="w-full text-sm outline-none placeholder:text-slate-400"
          placeholder={
            language === "hi"
              ? "शिक्षक का नाम, पद, विषय (जैसे: गणित, विज्ञान, संस्कृत, अंग्रेजी), या कर्मचारी कोड द्वारा खोजें..."
              : "Search by teacher name, designation, subject, class, employee code..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">
            {language === "hi" ? "हटाएँ" : "Clear"}
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>
          {language === "hi"
            ? `दिखाए जा रहे हैं: ${filtered.length} शिक्षक (कुल 50 में से)`
            : `Showing ${filtered.length} of 50 teachers`}
        </span>
        <span>
          {language === "hi"
            ? "लॉगिन पासवर्ड: Teacher@123 (प्रधानाचार्य: Admin@123)"
            : "Default Password: Teacher@123 (Admin: Admin@123)"}
        </span>
      </div>

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => {
            const isCoordinator = Boolean(t.coordinator_role);
            const isFirst = t.coordinator_role === "1st_class_coordinator";
            const isSecond = t.coordinator_role === "2nd_class_coordinator";

            return (
              <div
                key={t.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
                  isFirst
                    ? "border-amber-300 bg-gradient-to-b from-amber-50/60 to-white"
                    : isSecond
                    ? "border-blue-300 bg-gradient-to-b from-blue-50/60 to-white"
                    : t.hierarchy_level === 1
                    ? "border-purple-300 bg-gradient-to-b from-purple-50/40 to-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                        t.hierarchy_level === 1
                          ? "bg-purple-100 text-purple-800"
                          : t.hierarchy_level === 2
                          ? "bg-amber-100 text-amber-800"
                          : t.hierarchy_level === 3
                          ? "bg-indigo-100 text-indigo-800"
                          : t.hierarchy_level === 4
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {t.hierarchy_title || `Level ${t.hierarchy_level}`}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {t.employee_code}
                    </span>
                  </div>

                  {/* Name & Designation */}
                  <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                    {t.full_name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">
                    {t.designation}
                  </p>

                  {/* Section In-Charge Highlight */}
                  <div className="mt-2 rounded-lg bg-blue-50/80 border border-blue-200/90 px-2.5 py-1.5 text-[11px] font-bold text-blue-950 flex items-center justify-between">
                    <span className="text-slate-600">{language === "hi" ? "कक्षा/प्रभाग प्रभार:" : "Section In-Charge:"}</span>
                    <span className="rounded bg-blue-700 px-2 py-0.5 text-white font-mono text-[10px] font-extrabold">
                      {t.section_in_charge || t.assigned_section || "Subject Specialist"}
                    </span>
                  </div>

                  {/* Coordinator Higher Control Banner if applicable */}
                  {t.control_level && (
                    <div
                      className={`mt-2.5 rounded-lg p-2 text-[11px] font-medium leading-relaxed border ${
                        isFirst
                          ? "bg-amber-100/70 border-amber-300 text-amber-950"
                          : isSecond
                          ? "bg-blue-100/70 border-blue-300 text-blue-950"
                          : "bg-slate-50 border-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="font-bold">
                        {isCoordinator
                          ? (language === "hi" ? "★ विशेष नियंत्रण: " : "★ Designated Authority: ")
                          : (language === "hi" ? "अधिकार क्षेत्र: " : "Authority: ")}
                      </span>
                      {t.control_level}
                    </div>
                  )}

                  {/* Qualification & Specialization */}
                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">{language === "hi" ? "योग्यता: " : "Qual: "}</span>
                      {t.qualification}
                    </p>
                    <p className="line-clamp-2">
                      <span className="font-semibold text-slate-700">{language === "hi" ? "विशेषज्ञता: " : "Spec: "}</span>
                      {t.specialization}
                    </p>
                  </div>

                  {/* Assigned Classes */}
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      {language === "hi" ? "आवंटित कक्षाएँ:" : "Assigned Classes:"}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {t.classes_assigned.map((cls) => (
                        <span key={cls} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Contacts */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{t.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-400 shrink-0" />
                    <span>{t.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Faculty Name</th>
                  <th className="px-4 py-3">Level & Badge</th>
                  <th className="px-4 py-3">Designation & Higher Authority</th>
                  <th className="px-4 py-3">Assigned Classes</th>
                  <th className="px-4 py-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-600">
                      {t.employee_code}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{t.full_name}</div>
                      <div className="text-xs text-slate-500">{t.qualification}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          t.hierarchy_level === 1
                            ? "bg-purple-100 text-purple-800"
                            : t.hierarchy_level === 2
                            ? "bg-amber-100 text-amber-800"
                            : t.hierarchy_level === 3
                            ? "bg-indigo-100 text-indigo-800"
                            : t.hierarchy_level === 4
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {t.control_badge || t.hierarchy_title}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800 text-xs">{t.designation}</div>
                      {t.control_level && (
                        <div className="text-[11px] text-slate-500 italic mt-0.5">{t.control_level}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.classes_assigned.map((cls) => (
                          <span key={cls} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      <div>{t.email}</div>
                      <div className="text-slate-400">{t.phone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!filtered.length && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <GraduationCap size={36} className="mx-auto text-slate-300" />
          <h3 className="mt-3 font-bold text-slate-800">
            {language === "hi" ? "कोई शिक्षक नहीं मिला" : "No teachers found"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {language === "hi" ? "कृपया खोज शब्द या स्तर फ़िल्टर बदलकर पुनः प्रयास करें।" : "Try adjusting your search criteria."}
          </p>
        </div>
      )}
    </div>
  );
}
