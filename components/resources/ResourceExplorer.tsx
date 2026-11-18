"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, BookOpen, Filter, Download, ExternalLink, FileText, CheckCircle2, X, Plus, Sparkles, BookCheck, Layers, Video, BellRing, PlayCircle, BookMarked, Globe, Copy, Check, Printer, ChevronRight, Bookmark } from "lucide-react";
import { ResourceItem } from "@/lib/local-db/initial-data";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface ResourceExplorerProps {
  initialResources: ResourceItem[];
}

const SUBJECT_COLORS: Record<string, { bg: string; text: string; border: string; badgeBg: string }> = {
  Mathematics: { bg: "bg-[var(--color-accent-3)]", text: "text-[var(--color-accent-ink)]", border: "border-[var(--color-accent-2)]", badgeBg: "bg-[var(--color-accent-2)]" },
  Science: { bg: "bg-[var(--color-success)]/10", text: "text-[var(--color-success)]", border: "border-[var(--color-success)]/30", badgeBg: "bg-[var(--color-success)]" },
  Hindi: { bg: "bg-[var(--color-accent-2)]", text: "text-[var(--color-accent-ink)]", border: "border-[var(--color-accent-2)]", badgeBg: "bg-[var(--color-accent-2)]" },
  English: { bg: "bg-[var(--color-paper-2)]", text: "text-[var(--color-ink-2)]", border: "border-[var(--color-rule)]", badgeBg: "bg-[var(--color-rule)]" },
  "Social Science": { bg: "bg-[var(--color-accent-3)]", text: "text-[var(--color-accent-ink)]", border: "border-[var(--color-accent-2)]", badgeBg: "bg-[var(--color-accent-2)]" },
  Sanskrit: { bg: "bg-[var(--color-accent-2)]", text: "text-[var(--color-accent-ink)]", border: "border-[var(--color-accent-2)]", badgeBg: "bg-[var(--color-accent-2)]" },
  "Environmental Studies": { bg: "bg-[var(--color-success)]/10", text: "text-[var(--color-success)]", border: "border-[var(--color-success)]/30", badgeBg: "bg-[var(--color-success)]" },
  "Computer Science": { bg: "bg-[var(--color-accent-3)]", text: "text-[var(--color-accent-ink)]", border: "border-[var(--color-accent-2)]", badgeBg: "bg-[var(--color-accent-2)]" },
};

