"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search, BookOpen, Filter, Download, ExternalLink,
  FileText, CheckCircle2, X, Plus, Sparkles, BookCheck,
  Layers, Video, BellRing, PlayCircle, BookMarked, Globe,
  Copy, Check, Printer, ChevronRight, Bookmark
} from "lucide-react";
import { ResourceItem } from "@/lib/local-db/initial-data";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface ResourceExplorerProps {
  initialResources: ResourceItem[];
}

const SUBJECT_COLORS: Record<string, { bg: string; text: string; border: string; badgeBg: string }> = {
  "Mathematics": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badgeBg: "bg-blue-600" },
  "Science": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badgeBg: "bg-emerald-600" },
  "Hindi": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", badgeBg: "bg-amber-600" },
  "English": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", badgeBg: "bg-indigo-600" },
  "Social Science": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", badgeBg: "bg-rose-600" },
  "Sanskrit": { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200", badgeBg: "bg-orange-600" },
  "Environmental Studies": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", badgeBg: "bg-teal-600" },
  "Computer Science": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badgeBg: "bg-purple-600" },
};

export default function ResourceExplorer({ initialResources }: ResourceExplorerProps) {
  const { language, t } = useLanguage();
  const supabase = createBrowserClient();
  const [resources, setResources] = useState<ResourceItem[]>(initialResources || []);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedBoard, setSelectedBoard] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "video_lecture" | "chapter_notes" | "notification" | "books">("all");
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fallback hydration from /api/local-db?table=resources if initial array was empty
  useEffect(() => {
    if (!initialResources || initialResources.length === 0) {
      fetch("/api/local-db?table=resources")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setResources(data);
          }
        })
        .catch(() => {});
    }
  }, [initialResources]);

  // New resource form state
  const [newResource, setNewResource] = useState({
    title: "",
    title_hindi: "",
    grade_level: 10,
    subject_name: "Mathematics",
    board: "Bihar Board (BSEB)" as const,
    book_reference: "",
    resource_type: "chapter_notes" as const,
    description: "",
    content_markdown: "",
    file_url: "",
    video_url: "",
    video_title: "",
    notification_text: ""
  });

  const subjectsList = [
    "All",
    "Hindi",
    "English",
    "Mathematics",
    "Science",
    "Social Science",
    "Sanskrit",
    "Environmental Studies",
    "Computer Science"
  ];

  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Grade count breakdown for quick badges
  const gradeCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const r of resources) {
      counts[r.grade_level] = (counts[r.grade_level] || 0) + 1;
    }
    return counts;
  }, [resources]);

  // Fast memoized filtering
  const filtered = useMemo(() => {
    return resources.filter((res) => {
      // Tab filter
      if (activeTab === "video_lecture" && !res.video_url && res.resource_type !== "video_lecture") {
        return false;
      }
      if (activeTab === "chapter_notes" && res.resource_type !== "chapter_notes" && res.resource_type !== "formula_sheet") {
        return false;
      }
      if (activeTab === "notification" && !res.notification_text && res.resource_type !== "notification") {
        return false;
      }
      if (activeTab === "books" && !res.file_url) {
        return false;
      }

      // Grade filter
      if (selectedGrade !== "all" && res.grade_level !== selectedGrade) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== "all" && !res.subject_name.toLowerCase().includes(selectedSubject.toLowerCase())) {
        return false;
      }
      // Board filter
      if (selectedBoard !== "all" && res.board !== selectedBoard) {
        return false;
      }
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          res.title.toLowerCase().includes(q) ||
          (res.title_hindi && res.title_hindi.toLowerCase().includes(q)) ||
          res.description.toLowerCase().includes(q) ||
          res.book_reference.toLowerCase().includes(q) ||
          (res.notification_text && res.notification_text.toLowerCase().includes(q)) ||
          res.subject_name.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [resources, activeTab, selectedGrade, selectedSubject, selectedBoard, search]);

  async function handleCreateResource(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    const newItem: ResourceItem = {
      id: `res-${Date.now()}`,
      title: newResource.title,
      title_hindi: newResource.title_hindi,
      subject_id: `sub-${newResource.subject_name.toLowerCase().slice(0, 3)}`,
      class_id: `c-${String(newResource.grade_level).padStart(2, "0")}`,
      grade_level: Number(newResource.grade_level),
      subject_name: newResource.subject_name,
      class_name: `Class ${newResource.grade_level}-A`,
      board: newResource.board,
      book_reference: newResource.book_reference,
      resource_type: newResource.resource_type,
      description: newResource.description,
      content_markdown: newResource.content_markdown || newResource.description,
      file_url: newResource.file_url || "https://ncert.nic.in/textbook.php",
      video_url: newResource.video_url || undefined,
      video_title: newResource.video_title || undefined,
      notification_text: newResource.notification_text || undefined,
      upload_date: new Date().toISOString().slice(0, 10),
      author: "School Academic Faculty"
    };

    const { error } = await supabase.from("resources").insert(newItem);
    setIsSaving(false);

    if (error) {
      alert("Failed to save resource: " + error.message);
      return;
    }

    setResources([newItem, ...resources]);
    setIsAddOpen(false);
    setNewResource({
      title: "",
      title_hindi: "",
      grade_level: 10,
      subject_name: "Mathematics",
      board: "Bihar Board (BSEB)",
      book_reference: "",
      resource_type: "chapter_notes",
      description: "",
      content_markdown: "",
      file_url: "",
      video_url: "",
      video_title: "",
      notification_text: ""
    });
    alert(language === "hi" ? "संसाधन सफलतापूर्वक सहेजा गया!" : "Resource created and persisted to database!");
  }

  function handleCopyContent(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrintModal() {
    window.print();
  }

  return (
    <div className="space-y-5">
      {/* Top Banner - Clean, lightweight and modern */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-3 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={13} className="text-amber-400" />
              <span>
                {language === "hi"
                  ? "कक्षा 1 से 10वीं तक - BSEB एवं NCERT / CBSE संपूर्ण अध्ययन सामग्री"
                  : "Classes 1st – 10th Complete Curriculum, Books & Video Lectures"}
              </span>
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {language === "hi"
                ? "पाठ्यक्रम, पुस्तकें, नोट्स एवं वीडियो व्याख्यान"
                : "Curriculum Repository: Notes, Books & Videos"}
            </h1>
            <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
              {language === "hi"
                ? "सभी विषयों के अध्याय नोट्स, SCERT बिहार एवं NCERT आधिकारिक पाठ्यपुस्तकें, पाठ्यक्रम पूरा करने हेतु वीडियो व्याख्यान एवं परीक्षा सूचनाएँ।"
                : "Complete chapter notes, formulas, official SCERT Bihar & NCERT textbooks, syllabus video lectures and board examination alerts."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs md:text-sm font-bold text-slate-950 shadow-sm transition active:scale-95"
            >
              <Plus size={16} /> {t("addResource", "Add Resource")}
            </button>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800 text-xs">
          <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">📚 {resources.length} {language === "hi" ? "कुल संसाधन" : "Resources Available"}</span>
          <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">🏫 {language === "hi" ? "कक्षा 1 से 10वीं" : "Classes 1 to 10"}</span>
          <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">🎥 {resources.filter(r => r.video_url).length} {language === "hi" ? "वीडियो व्याख्यान" : "Video Lectures"}</span>
          <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">📖 {resources.filter(r => r.file_url).length} {language === "hi" ? "आधिकारिक पुस्तकें" : "Official Books"}</span>
        </div>
      </div>

      {/* Grade Selector - Snappy 1-click pills */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers size={13} /> {t("filterByClass", "Jump to Class / Grade")}
          </span>
          <span className="text-xs text-slate-400">
            {language === "hi" ? `${filtered.length} सामग्री उपलब्ध` : `${filtered.length} items`}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedGrade("all")}
            className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
              selectedGrade === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {language === "hi" ? "सभी कक्षाएं" : "All Classes"} ({resources.length})
          </button>
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                selectedGrade === grade
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Class {grade}</span>
              {grade === 10 && <span className="text-[10px] text-amber-300 font-extrabold">⭐</span>}
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedGrade === grade ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                {gradeCounts[grade] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resource Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers size={14} />
          <span>{t("resourceAll", "All Resources")} ({resources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("video_lecture")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === "video_lecture"
              ? "bg-red-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Video size={14} className={activeTab === "video_lecture" ? "text-white" : "text-red-500"} />
          <span>{language === "hi" ? "वीडियो व्याख्यान (पूरा सिलेबस)" : "Video Lectures"}</span>
        </button>

        <button
          onClick={() => setActiveTab("chapter_notes")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === "chapter_notes"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText size={14} className={activeTab === "chapter_notes" ? "text-white" : "text-blue-500"} />
          <span>{language === "hi" ? "अध्याय नोट्स व सूत्र" : "Notes & Formulas"}</span>
        </button>

        <button
          onClick={() => setActiveTab("books")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === "books"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BookMarked size={14} className={activeTab === "books" ? "text-white" : "text-emerald-600"} />
          <span>{language === "hi" ? "पाठ्यपुस्तकें (SCERT/NCERT)" : "Official Books"}</span>
        </button>

        <button
          onClick={() => setActiveTab("notification")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === "notification"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BellRing size={14} className={activeTab === "notification" ? "text-white" : "text-amber-500"} />
          <span>{language === "hi" ? "परीक्षा सूचनाएँ" : "Exam Alerts"}</span>
        </button>
      </div>

      {/* Search & Secondary Filters */}
      <div className="grid gap-2.5 sm:grid-cols-[1fr_auto_auto]">
        {/* Fast Search input */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            className="w-full text-xs md:text-sm outline-none placeholder:text-slate-400"
            placeholder={language === "hi" ? "विषय, अध्याय, पुस्तक या टॉपिक खोजें (उदा: त्रिकोणमिति, Light, किस्लय, वास्तविक संख्याएँ)..." : "Search by topic, chapter, book (e.g. Trigonometry, Light, Kislay, Real Numbers)..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs px-1">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Subject Filter Dropdown */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 outline-none shadow-xs"
        >
          {subjectsList.map((s) => (
            <option key={s} value={s === "All" ? "all" : s}>
              {s === "All" ? (language === "hi" ? "सभी विषय (All Subjects)" : "All Subjects") : s}
            </option>
          ))}
        </select>

        {/* Board Filter Dropdown */}
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 outline-none shadow-xs"
        >
          <option value="all">{language === "hi" ? "सभी बोर्ड (All Boards)" : "All Boards"}</option>
          <option value="Bihar Board (BSEB)">Bihar Board (BSEB)</option>
          <option value="NCERT / CBSE">NCERT / CBSE</option>
          <option value="BSEB & NCERT Aligned">BSEB & NCERT Aligned</option>
        </select>
      </div>

      {/* Active filters pill display */}
      {(selectedGrade !== "all" || selectedSubject !== "all" || selectedBoard !== "all" || search || activeTab !== "all") && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">
            {language === "hi" ? `${filtered.length} परिणाम मिले:` : `Showing ${filtered.length} matches:`}
          </span>
          {activeTab !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 font-bold text-white text-[11px]">
              {activeTab}
              <button onClick={() => setActiveTab("all")}><X size={11} /></button>
            </span>
          )}
          {selectedGrade !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-bold text-blue-800 text-[11px]">
              Class {selectedGrade}
              <button onClick={() => setSelectedGrade("all")}><X size={11} /></button>
            </span>
          )}
          {selectedSubject !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 font-bold text-purple-800 text-[11px]">
              {selectedSubject}
              <button onClick={() => setSelectedSubject("all")}><X size={11} /></button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-slate-800 text-[11px]">
              &quot;{search}&quot;
              <button onClick={() => setSearch("")}><X size={11} /></button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedGrade("all");
              setSelectedSubject("all");
              setSelectedBoard("all");
              setActiveTab("all");
              setSearch("");
            }}
            className="text-xs font-semibold text-red-600 hover:underline ml-1"
          >
            {language === "hi" ? "सभी साफ़ करें" : "Reset filters"}
          </button>
        </div>
      )}

      {/* Resource Cards Grid - Responsive, modern and fast */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const colors = SUBJECT_COLORS[item.subject_name] || {
            bg: "bg-slate-50",
            text: "text-slate-700",
            border: "border-slate-200",
            badgeBg: "bg-slate-700"
          };

          return (
            <article
              key={item.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-slate-300 hover:shadow-md"
            >
              <div>
                {/* Header Tags */}
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-extrabold text-white">
                      Class {item.grade_level}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${colors.bg} ${colors.text}`}>
                      {item.subject_name}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.board === "Bihar Board (BSEB)" ? "BSEB" : item.board === "NCERT / CBSE" ? "NCERT" : "BSEB/NCERT"}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="mt-2.5 text-sm md:text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                  {language === "hi" && item.title_hindi ? item.title_hindi : item.title}
                </h3>
                {language === "en" && item.title_hindi && (
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                    {item.title_hindi}
                  </p>
                )}

                {/* Chapter Alert Banner if present */}
                {item.notification_text && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-[11px] text-amber-900 border border-amber-200/80">
                    <BellRing size={13} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="font-semibold leading-tight line-clamp-2">{item.notification_text}</p>
                  </div>
                )}

                {/* Description snippet */}
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Textbook reference */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 rounded-md px-2 py-1 truncate">
                  <BookCheck size={12} className="text-blue-600 shrink-0" />
                  <span className="truncate">{item.book_reference}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => setActiveModalResource(item)}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-800 transition active:scale-95"
                >
                  <BookOpen size={13} /> {language === "hi" ? "नोट्स पढ़ें" : "Read Notes"}
                </button>

                <div className="flex items-center gap-1.5">
                  {item.video_url && (
                    <a
                      href={item.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 text-[11px] font-bold text-red-700 transition"
                      title={item.video_title || "Watch lecture"}
                    >
                      <PlayCircle size={13} /> {language === "hi" ? "वीडियो" : "Video"}
                    </a>
                  )}
                  {item.file_url && (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 transition"
                      title="Open Official Textbook"
                    >
                      <ExternalLink size={12} /> {language === "hi" ? "पुस्तक" : "Book"}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {!filtered.length && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <h3 className="mt-3 font-bold text-slate-800">
            {language === "hi" ? "कोई संसाधन नहीं मिला" : "No resources found"}
          </h3>
          <p className="mt-1 text-xs md:text-sm text-slate-500">
            {language === "hi" ? "कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।" : "Try adjusting your search keyword or selected grade/subject filters."}
          </p>
        </div>
      )}

      {/* Quick Reading Modal View */}
      {activeModalResource && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalResource(null);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                      Class {activeModalResource.grade_level}
                    </span>
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                      {activeModalResource.subject_name}
                    </span>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      {activeModalResource.board}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {language === "hi" && activeModalResource.title_hindi ? activeModalResource.title_hindi : activeModalResource.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Book: {activeModalResource.book_reference} · Author: {activeModalResource.author}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalResource(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Exam Notice inside modal */}
              {activeModalResource.notification_text && (
                <div className="mt-3.5 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
                  <BellRing size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{language === "hi" ? "अध्याय सूचना / परीक्षा अपडेट:" : "Board Exam Alert:"}</span>
                    <p className="mt-0.5 leading-relaxed">{activeModalResource.notification_text}</p>
                  </div>
                </div>
              )}

              {/* Video Banner inside modal if present */}
              {activeModalResource.video_url && (
                <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl bg-red-50 p-3 sm:p-4 border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-600 p-2 text-white">
                      <PlayCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-red-900">
                        {language === "hi" ? "संपूर्ण पाठ्यक्रम वीडियो व्याख्यान" : "Complete Syllabus Video Lecture"}
                      </h4>
                      <p className="text-xs text-red-700 mt-0.5 line-clamp-1">
                        {activeModalResource.video_title || "Full syllabus chapter-by-chapter playlist"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={activeModalResource.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-red-600 hover:bg-red-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition"
                  >
                    ▶ {language === "hi" ? "व्याख्यान देखें" : "Watch Lecture"}
                  </a>
                </div>
              )}

              {/* Markdown Content Area */}
              <div className="mt-4 prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 font-sans">
                {activeModalResource.content_markdown || activeModalResource.description}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyContent(activeModalResource.content_markdown || activeModalResource.description)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Notes"}</span>
                </button>
                <button
                  onClick={handlePrintModal}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Printer size={13} />
                  <span>Print</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {activeModalResource.file_url && (
                  <a
                    href={activeModalResource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                  >
                    <ExternalLink size={13} /> {language === "hi" ? "पाठ्यपुस्तक (PDF)" : "Official Book"}
                  </a>
                )}
                <button
                  onClick={() => setActiveModalResource(null)}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-1.5 text-xs font-bold text-white transition"
                >
                  {t("close", "Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Resource Modal */}
      {isAddOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <form
            onSubmit={handleCreateResource}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {language === "hi" ? "नई अध्ययन सामग्री जोड़ें" : "Add New Subject Resource"}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-slate-700">Class / Grade (1st - 10th)</label>
                  <select
                    value={newResource.grade_level}
                    onChange={(e) => setNewResource({ ...newResource, grade_level: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>Class {g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Subject</label>
                  <select
                    value={newResource.subject_name}
                    onChange={(e) => setNewResource({ ...newResource, subject_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                  >
                    {subjectsList.filter((s) => s !== "All").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Educational Board</label>
                <select
                  value={newResource.board}
                  onChange={(e) => setNewResource({ ...newResource, board: e.target.value as any })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                >
                  <option value="Bihar Board (BSEB)">Bihar Board (BSEB)</option>
                  <option value="NCERT / CBSE">NCERT / CBSE</option>
                  <option value="BSEB & NCERT Aligned">BSEB & NCERT Aligned</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Title (English)</label>
                <input
                  required
                  placeholder="e.g. Class 10 Trigonometry Chapter Notes & Formula Sheet"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Title in Hindi (शीर्षक हिन्दी में)</label>
                <input
                  placeholder="उदा. कक्षा 10 त्रिकोणमिति अध्याय नोट्स व सूत्र संग्रह"
                  value={newResource.title_hindi}
                  onChange={(e) => setNewResource({ ...newResource, title_hindi: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Textbook Reference</label>
                <input
                  required
                  placeholder="e.g. SCERT Bihar Ganit Class 10 / NCERT Mathematics"
                  value={newResource.book_reference}
                  onChange={(e) => setNewResource({ ...newResource, book_reference: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Chapter Notification / Exam Alert (Optional)</label>
                <input
                  placeholder="e.g. 📢 Important for BSEB Matric: 15 marks question expected in Section B"
                  value={newResource.notification_text}
                  onChange={(e) => setNewResource({ ...newResource, notification_text: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                />
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-slate-700">Video Lecture URL (YouTube)</label>
                  <input
                    placeholder="https://youtube.com/..."
                    value={newResource.video_url}
                    onChange={(e) => setNewResource({ ...newResource, video_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Official Book / PDF Link</label>
                  <input
                    placeholder="https://ncert.nic.in/textbook.php"
                    value={newResource.file_url}
                    onChange={(e) => setNewResource({ ...newResource, file_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Summary Description</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Brief synopsis of what this chapter covers..."
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Detailed Markdown Study Content</label>
                <textarea
                  rows={4}
                  placeholder="Full notes, formulas, theorems, and syllabus checkpoints..."
                  value={newResource.content_markdown}
                  onChange={(e) => setNewResource({ ...newResource, content_markdown: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                {t("cancel", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-bold text-white disabled:opacity-50"
              >
                {isSaving ? "Saving..." : t("save", "Save Resource")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
