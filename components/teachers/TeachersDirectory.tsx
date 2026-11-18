"use client";
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Search, Shield, Award, Users, Filter, Layers, Phone, Mail, ChevronRight, Building2, UserCheck } from "lucide-react";
import { Teacher } from "@/lib/local-db/initial-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface TeachersDirectoryProps {
  teachers: Teacher[];
}

export default function TeachersDirectory({ teachers }: TeachersDirectoryProps) {
  const { language } = useLanguage();
  const L = (hi: string, en: string) => (language === "hi" ? hi : en);
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filtered = teachers.filter((t) => {
    if (selectedLevel !== "all" && t.hierarchy_level !== selectedLevel) return false;
    if (selectedRole === "coordinators" && !t.coordinator_role) return false;
    if (selectedRole === "hods" && !t.designation.includes("HOD")) return false;
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

  function getLevelBadge(level: number) {
    switch (level) {
      case 1: return "bg-[var(--color-accent-3)]/10 text-[var(--color-accent-3)]";
      case 2: return "bg-[var(--color-accent-2)]/10 text-[var(--color-accent-2)]";
      case 3: return "bg-[var(--color-accent-3)]/10 text-[var(--color-accent-3)]";
      case 4: return "bg-[var(--color-accent-2)]/10 text-[var(--color-accent-2)]";
      default: return "bg-[var(--color-success)]/10 text-[var(--color-success)]";
    }
  }

  function getCardBorder(isFirst: boolean, isSecond: boolean, level: number) {
    if (isFirst) return "border-[var(--color-accent-2)] bg-gradient-to-b from-[var(--color-accent-2)]/10 to-[var(--color-card)]";
    if (isSecond) return "border-[var(--color-accent-3)] bg-gradient-to-b from-[var(--color-accent-3)]/10 to-[var(--color-card)]";
    if (level === 1) return "border-[var(--color-accent-3)] bg-gradient-to-b from-[var(--color-accent-3)]/5 to-[var(--color-card)]";
    return "border-[var(--color-rule)] bg-[var(--color-card)]";
  }

  function getControlLevelClass(isFirst: boolean, isSecond: boolean) {
    if (isFirst) return "bg-[var(--color-accent-2)]/10 border-[var(--color-accent-2)] text-[var(--color-accent-ink)]";
    if (isSecond) return "bg-[var(--color-accent-3)]/10 border-[var(--color-accent-3)] text-[var(--color-accent-ink)]";
    return "bg-[var(--color-paper-2)] border-[var(--color-rule)] text-[var(--color-ink-2)]";
  }

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Header Banner */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-lg)] md:p-[var(--space-xl)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-md)]">
          <div>
            <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md">
              <Award size={14} className="text-[var(--color-accent-2)]" />
              <span>{L("गिद्धौर सेन्ट्रल स्कूल — 50 सदस्यीय संकाय एवं प्रशासनिक पदानुक्रम", "Gidhaur Central School — 50 Faculty Members & Institutional Hierarchy")}</span>
            </div>
            <h1 className="mt-[var(--space-sm)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)] leading-[1.05]">{L("शिक्षक पदानुक्रम एवं कक्षा समन्वयक प्रणाली", "Faculty Hierarchy & Class Coordinators Framework")}</h1>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80 max-w-2xl leading-relaxed">{language === "hi" ? "संस्थान के 50 शिक्षकों का स्तरबद्ध पदानुक्रम। प्रथम एवं द्वितीय कक्षा समन्वयकों को विशेष प्रशासनिक, परीक्षा निरीक्षण एवं संकाय समन्वय नियंत्रण प्राप्त है।" : "Complete governance and hierarchy across all 50 educators. 1st & 2nd Class Coordinators hold designated higher administrative oversight, moderation, and wing supervision powers."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
            <Link href="/admin/attendance" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-2)] hover:bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] shadow-[var(--shadow-card)] transition active:scale-95">
              <UserCheck size={16} />
              <span>{L("शिक्षक उपस्थिति व प्रभाग प्रबंधन", "Teacher Attendance & Section In-Charge")}</span>
            </Link>
            <LanguageSwitcher />
            <div className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-md)] py-[var(--space-xs)] backdrop-blur-md text-[var(--text-xs)]">
              <span className="font-bold text-[var(--color-accent-2)] text-sm">50</span>
              <span className="text-[var(--color-card)]/80 ml-[var(--space-xs)]">{L("कुल शिक्षक", "Total Faculty")}</span>
            </div>
          </div>
        </div>

        {/* Coordinator Spotlights */}
        <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-card)]/20 grid gap-[var(--space-sm)] sm:grid-cols-2">
          {firstCoordinator && (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-md)]">
                <div>
                  <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-accent-2)]/10 px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] border border-[var(--color-accent-2)]/20">
                    <Award size={14} className="text-[var(--color-accent-2)]" />
                    <span>{L("प्रथम कक्षा समन्वयक", "1st Class Coordinator")}</span>
                  </div>
                  <h2 className="mt-[var(--space-xs)] text-[var(--text-md)] font-bold text-[var(--color-ink)]">{firstCoordinator.full_name}</h2>
                  <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)]">{firstCoordinator.designation}</p>
                  <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)]">{firstCoordinator.control_level || "Direct Senior Wing Moderation & Disciplinary Authority"}</p>
                </div>
                <div className="mt-[var(--space-md)] md:mt-0">
                  <span className="px-[var(--space-xs)] py-[0.5px] rounded-[var(--radius-card)] bg-[var(--color-accent-3)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-accent-ink)]">{firstCoordinator.employee_code}</span>
                </div>
              </div>
            </div>
          )}
          {secondCoordinator && (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-md)]">
                <div>
                  <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-accent-3)]/10 px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] border border-[var(--color-accent-3)]/20">
                    <Award size={14} className="text-[var(--color-accent-3)]" />
                    <span>{L("द्वितीय कक्षा समन्वयक", "2nd Class Coordinator")}</span>
                  </div>
                  <h2 className="mt-[var(--space-xs)] text-[var(--text-md)] font-bold text-[var(--color-ink)]">{secondCoordinator.full_name}</h2>
                  <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)]">{secondCoordinator.designation}</p>
                  <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)]">{secondCoordinator.control_level || "Curriculum Audit, Attendance Reviews & Teacher Evaluation"}</p>
                </div>
                <div className="mt-[var(--space-md)] md:mt-0">
                  <span className="px-[var(--space-xs)] py-[0.5px] rounded-[var(--radius-card)] bg-[var(--color-accent-2)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-accent-ink)]">{secondCoordinator.employee_code}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Level Filters */}
        <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-sm)] mb-[var(--space-md)]">
            <div className="flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)]">
              <Layers size={15} />
              <span>{L("पदानुक्रम स्तर चुनें", "Filter by Hierarchy Level")}</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)] bg-[var(--color-paper-2)] p-[var(--space-xs)] rounded-[var(--radius-card)] text-[var(--text-xs)] font-semibold">
              <button onClick={() => setViewMode("cards")} className={`px-[var(--space-sm)] py-[var(--space-xs)] rounded-[var(--radius-card)] transition ${viewMode === "cards" ? "bg-[var(--color-card)] text-[var(--color-ink)] shadow-[var(--shadow-card)]" : "text-[var(--color-muted)]"}`}>{L("कार्ड दृश्य", "Cards View")}</button>
              <button onClick={() => setViewMode("table")} className={`px-[var(--space-sm)] py-[var(--space-xs)] rounded-[var(--radius-card)] transition ${viewMode === "table" ? "bg-[var(--color-card)] text-[var(--color-ink)] shadow-[var(--shadow-card)]" : "text-[var(--color-muted)]"}`}>{L("तालिका दृश्य", "Table View")}</button>
            </div>
          </div>
          <div className="flex items-center gap-[var(--space-xs)] overflow-x-auto pb-[var(--space-xs)] scrollbar-thin">
            <button onClick={() => { setSelectedLevel("all"); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === "all" && selectedRole === "all" ? "bg-[var(--color-ink)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("सभी शिक्षक (50)", "All Faculty (50)")}</button>
            <button onClick={() => { setSelectedLevel(1); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === 1 ? "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("स्तर 1: संस्थान नेतृत्व (2)", "Level 1: Executive (2)")}</button>
            <button onClick={() => { setSelectedLevel(2); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === 2 ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("स्तर 2: मुख्य कक्षा समन्वयक (4)", "Level 2: Chief Coordinators (4)")}</button>
            <button onClick={() => { setSelectedLevel(3); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === 3 ? "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("स्तर 3: विभागाध्यक्ष (8)", "Level 3: Department HODs (8)")}</button>
            <button onClick={() => { setSelectedLevel(4); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === 4 ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("स्तर 4: वरिष्ठ विषय शिक्षक (18)", "Level 4: Senior Faculty (18)")}</button>
            <button onClick={() => { setSelectedLevel(5); setSelectedRole("all"); }} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedLevel === 5 ? "bg-[var(--color-success)] text-[var(--color-success)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>{L("स्तर 5: प्राथमिक व माध्यमिक शिक्षक (18)", "Level 5: Middle & Primary (18)")}</button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-md)] py-[var(--space-sm)] shadow-[var(--shadow-card)]">
          <Search size={18} className="text-[var(--color-muted)] shrink-0" />
          <input className="w-full text-[var(--text-sm)] outline-none placeholder:text-[var(--color-muted)]" placeholder={L("शिक्षक का नाम, पद, विषय (जैसे: गणित, विज्ञान, संस्कृत, अंग्रेजी), या कर्मचारी कोड द्वारा खोजें...", "Search by teacher name, designation, subject, class, employee code...")} value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-[var(--text-xs)]">{L("हटाएँ", "Clear")}</button>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-[var(--text-xs)] text-[var(--color-muted)] font-semibold px-1">
          <span>{L("दिखाए जा रहे हैं: ", "Showing ")}{filtered.length} {L("शिक्षक (कुल 50 में से)", "of 50 teachers")}</span>
          <span>{L("लॉगिन पासवर्ड: Teacher@123 (प्रधानाचार्य: Admin@123)", "Default Password: Teacher@123 (Admin: Admin@123)")}</span>
        </div>

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-3">{filtered.map((t) => {
            const isCoordinator = Boolean(t.coordinator_role);
            const isFirst = t.coordinator_role === "1st_class_coordinator";
            const isSecond = t.coordinator_role === "2nd_class_coordinator";
            const levelBadge = getLevelBadge(t.hierarchy_level ?? 5);
            const cardBorder = getCardBorder(isFirst, isSecond, t.hierarchy_level ?? 5);
            return (
              <div key={t.id} className={`flex flex-col justify-between rounded-[var(--radius-card)] border p-[var(--space-md)] shadow-[var(--shadow-card)] transition hover:shadow-md ${cardBorder}`}>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-[var(--space-xs)]">
                    <span className={`rounded-full px-[var(--space-sm)] py-[0.5px] text-[10px] font-extrabold uppercase tracking-[var(--tracking-display)] ${levelBadge}`}>{t.hierarchy_title || `Level ${t.hierarchy_level}`}</span>
                    <span className="text-[11px] font-[var(--font-outlier)] font-bold text-[var(--color-muted)]">{t.employee_code}</span>
                  </div>
                  <h3 className="mt-[var(--space-md)] text-[var(--text-md)] font-bold text-[var(--color-ink)] leading-snug">{t.full_name}</h3>
                  <p className="text-[var(--text-xs)] font-semibold text-[var(--color-accent-2)] mt-[var(--space-xs)]">{t.designation}</p>
                  <div className="mt-[var(--space-md)] rounded-[var(--radius-card)] bg-[var(--color-accent-3)]/10 border border-[var(--color-accent-2)]/90 px-[var(--space-sm)] py-[var(--space-xs)] text-[11px] font-bold text-[var(--color-accent-ink)] flex items-center justify-between">
                    <span className="text-[var(--color-muted)]">{L("कक्षा/प्रभाग प्रभार:", "Section In-Charge:")}</span>
                    <span className="rounded-[var(--radius-card)] bg-[var(--color-accent-2)] px-[var(--space-xs)] py-[0.5px] text-[var(--color-accent-ink)] font-mono text-[10px] font-extrabold">{t.section_in_charge || t.assigned_section || "Subject Specialist"}</span>
                  </div>
                  {t.control_level && (
                    <div className={`mt-[var(--space-sm)] rounded-[var(--radius-card)] p-[var(--space-xs)] text-[11px] font-bold leading-relaxed border ${getControlLevelClass(isFirst, isSecond)}`}>
                      <span className="font-bold">{isCoordinator ? (language === "hi" ? "★ विशेष नियंत्रण: " : "★ Designated Authority: ") : (language === "hi" ? "अधिकार क्षेत्र: " : "Authority: ")}</span>
                      {t.control_level}
                    </div>
                  )}
                  <div className="mt-[var(--space-md)] space-y-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)]">
                    <p><span className="font-semibold text-[var(--color-muted)]">{L("योग्यता: ", "Qual: ")}</span>{t.qualification}</p>
                    <p className="line-clamp-2"><span className="font-semibold text-[var(--color-muted)]">{L("विशेषज्ञता: ", "Spec: ")}</span>{t.specialization}</p>
                  </div>
                  <div className="mt-[var(--space-md)]">
                    <span className="text-[11px] font-bold text-[var(--color-muted)] uppercase tracking-[var(--tracking-display)] block mb-[var(--space-xs)]">{L("आवंटित कक्षाएँ:", "Assigned Classes:")}</span>
                    <div className="flex flex-wrap gap-[var(--space-xs)]">{t.classes_assigned.map((cls) => (<span key={cls} className="rounded-[var(--radius-card)] bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[11px] font-semibold text-[var(--color-ink-2)]">{cls}</span>))}</div>
                  </div>
                </div>
                <div className="mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] text-[11px] text-[var(--color-muted)] space-y-[var(--space-xs)]">
                  <div className="flex items-center gap-[var(--space-xs)] truncate"><Mail size={13} className="text-[var(--color-muted)] shrink-0" /><span className="truncate">{t.email}</span></div>
                  <div className="flex items-center gap-[var(--space-xs)]"><Phone size={13} className="text-[var(--color-muted)] shrink-0" /><span>{t.phone}</span></div>
                </div>
              </div>
            );
          })}</div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[var(--text-xs)]">
                <thead className="bg-[var(--color-paper-2)] text-[11px] uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] font-bold border-b border-[var(--color-rule)]">
                  <tr>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Code</th>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Faculty Name</th>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Level & Badge</th>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Designation & Higher Authority</th>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Assigned Classes</th>
                    <th className="px-[var(--space-sm)] py-[var(--space-md)]">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-rule)]">{filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-[var(--color-paper-2)]/50 transition">
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] font-[var(--font-outlier)] text-[var(--text-xs)] font-bold text-[var(--color-ink-2)]">{t.employee_code}</td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                      <div className="font-bold text-[var(--color-ink)]">{t.full_name}</div>
                      <div className="text-[var(--text-xs)] text-[var(--color-muted)]">{t.qualification}</div>
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                      <span className={`rounded-full px-[var(--space-xs)] py-[0.5px] text-[11px] font-bold ${getLevelBadge(t.hierarchy_level ?? 5)}`}>{t.control_badge || t.hierarchy_title}</span>
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                      <div className="font-semibold text-[var(--color-ink)] text-[var(--text-xs)]">{t.designation}</div>
                      {t.control_level && <div className="text-[11px] text-[var(--color-muted)] italic mt-[var(--space-xs)]">{t.control_level}</div>}
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)]">
                      <div className="flex flex-wrap gap-[var(--space-xs)]">{t.classes_assigned.map((cls) => (<span key={cls} className="rounded-[var(--radius-card)] bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-semibold text-[var(--color-ink-2)]">{cls}</span>))}</div>
                    </td>
                    <td className="px-[var(--space-sm)] py-[var(--space-md)] text-[var(--text-xs)] text-[var(--color-muted)]"><div>{t.email}</div><div className="text-[var(--color-muted)]">{t.phone}</div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {!filtered.length && (
          <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-2xl)] text-center shadow-[var(--shadow-card)]">
            <GraduationCap size={36} className="mx-auto text-[var(--color-muted)]" />
            <h3 className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{L("कोई शिक्षक नहीं मिला", "No teachers found")}</h3>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("कृपया खोज शब्द या स्तर फ़िल्टर बदलकर पुनः प्रयास करें।", "Try adjusting your search criteria.")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