export default function ResourceExplorer({ initialResources }: ResourceExplorerProps) {
  const { language } = useLanguage();
  const L = (hi: string, en: string) => (language === "hi" ? hi : en);
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

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newGrade, setNewGrade] = useState("10");
  const [newSubject, setNewSubject] = useState("Mathematics");
  const [newBoard, setNewBoard] = useState<"Bihar Board (BSEB)" | "NCERT / CBSE" | "BSEB & NCERT Aligned">("Bihar Board (BSEB)");
  const [newResourceType, setNewResourceType] = useState<"syllabus" | "chapter_notes" | "formula_sheet" | "model_paper" | "solution_guide" | "pdf" | "notification" | "video_lecture">("chapter_notes");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

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

  const subjects = ["All", "Hindi", "English", "Mathematics", "Science", "Social Science", "Sanskrit", "Environmental Studies", "Computer Science"];
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filtered = resources.filter((res) => {
    if (activeTab !== "all") {
      if (activeTab === "video_lecture" && !res.video_url && res.resource_type !== "video_lecture") return false;
      if (activeTab === "chapter_notes" && res.resource_type !== "chapter_notes" && res.resource_type !== "formula_sheet") return false;
      if (activeTab === "notification" && !res.notification_text && res.resource_type !== "notification") return false;
      if (activeTab === "books" && !res.file_url) return false;
    }
    if (selectedGrade !== "all" && res.grade_level !== selectedGrade) return false;
    if (selectedSubject !== "all" && !res.subject_name.toLowerCase().includes(selectedSubject.toLowerCase())) return false;
    if (selectedBoard !== "all" && res.board !== selectedBoard) return false;
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

  const gradeCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const r of resources) {
      counts[r.grade_level] = (counts[r.grade_level] || 0) + 1;
    }
    return counts;
  }, [resources]);

  async function handleCreateResource(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    const newItem: ResourceItem = {
      id: `res-${Date.now()}`,
      title: newTitle,
      title_hindi: "",
      subject_id: `sub-${newSubject.toLowerCase().slice(0, 3)}`,
      class_id: `c-${String(newGrade).padStart(2, "0")}`,
      grade_level: Number(newGrade),
      subject_name: newSubject,
      class_name: `Class ${newGrade}-A`,
      board: newBoard,
      book_reference: "",
      resource_type: newResourceType,
      description: newDesc,
      content_markdown: "",
      file_url: newFileUrl || "https://ncert.nic.in/textbook.php",
      video_url: newVideoUrl || undefined,
      notification_text: "",
      upload_date: new Date().toISOString().slice(0, 10),
      author: "School Academic Faculty",
    };
    const { error } = await supabase.from("resources").insert(newItem);
    setIsSaving(false);
    if (error) {
      alert("Failed to save resource: " + error.message);
      return;
    }
    setResources([newItem, ...resources]);
    setIsAddOpen(false);
    setNewTitle("");
    setNewDesc("");
    setNewGrade("10");
    setNewSubject("Mathematics");
    setNewBoard("Bihar Board (BSEB)");
    setNewResourceType("chapter_notes");
    setNewFileUrl("");
    setNewVideoUrl("");
    alert(L("संसाधन सफलतापूर्वक सहेजा गया!", "Resource created and persisted to database!"));
  }

  return (
    <div className="space-y-[var(--space-lg)]">
      <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-lg)] md:p-[var(--space-xl)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--space-md)]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md">
              <Sparkles size={13} className="text-[var(--color-accent-2)]" />
              <span>{L("कक्षा 1 से 10वीं तक - BSEB एवं NCERT / CBSE संपूर्ण अध्ययन सामग्री", "Classes 1st – 10th Complete Curriculum, Books & Video Lectures")}</span>
            </div>
            <h1 className="mt-[var(--space-sm)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)] leading-[1.05]">{L("पाठ्यक्रम, पुस्तकें, नोट्स एवं वीडियो व्याख्यान", "Curriculum Repository: Notes, Books & Videos")}</h1>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80 leading-relaxed">{language === "hi" ? "सभी विषयों के अध्याय नोट्स, SCERT बिहार एवं NCERT आधिकारिक पाठ्यपुस्तकें, पाठ्यक्रम पूरा करने हेतु वीडियो व्याख्यान एवं परीक्षा सूचनाएँ।" : "Complete chapter notes, formulas, official SCERT Bihar & NCERT textbooks, syllabus video lectures and board examination alerts."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--space-xs)] shrink-0">
            <LanguageSwitcher />
            <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-2)] hover:bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] sm:text-sm font-bold text-[var(--color-accent-ink)] shadow-[var(--shadow-card)] transition active:scale-95">
              <Plus size={16} />
              <span>{L("नया संसाधन जोड़ें", "Add Resource")}</span>
            </button>
          </div>
        </div>
        <div className="mt-[var(--space-md)] flex flex-wrap gap-[var(--space-xs)] pt-[var(--space-sm)] border-t border-[var(--color-card)]/20 text-[var(--text-xs)]">
          <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">{resources.length} {L("संसाधन उपलब्ध", "Resources Available")}</span>
          <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">{L("कक्षा 1 से 10वीं", "Classes 1 to 10")}</span>
          <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">{resources.filter((r) => r.video_url).length} {L("वीडियो व्याख्यान", "Video Lectures")}</span>
          <span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-semibold">{resources.filter((r) => r.file_url).length} {L("आधिकारिक पुस्तकें", "Official Books")}</span>
        </div>
      </div>
      <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-[var(--space-xs)] mb-[var(--space-xs)] px-1">
          <span className="text-[11px] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-muted)] flex items-center gap-[var(--space-xs)]">
            <Layers size={13} />
            <span>{L("कक्षा / ग्रेड पर जाएं", "Jump to Class / Grade")}</span>
          </span>
          <span className="text-[var(--text-xs)] text-[var(--color-muted)]">{filtered.length} {L("सामग्री उपलब्ध", "Resources Available")}</span>
        </div>
        <div className="flex items-center gap-[var(--space-xs)] overflow-x-auto pb-[var(--space-xs)] scrollbar-thin">
          <button onClick={() => setSelectedGrade("all")} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedGrade === "all" ? "bg-[var(--color-ink)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>
            {L("सभी कक्षाएं", "All Classes")} ({resources.length})
          </button>
          {grades.map((grade) => (
            <button key={grade} onClick={() => setSelectedGrade(grade)} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${selectedGrade === grade ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-3)]"}`}>
              <span>Class {grade}</span>
              {grade === 10 && <span className="text-[10px] text-[var(--color-accent-2)] font-extrabold">★</span>}
              <span className={`text-[10px] px-[var(--space-xs)] py-[0.5px] rounded-full ${selectedGrade === grade ? "bg-[var(--color-card)] text-[var(--color-accent-ink)]" : "bg-[var(--color-paper-2)] text-[var(--color-muted)]"}`}>
                {gradeCounts[grade] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-[var(--space-xs)]">
        <button onClick={() => setActiveTab("all")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${activeTab === "all" ? "bg-[var(--color-ink)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] text-[var(--color-ink-2)] border border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"}`}>
          <Layers size={14} />
          <span>{L("सभी संसाधन", "All Resources")} ({resources.length})</span>
        </button>
        <button onClick={() => setActiveTab("video_lecture")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${activeTab === "video_lecture" ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] text-[var(--color-ink-2)] border border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"}`}>
          <Video size={14} className={activeTab === "video_lecture" ? "text-[var(--color-accent-ink)]" : "text-[var(--color-accent-2)]"} />
          <span>{L("वीडियो व्याख्यान (पूरा सिलेबस)", "Video Lectures")}</span>
        </button>
        <button onClick={() => setActiveTab("chapter_notes")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${activeTab === "chapter_notes" ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] text-[var(--color-ink-2)] border border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"}`}>
          <FileText size={14} className={activeTab === "chapter_notes" ? "text-[var(--color-accent-ink)]" : "text-[var(--color-accent-2)]"} />
          <span>{L("अध्याय नोट्स व सूत्र", "Notes & Formulas")}</span>
        </button>
        <button onClick={() => setActiveTab("books")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${activeTab === "books" ? "bg-[var(--color-accent-3)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] text-[var(--color-ink-2)] border border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"}`}>
          <BookMarked size={14} className={activeTab === "books" ? "text-[var(--color-accent-ink)]" : "text-[var(--color-accent-3)]"} />
          <span>{L("पाठ्यपुस्तकें (SCERT/NCERT)", "Official Books")}</span>
        </button>
        <button onClick={() => setActiveTab("notification")} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold transition ${activeTab === "notification" ? "bg-[var(--color-accent-2)] text-[var(--color-accent-ink)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] text-[var(--color-ink-2)] border border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"}`}>
          <BellRing size={14} className={activeTab === "notification" ? "text-[var(--color-accent-ink)]" : "text-[var(--color-accent-2)]"} />
          <span>{L("परीक्षा सूचनाएँ", "Exam Alerts")}</span>
        </button>
      </div>
      <div className="grid gap-[var(--space-xs)] sm:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] shadow-[var(--shadow-card)] focus-within:border-[var(--color-accent-2)] focus-within:ring-2 focus-within:ring-[var(--color-accent)] transition">
          <Search size={16} className="text-[var(--color-muted)] shrink-0" />
          <input className="w-full text-[var(--text-xs)] outline-none placeholder:text-[var(--color-muted)]" placeholder={L("विषय, अध्याय, पुस्तक या टॉपिक खोजें...", "Search by topic, chapter, book...")} value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-[var(--text-xs)] px-[var(--space-xs)]">
              <X size={14} />
            </button>
          )}
        </div>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)] outline-none shadow-[var(--shadow-card)]">
          {subjects.map((s) => (
            <option key={s} value={s === "All" ? "all" : s}>{s === "All" ? (language === "hi" ? "सभी विषय (All Subjects)" : "All Subjects") : s}</option>
          ))}
        </select>
        <select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-sm)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)] outline-none shadow-[var(--shadow-card)]">
          <option value="all">{L("सभी बोर्ड (All Boards)", "All Boards")}</option>
          <option value="Bihar Board (BSEB)">Bihar Board (BSEB)</option>
          <option value="NCERT / CBSE">NCERT / CBSE</option>
          <option value="BSEB & NCERT Aligned">BSEB & NCERT Aligned</option>
        </select>
      </div>
      {(selectedGrade !== "all" || selectedSubject !== "all" || selectedBoard !== "all" || search || activeTab !== "all") && (
        <div className="flex flex-wrap items-center gap-[var(--space-xs)] text-[var(--text-xs)]">
          <span className="font-semibold text-[var(--color-muted)]">{L("परिणाम मिले:", "Showing ")}{filtered.length} {L("मैच:", "matches:")}</span>
          {activeTab !== "all" && (
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-ink)] px-[var(--space-sm)] py-[0.5px] font-bold text-[var(--color-card)] text-[11px]">{activeTab}<button onClick={() => setActiveTab("all")}><X size={11} /></button></span>
          )}
          {selectedGrade !== "all" && (
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-accent-3)] px-[var(--space-sm)] py-[0.5px] font-bold text-[var(--color-accent-ink)] text-[11px]">Class {selectedGrade}<button onClick={() => setSelectedGrade("all")}><X size={11} /></button></span>
          )}
          {selectedSubject !== "all" && (
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-accent-3)] px-[var(--space-sm)] py-[0.5px] font-bold text-[var(--color-accent-ink)] text-[11px]">{selectedSubject}<button onClick={() => setSelectedSubject("all")}><X size={11} /></button></span>
          )}
          {search && (
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-paper-2)] px-[var(--space-sm)] py-[0.5px] font-bold text-[var(--color-ink-2)] text-[11px]">"{search}"<button onClick={() => setSearch("")}><X size={11} /></button></span>
          )}
          <button onClick={() => { setSelectedGrade("all"); setSelectedSubject("all"); setSelectedBoard("all"); setActiveTab("all"); setSearch(""); }} className="text-[var(--text-xs)] font-semibold text-[var(--color-accent-2)] hover:underline ml-[var(--space-xs)]">{L("सभी साफ़ करें", "Reset filters")}</button>
        </div>
      )}
      <div className="grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => {
        const colors = SUBJECT_COLORS[item.subject_name] || { bg: "bg-[var(--color-paper-2)]", text: "text-[var(--color-ink-2)]", border: "border-[var(--color-rule)]", badgeBg: "bg-[var(--color-rule)]" };
        return (
          <article key={item.id} className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-sm)] shadow-[var(--shadow-card)] transition hover:border-[var(--color-accent-2)] hover:shadow-md">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-xs)]">
                <div className="flex items-center gap-[var(--space-xs)]">
                  <span className="rounded-md bg-[var(--color-ink)] px-[var(--space-xs)] py-[0.5px] text-[11px] font-extrabold text-[var(--color-card)]">Class {item.grade_level}</span>
                  <span className={`${colors.bg} ${colors.text} rounded-md px-[var(--space-xs)] py-[0.5px] text-[11px] font-bold`}>{item.subject_name}</span>
                </div>
                <span className="text-[10px] font-semibold text-[var(--color-muted)] bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] rounded">{item.board === "Bihar Board (BSEB)" ? "BSEB" : item.board === "NCERT / CBSE" ? "NCERT" : "BSEB/NCERT"}</span>
              </div>
              <h3 className="mt-[var(--space-xs)] text-[var(--text-xs)] md:text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent-2)] transition leading-snug">{language === "hi" && item.title_hindi ? item.title_hindi : item.title}</h3>
              {language === "en" && item.title_hindi && (
                <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)] line-clamp-1">{item.title_hindi}</p>
              )}
              {item.notification_text && (
                <div className="mt-[var(--space-xs)] flex items-start gap-[var(--space-xs)] rounded-lg bg-[var(--color-accent-3)] p-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-accent-ink)] border border-[var(--color-accent-2)]/80">
                  <BellRing size={13} className="text-[var(--color-accent-2)] shrink-0 mt-[var(--space-xs)]" />
                  <p className="font-semibold leading-tight line-clamp-2">{item.notification_text}</p>
                </div>
              )}
              <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)] line-clamp-2 leading-relaxed">{item.description}</p>
              <div className="mt-[var(--space-xs)] flex items-center gap-[var(--space-xs)] text-[11px] text-[var(--color-muted)] bg-[var(--color-paper-2)] rounded-[var(--radius-card)] px-[var(--space-xs)] py-[var(--space-xs)] truncate">
                <BookCheck size={12} className="text-[var(--color-accent-2)] shrink-0" />
                <span className="truncate">{item.book_reference}</span>
              </div>
            </div>
            <div className="mt-[var(--space-sm)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] flex items-center justify-between gap-[var(--space-xs)]">
              <button onClick={() => setActiveModalResource(item)} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] transition active:scale-95">
                <BookOpen size={13} />
                {language === "hi" ? "नोट्स पढ़ें" : "Read Notes"}
              </button>
              <div className="flex items-center gap-[var(--space-xs)]">
                {item.video_url && (
                  <a href={item.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-3)] hover:bg-[var(--color-accent-2)] border border-[var(--color-accent-2)] px-[var(--space-xs)] py-[var(--space-xs)] text-[11px] font-bold text-[var(--color-accent-ink)] transition" title={item.video_title || "Watch lecture"}>
                    <PlayCircle size={13} />
                    {language === "hi" ? "वीडियो" : "Video"}
                  </a>
                )}
                {item.file_url && (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] border border-[var(--color-rule)] px-[var(--space-xs)] py-[var(--space-xs)] text-[11px] font-medium text-[var(--color-ink-2)] transition" title="Open Official Textbook">
                    <ExternalLink size={12} />
                    {language === "hi" ? "पुस्तक" : "Book"}
                  </a>
                )}
                <button onClick={() => setActiveModalResource(null)} className="rounded-[var(--radius-card)] bg-[var(--color-ink)] hover:bg-[var(--color-ink-2)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] transition">{L("बंद करें", "Close")}</button>
              </div>
            </div>
          </article>
        );
      })}</div>
      {!filtered.length && (
        <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-2xl)] text-center shadow-[var(--shadow-card)]">
          <BookOpen size={36} className="mx-auto text-[var(--color-muted)]" />
          <h3 className="mt-[var(--space-sm)] font-bold text-[var(--color-ink)]">{L("कोई संसाधन नहीं मिला", "No resources found")}</h3>
          <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("कृपया अपनी खोज शब्द या कक्षा फ़िल्टर बदलकर पुनः प्रयास करें।", "Try adjusting your search keyword or selected grade/subject filters.")}</p>
        </div>
      )}
      {activeModalResource && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-sm)] sm:p-[var(--space-md)] bg-[var(--color-ink)]/60 backdrop-blur-xs" onClick={(e) => { if (e.target === e.currentTarget) setActiveModalResource(null); }}>
          <div className="max-h-[92vh] w-full max-w-[48rem] overflow-y-auto rounded-[var(--radius-card)] bg-[var(--color-card)] p-[var(--space-md)] sm:p-[var(--space-lg)] shadow-[var(--shadow-card)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-[var(--space-xs)] border-b border-[var(--color-rule)] pb-[var(--space-sm)]">
                <div>
                  <div className="flex flex-wrap items-center gap-[var(--space-xs)]">
                    <span className="rounded-md bg-[var(--color-ink)] px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-card)]">Class {activeModalResource.grade_level}</span>
                    <span className="rounded-md bg-[var(--color-accent-3)] px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)]">{activeModalResource.subject_name}</span>
                    <span className="rounded-md bg-[var(--color-success)] px-[var(--space-xs)] py-[0.5px] text-[var(--text-xs)] font-bold text-[var(--color-success)]">{activeModalResource.board}</span>
                  </div>
                  <h2 className="mt-[var(--space-xs)] text-[var(--text-xs)] sm:text-lg font-bold text-[var(--color-ink)] leading-snug">{language === "hi" && activeModalResource.title_hindi ? activeModalResource.title_hindi : activeModalResource.title}</h2>
                  <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">Book: {activeModalResource.book_reference} · Author: {activeModalResource.author}</p>
                </div>
                <button onClick={() => setActiveModalResource(null)} className="rounded-[var(--radius-card)] p-[var(--space-xs)] text-[var(--color-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] transition"><X size={20} /></button>
              </div>
              {activeModalResource.notification_text && (
                <div className="mt-[var(--space-sm)] flex items-start gap-[var(--space-xs)] rounded-xl bg-[var(--color-accent-3)] p-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-accent-ink)] border border-[var(--color-accent-2)]">
                  <BellRing size={16} className="text-[var(--color-accent-2)] shrink-0 mt-[var(--space-xs)]" />
                  <div>
                    <span className="font-bold">{L("अध्याय सूचना / परीक्षा अपडेट:", "Board Exam Alert:")}</span>
                    <p className="mt-[var(--space-xs)] leading-relaxed">{activeModalResource.notification_text}</p>
                  </div>
                </div>
              )}
              {activeModalResource.video_url && (
                <div className="mt-[var(--space-sm)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[var(--space-xs)] rounded-xl bg-[var(--color-accent-3)] p-[var(--space-sm)] sm:p-[var(--space-md)] border border-[var(--color-accent-2)]">
                  <div className="flex items-center gap-[var(--space-xs)]">
                    <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-2)] p-[var(--space-xs)] text-[var(--color-accent-ink)]"><PlayCircle size={20} /></div>
                    <div>
                      <h4 className="text-[var(--text-xs)] font-bold uppercase tracking-[var(--tracking-display)] text-[var(--color-accent-ink)]">{L("संपूर्ण पाठ्यक्रम वीडियो व्याख्यान", "Complete Syllabus Video Lecture")}</h4>
                      <p className="text-[var(--text-xs)] text-[var(--color-accent-ink)] mt-[var(--space-xs)] line-clamp-1">{activeModalResource.video_title || "Full syllabus chapter-by-chapter playlist"}</p>
                    </div>
                  </div>
                  <a href={activeModalResource.video_url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-[var(--radius-card)] bg-[var(--color-accent-2)] hover:bg-[var(--color-accent)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] shadow-xs transition"><PlayCircle size={13} /> {L("वीडियो", "Video")}</a>
                </div>
              )}
              <div className="mt-[var(--space-md)] prose prose-slate max-w-none text-[var(--text-xs)] sm:text-sm leading-relaxed whitespace-pre-line bg-[var(--color-paper-2)] p-[var(--space-md)] sm:p-[var(--space-lg)] rounded-[var(--radius-card)] border border-[var(--color-rule)]/80 font-sans">{activeModalResource.content_markdown || activeModalResource.description}</div>
            </div>
            <div className="mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] flex flex-wrap items-center justify-between gap-[var(--space-xs)]">
              <div className="flex items-center gap-[var(--space-xs)]">
                <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] transition">{copied ? <Check size={13} className="text-[var(--color-success)]" /> : <Copy size={13} />}<span>{copied ? "Copied!" : L("नोट्स कॉपी करें", "Copy Notes")}</span></button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] transition"><Printer size={13} /><span>{L("प्रिंट करें", "Print")}</span></button>
              </div>
              <div className="flex items-center gap-[var(--space-xs)]">
                {activeModalResource.file_url && (
                  <a href={activeModalResource.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-accent-3)] border border-[var(--color-accent-2)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-2)] transition"><ExternalLink size={13} />
                    {language === "hi" ? "पुस्तक" : "Book"}
                  </a>
                )}
                <button onClick={() => setActiveModalResource(null)} className="rounded-[var(--radius-card)] bg-[var(--color-ink)] hover:bg-[var(--color-ink-2)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] transition">{L("बंद करें", "Close")}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAddOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-sm)] sm:p-[var(--space-md)] bg-[var(--color-ink)]/60 backdrop-blur-xs">
          <form onSubmit={handleCreateResource} className="max-h-[90vh] w-full max-w-[36rem] overflow-y-auto rounded-[var(--radius-card)] bg-[var(--color-card)] p-[var(--space-md)] sm:p-[var(--space-lg)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-[var(--space-sm)]">
              <h2 className="text-[var(--text-xs)] sm:text-lg font-bold text-[var(--color-ink)]">{L("नया संसाधन जोड़ें", "Add Resource")}</h2>
              <button type="button" onClick={() => setIsAddOpen(false)} className="rounded-[var(--radius-card)] p-[var(--space-xs)] text-[var(--color-muted)] hover:bg-[var(--color-paper-2)]"><X size={18} /></button>
            </div>
            <div className="mt-[var(--space-md)] space-y-[var(--space-sm)] text-[var(--text-xs)]">
              <div className="grid gap-[var(--space-xs)] sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-[var(--color-ink-2)]">{L("कक्षा / ग्रेड (1वीं - 10वीं)", "Class / Grade (1st - 10th)")}</label>
                  <select value={newGrade} onChange={(e) => setNewGrade(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none">{grades.map((g) => <option key={g} value={g}>Class {g}</option>)}</select>
                </div>
                <div>
                  <label className="font-semibold text-[var(--color-ink-2)]">{L("विषय", "Subject")}</label>
                  <select value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none">{subjects.filter((s) => s !== "All").map((s) => <option key={s} value={s}>{s}</option>)}</select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("शैक्षिक बोर्ड", "Educational Board")}</label>
                <select value={newBoard} onChange={(e) => setNewBoard(e.target.value as "Bihar Board (BSEB)" | "NCERT / CBSE" | "BSEB & NCERT Aligned")} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none"><option value="Bihar Board (BSEB)">Bihar Board (BSEB)</option><option value="NCERT / CBSE">NCERT / CBSE</option><option value="BSEB & NCERT Aligned">BSEB & NCERT Aligned</option></select>
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("शीर्षक (अंग्रेजी में)", "Title (English)")}</label>
                <input required placeholder="e.g. Class 10 Trigonometry Chapter Notes & Formula Sheet" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("शीर्षक हिन्दी में", "Title in Hindi")}</label>
                <input placeholder="उदा. कक्षा 10 त्रिकोणमिति अध्याय नोट्स व सूत्र संग्रह" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("पाठ्यपुस्तक संदर्भ", "Textbook Reference")}</label>
                <input required placeholder="e.g. SCERT Bihar Ganit Class 10 / NCERT Mathematics" value={newFileUrl} onChange={(e) => setNewFileUrl(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("अध्याय सूचना / परीक्षा अलर्ट (वैकल्पिक)", "Chapter Notification / Exam Alert (Optional)")}</label>
                <input placeholder="उदा. 📢 महत्वपूर्ण: सेक्शन बी में 15 अंकों का प्रश्न अपेक्षित" value="" onChange={() => {}} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
              </div>
              <div className="grid gap-[var(--space-xs)] sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-[var(--color-ink-2)]">{L("वीडियो व्याख्यान URL (YouTube)", "Video Lecture URL (YouTube)")}</label>
                  <input placeholder="https://youtube.com/..." value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-[var(--color-ink-2)]">{L("आधिकारिक पुस्तक / PDF लिंक", "Official Book / PDF Link")}</label>
                  <input placeholder="https://ncert.nic.in/textbook.php" value="" onChange={() => {}} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("सारांश विवरण", "Summary Description")}</label>
                <textarea required rows={2} placeholder="अध्याय में क्या शामिल है इसका संक्षिप्त विवरण..." value="" onChange={() => {}} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] outline-none" />
              </div>
              <div>
                <label className="font-semibold text-[var(--color-ink-2)]">{L("विस्तृत मार्कडाउन अध्ययन सामग्री", "Detailed Markdown Study Content")}</label>
                <textarea rows={4} placeholder="पूर्ण नोट्स, सूत्र, प्रमेय और पाठ्यक्रम जांच बिंदु..." value="" onChange={() => {}} className="mt-[var(--space-xs)] w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] p-[var(--space-xs)] font-[var(--font-outlier)] text-[var(--text-xs)] outline-none" />
              </div>
            </div>
            <div className="mt-[var(--space-md)] flex justify-end gap-[var(--space-xs)] border-t border-[var(--color-rule)] pt-[var(--space-sm)]">
              <button type="button" onClick={() => setIsAddOpen(false)} className="rounded-[var(--radius-card)] border border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)]">{L("रद्द करें", "Cancel")}</button>
              <button type="submit" disabled={isSaving} className="rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--text-xs)] font-bold text-[var(--color-card)] disabled:opacity-55">{isSaving ? L("सहेजा जा रहा है...", "Saving...") : L("संसाधन सहेजें", "Save Resource")}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
