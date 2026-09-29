"use client";

import { useState } from "react";
import {
  Search, BookOpen, Filter, Download, ExternalLink,
  FileText, CheckCircle2, X, Plus, Sparkles, BookCheck,
  Layers, Video, BellRing, PlayCircle, BookMarked, Globe
} from "lucide-react";
import { ResourceItem } from "@/lib/local-db/initial-data";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/lib/../components/ui/LanguageSwitcher";

interface ResourceExplorerProps {
  initialResources: ResourceItem[];
}

export default function ResourceExplorer({ initialResources }: ResourceExplorerProps) {
  const { language, t } = useLanguage();
  const supabase = createBrowserClient();
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedBoard, setSelectedBoard] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "video_lecture" | "chapter_notes" | "notification" | "books">("all");
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const filtered = resources.filter((res) => {
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
        res.content_markdown.toLowerCase().includes(q) ||
        res.class_name.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

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
    alert(language === "hi" ? "संसाधन सफलतापूर्वक स्थानीय डेटाबेस में सहेजा गया!" : "Resource created and persisted to database!");
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              <span>
                {language === "hi"
                  ? "बिहार बोर्ड (BSEB) एवं NCERT / CBSE संपूर्ण पाठ्यक्रम भंडार"
                  : "Bihar School Examination Board (BSEB) & NCERT / CBSE Repository"}
              </span>
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
              {language === "hi"
                ? "कक्षा 1 से 10वीं तक संपूर्ण अध्ययन सामग्री, पुस्तकें व वीडियो"
                : "Classes 1st – 10th Complete Curriculum, Books & Video Lectures"}
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {language === "hi"
                ? "सभी विषयों के अध्याय नोट्स, SCERT बिहार एवं NCERT आधिकारिक पाठ्यपुस्तकें, पाठ्यक्रम पूरा करने हेतु वीडियो व्याख्यान एवं परीक्षा सूचनाएँ।"
                : "Curriculum guides, chapter notes, official SCERT Bihar & NCERT textbooks, chapter-by-chapter video lectures to complete the entire syllabus, and examination alerts."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs md:text-sm font-bold text-slate-950 shadow-sm transition active:scale-95"
            >
              <Plus size={18} /> {t("addResource", "Add New Resource")}
            </button>
          </div>
        </div>

        {/* Quick count chips */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs">
          <span className="rounded-lg bg-white/10 px-2.5 py-1">📚 {resources.length} {language === "hi" ? "कुल संसाधन" : "Total Resources"}</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">🏫 {language === "hi" ? "कक्षा 1 से 10वीं पूर्ण" : "Classes 1st to 10th Complete"}</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">📖 {language === "hi" ? "BSEB व NCERT मैप किया गया" : "BSEB & NCERT Mapped"}</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">🎥 {language === "hi" ? "वीडियो व्याख्यान उपलब्ध" : "Video Lectures Available"}</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">⚡ {language === "hi" ? "लोकल डेटाबेस सुरक्षित" : "Local Database Storage"}</span>
        </div>
      </div>

      {/* Resource Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers size={15} />
          <span>{t("resourceAll", "All Resources")} ({resources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("video_lecture")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "video_lecture"
              ? "bg-red-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Video size={15} className={activeTab === "video_lecture" ? "text-white" : "text-red-500"} />
          <span>{t("resourceVideos", "Video Lectures (Syllabus)")}</span>
        </button>

        <button
          onClick={() => setActiveTab("chapter_notes")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "chapter_notes"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText size={15} className={activeTab === "chapter_notes" ? "text-white" : "text-blue-500"} />
          <span>{t("resourceNotes", "Chapter Notes & Formulas")}</span>
        </button>

        <button
          onClick={() => setActiveTab("books")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "books"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BookMarked size={15} className={activeTab === "books" ? "text-white" : "text-emerald-600"} />
          <span>{t("resourceBooks", "Official Books (SCERT/NCERT)")}</span>
        </button>

        <button
          onClick={() => setActiveTab("notification")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "notification"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BellRing size={15} className={activeTab === "notification" ? "text-white" : "text-amber-500"} />
          <span>{t("resourceNotifications", "Chapter Notifications & Alerts")}</span>
        </button>
      </div>

      {/* Class Selector Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers size={14} /> {t("filterByClass", "Filter by Grade / Class")}
          </span>
          <span className="text-xs text-slate-400">
            {language === "hi" ? "कक्षा 1 से 10वीं तक" : "Classes 1st through 10th"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedGrade("all")}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedGrade === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t("allClasses", "All Classes (1st-10th)")}
          </button>
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                selectedGrade === grade
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Class {grade} {grade === 10 ? (language === "hi" ? "⭐ मैट्रिक" : "⭐ Matric") : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Secondary Filters */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            className="w-full text-sm outline-none placeholder:text-slate-400"
            placeholder={language === "hi" ? "अध्याय, विषय या पुस्तक द्वारा खोजें (जैसे: त्रिकोणमिति, गोधूलि, Light, किस्लय, वास्तविक संख्याएँ)..." : "Search by topic, chapter, book (e.g. Trigonometry, गोधूलि, Light, किस्लय, Real Numbers)..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">
              {language === "hi" ? "हटाएँ" : "Clear"}
            </button>
          )}
        </div>

        {/* Subject Filter Dropdown */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none shadow-xs"
        >
          {subjectsList.map((s) => (
            <option key={s} value={s === "All" ? "all" : s}>
              {s === "All" ? (language === "hi" ? "सभी विषय" : "All Subjects") : s}
            </option>
          ))}
        </select>

        {/* Board Filter Dropdown */}
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none shadow-xs"
        >
          <option value="all">{language === "hi" ? "सभी शिक्षा बोर्ड" : "All Educational Boards"}</option>
          <option value="Bihar Board (BSEB)">Bihar Board (BSEB)</option>
          <option value="NCERT / CBSE">NCERT / CBSE</option>
          <option value="BSEB & NCERT Aligned">BSEB & NCERT Aligned</option>
        </select>
      </div>

      {/* Active filters pill display */}
      {(selectedGrade !== "all" || selectedSubject !== "all" || selectedBoard !== "all" || search || activeTab !== "all") && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">
            {language === "hi" ? `परिणाम: ${filtered.length} सामग्री` : `Showing ${filtered.length} matches for:`}
          </span>
          {activeTab !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 font-bold text-white">
              Tab: {activeTab}
              <button onClick={() => setActiveTab("all")}><X size={12} /></button>
            </span>
          )}
          {selectedGrade !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-bold text-blue-800">
              Class {selectedGrade}
              <button onClick={() => setSelectedGrade("all")}><X size={12} /></button>
            </span>
          )}
          {selectedSubject !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 font-bold text-purple-800">
              {selectedSubject}
              <button onClick={() => setSelectedSubject("all")}><X size={12} /></button>
            </span>
          )}
          {selectedBoard !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-bold text-amber-800">
              {selectedBoard}
              <button onClick={() => setSelectedBoard("all")}><X size={12} /></button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-slate-800">
              &quot;{search}&quot;
              <button onClick={() => setSearch("")}><X size={12} /></button>
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
            className="text-xs font-semibold text-red-600 hover:underline ml-2"
          >
            {language === "hi" ? "सभी फ़िल्टर साफ़ करें" : "Reset all filters"}
          </button>
        </div>
      )}

      {/* Resource Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md"
          >
            <div>
              {/* Card Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white">
                  {item.class_name}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                  {item.subject_name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    item.board === "Bihar Board (BSEB)"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}
                >
                  {item.board}
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="mt-3.5 text-base font-bold text-slate-900 leading-snug">
                {language === "hi" && item.title_hindi ? item.title_hindi : item.title}
              </h2>
              {language === "en" && item.title_hindi && (
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {item.title_hindi}
                </p>
              )}

              {/* Chapter Notification Alert if present */}
              {item.notification_text && (
                <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200">
                  <BellRing size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="font-semibold leading-tight">{item.notification_text}</p>
                </div>
              )}

              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-3">
                {item.description}
              </p>

              {/* Textbook reference */}
              <div className="mt-3.5 flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                <BookCheck size={14} className="text-blue-600 shrink-0" />
                <span className="font-medium truncate">{item.book_reference}</span>
              </div>

              {/* Video Badge if lecture is attached */}
              {item.video_url && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                  <PlayCircle size={14} />
                  <span>{language === "hi" ? "वीडियो व्याख्यान संलग्न (पूरा सिलेबस)" : "Video Lecture Attached"}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalResource(item)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <BookOpen size={15} /> {t("readNotes", "Read Notes")}
              </button>

              <div className="flex items-center gap-2">
                {item.video_url && (
                  <a
                    href={item.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 text-[11px] font-bold hover:bg-red-100 transition"
                  >
                    <PlayCircle size={13} /> {language === "hi" ? "वीडियो देखें" : "Watch Video"}
                  </a>
                )}
                {item.file_url && (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800"
                  >
                    <ExternalLink size={13} /> {language === "hi" ? "पाठ्यपुस्तक" : "Book"}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!filtered.length && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <h3 className="mt-3 font-bold text-slate-800">
            {language === "hi" ? "कोई संसाधन नहीं मिला" : "No resources found"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {language === "hi" ? "कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।" : "Try adjusting your search keyword or selected grade/subject filters."}
          </p>
        </div>
      )}

      {/* Study Notes Modal View */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white">
                    {activeModalResource.class_name}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
                    {activeModalResource.subject_name}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    {activeModalResource.board}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {language === "hi" && activeModalResource.title_hindi ? activeModalResource.title_hindi : activeModalResource.title}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Book Ref: {activeModalResource.book_reference} · Author: {activeModalResource.author}
                </p>
              </div>
              <button
                onClick={() => setActiveModalResource(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notification alert in modal */}
            {activeModalResource.notification_text && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
                <BellRing size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{language === "hi" ? "अध्याय सूचना / परीक्षा अपडेट:" : "Chapter Notification / Board Update:"}</span>
                  <p className="mt-0.5">{activeModalResource.notification_text}</p>
                </div>
              </div>
            )}

            {/* Video lecture card in modal if available */}
            {activeModalResource.video_url && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl bg-red-50 p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-red-600 p-2.5 text-white">
                    <PlayCircle size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-900">
                      {language === "hi" ? "संपूर्ण पाठ्यक्रम वीडियो व्याख्यान" : "Complete Syllabus Video Lecture"}
                    </h4>
                    <p className="text-xs text-red-700 mt-0.5">
                      {activeModalResource.video_title || "Step-by-step topic tutorial to complete syllabus"}
                    </p>
                  </div>
                </div>
                <a
                  href={activeModalResource.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
                >
                  ▶ {language === "hi" ? "व्याख्यान देखें" : "Watch Lecture"}
                </a>
              </div>
            )}

            {/* Markdown content area */}
            <div className="mt-5 prose prose-slate max-w-none text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-xl border border-slate-100">
              {activeModalResource.content_markdown || activeModalResource.description}
            </div>

            {/* Modal footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">
                Uploaded: {activeModalResource.upload_date} · Bihar School Examination Board & NCERT Mapped
              </span>
              <div className="flex gap-2">
                {activeModalResource.file_url && (
                  <a
                    href={activeModalResource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <ExternalLink size={14} /> {language === "hi" ? "आधिकारिक पाठ्यपुस्तक (PDF)" : "Official Textbook"}
                  </a>
                )}
                <button
                  onClick={() => setActiveModalResource(null)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateResource}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {language === "hi" ? "नई अध्ययन सामग्री जोड़ें" : "Add New Subject Resource"}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-slate-700">Class / Grade (1st - 10th)</label>
                  <select
                    value={newResource.grade_level}
                    onChange={(e) => setNewResource({ ...newResource, grade_level: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
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
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
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
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
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
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Title in Hindi (शीर्षक हिन्दी में)</label>
                <input
                  placeholder="उदा. कक्षा 10 त्रिकोणमिति अध्याय नोट्स व सूत्र संग्रह"
                  value={newResource.title_hindi}
                  onChange={(e) => setNewResource({ ...newResource, title_hindi: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Textbook Reference</label>
                <input
                  required
                  placeholder="e.g. SCERT Bihar Ganit Class 10 / NCERT Mathematics"
                  value={newResource.book_reference}
                  onChange={(e) => setNewResource({ ...newResource, book_reference: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Chapter Notification / Exam Alert (Optional)</label>
                <input
                  placeholder="e.g. 📢 Important for BSEB Matric: 15 marks question expected in Section B"
                  value={newResource.notification_text}
                  onChange={(e) => setNewResource({ ...newResource, notification_text: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-slate-700">Video Lecture URL (YouTube/Educational)</label>
                  <input
                    placeholder="https://youtube.com/..."
                    value={newResource.video_url}
                    onChange={(e) => setNewResource({ ...newResource, video_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Official Book / PDF Link</label>
                  <input
                    placeholder="https://ncert.nic.in/textbook.php"
                    value={newResource.file_url}
                    onChange={(e) => setNewResource({ ...newResource, file_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
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
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Detailed Markdown Study Content</label>
                <textarea
                  rows={5}
                  placeholder="Full notes, formulas, theorems, and syllabus checkpoints..."
                  value={newResource.content_markdown}
                  onChange={(e) => setNewResource({ ...newResource, content_markdown: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs outline-none"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                {t("cancel", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white disabled:opacity-50"
              >
                {isSaving ? "Saving to Local DB..." : t("save", "Save Resource")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
