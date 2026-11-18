"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, BellRing, School, Search, ArrowLeft, Calendar, Printer, Check, Sparkles, ExternalLink, Share2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface Announcement {
  id: string; title: string; title_hindi?: string;
  category: "Exams" | "Academic" | "Events" | "Holidays" | "General";
  priority: "urgent" | "important" | "normal";
  target_audience: string; date: string; circular_number: string;
  content: string; content_hindi?: string; author: string; is_pinned?: boolean;
}

export default function PublicAnnouncementsPage() {
  const { lang } = useLanguage();
  const supabase = createBrowserClient();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);

  useEffect(() => {
    async function loadNotices() {
      try {
        const res = await fetch("/api/local-db?table=announcements");
        if (res.ok) { const json = await res.json(); if (Array.isArray(json) && json.length > 0) { setAnnouncements(json); return; } }
      } catch {}
      const { data } = await supabase.from("announcements").select("*");
      if (data && data.length) setAnnouncements(data);
    }
    loadNotices();
  }, []);

  const categories = ["all", "Exams", "Academic", "Events", "Holidays", "General"];
  const filtered = announcements.filter((a) => {
    if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
    if (search.trim()) { const q = search.toLowerCase(); const match = a.title.toLowerCase().includes(q) || (a.title_hindi && a.title_hindi.toLowerCase().includes(q)) || a.content.toLowerCase().includes(q) || (a.content_hindi && a.content_hindi.toLowerCase().includes(q)) || a.circular_number.toLowerCase().includes(q) || a.target_audience.toLowerCase().includes(q); if (!match) return false; }
    return true;
  });

  function handleShare(id: string) { if (typeof window !== "undefined") { navigator.clipboard.writeText(window.location.href); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); } }

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased font-[var(--font-body)] px-4 py-[var(--space-3xl)]">
      <div className="container">
        <div className="flex items-center justify-between mb-[var(--space-lg)]">
          <Link href="/" className="inline-flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition"><ArrowLeft size={16} /> {L("मुख्य पृष्ठ", "Home")}</Link>
          <div className="flex items-center gap-3"><Link href="/report" className="text-[var(--text-xs)] font-bold text-[var(--color-accent)] hover:underline">{L("अंकतालिका खोज", "Report Card Lookup")}</Link><Link href="/login" className="rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-card)] shadow-[var(--shadow-card)] hover:bg-[var(--color-ink-2)] transition">{L("पोर्टल लॉगिन", "Portal Login")}</Link><LanguageSwitcher /></div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-2)] to-[var(--color-accent-2)] p-[var(--space-lg)] md:p-[var(--space-xl)] text-[var(--color-card)] shadow-[var(--shadow-card)]">
          <div className="inline-flex items-center gap-[var(--space-xs)] rounded-full bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-semibold backdrop-blur-md"><School size={14} className="text-[var(--color-accent-2)]" /><span>Gidhaur Central School, Jamui (Bihar)</span></div>
          <h1 className="mt-[var(--space-sm)] text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-card)]">{L("आधिकारिक सूचना पट एवं परिपत्र (Notice Board)", "Official Public Notices & Circulars")}</h1>
          <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-card)]/80 max-w-2xl leading-relaxed">{lang === "hi" ? "विद्यालय की सभी महत्वपूर्ण घोषणाएं, परीक्षा समय-सारणी, अवकाश एवं शैक्षणिक सूचनाएं बिना लॉगिन के सीधे देखें।" : "Access all school announcements, examination circulars, holiday notices, and academic directives publicly without login."}</p>
          <div className="mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-card)]/20 flex flex-wrap items-center gap-[var(--space-sm)] text-[var(--text-xs)]"><span className="rounded-[var(--radius-card)] bg-[var(--color-card)]/10 px-[var(--space-sm)] py-[var(--space-xs)] font-bold text-[var(--color-accent-2)]"> {announcements.length} {L("सक्रिय सूचनाएं", "Active Circulars")}</span><span className="text-[var(--color-card)]/60">Session 2026-27 · Bihar School Examination Board (BSEB)</span></div>
        </div>

        <div className="mt-[var(--space-lg)] flex flex-col md:flex-row items-center justify-between gap-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-xs)] overflow-x-auto pb-[var(--space-xs)] w-full md:w-auto scrollbar-none">{categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 rounded-[var(--radius-card)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold transition capitalize ${selectedCategory === cat ? "bg-[var(--color-ink)] text-[var(--color-card)] shadow-[var(--shadow-card)]" : "bg-[var(--color-card)] border border-[var(--color-rule)] text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)]"}`}>{cat === "all" ? (lang === "hi" ? "सभी सूचनाएं" : "All Notices") : cat}</button>
          ))}</div>
          <div className="relative w-full md:w-72"><Search size={16} className="absolute left-[var(--space-sm)] top-[var(--space-sm)] text-[var(--color-muted)]" /><input className="w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] pl-[var(--space-lg)] pr-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent)] shadow-[var(--shadow-card)] font-medium" placeholder={L("सूचना खोजें...", "Search notices...")} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        </div>

        <div className="mt-[var(--space-md)] space-y-[var(--space-sm)]">{filtered.map((item) => (
          <div key={item.id} className={`rounded-[var(--radius-card)] border bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)] transition hover:border-[var(--color-accent-2)] hover:shadow-md ${item.priority === "urgent" ? "border-l-4 border-l-[var(--color-danger)]" : item.priority === "important" ? "border-l-4 border-l-[var(--color-accent-2)]" : "border-[var(--color-rule)]"}`}>
            <div className="flex flex-wrap items-center justify-between gap-[var(--space-xs)]"><div className="flex flex-wrap items-center gap-[var(--space-xs)] text-[var(--text-xs)]"><span className={`rounded-md px-[var(--space-xs)] py-[0.5px] text-[10px] font-black  tracking-[var(--tracking-display)] ${item.priority === "urgent" ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]" : item.priority === "important" ? "bg-[var(--color-accent-2)]/10 text-[var(--color-accent)]" : "bg-[var(--color-accent-3)]/10 text-[var(--color-accent-2)]"}`}>{item.priority === "urgent" ? "URGENT (अति आवश्यक)" : item.priority === "important" ? "IMPORTANT" : "NOTICE"}</span><span className="rounded-md bg-[var(--color-paper-2)] px-[var(--space-xs)] py-[0.5px] text-[10px] font-bold text-[var(--color-muted)]">{item.category}</span><span className="text-[11px] text-[var(--color-muted)] font-[var(--font-outlier)] font-medium">Ref: {item.circular_number}</span></div><div className="flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]"><Calendar size={13} /><span>{item.date}</span></div></div>
            <h2 className="mt-[var(--space-xs)] text-[var(--text-xs)] sm:text-sm font-bold text-[var(--color-ink)] leading-snug">{lang === "hi" && item.title_hindi ? item.title_hindi : item.title}</h2>
            <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-ink-2)] font-medium"><span className="font-bold text-[var(--color-ink)]">{L("लक्षित वर्ग:", "Target Audience:")}</span> {item.target_audience} · <span className="font-bold text-[var(--color-ink)]">{L("जारीकर्ता:", "Issuer:")}</span> {item.author}</p>
            <div className="mt-[var(--space-sm)] text-[var(--text-xs)] text-[var(--color-ink-2)] leading-relaxed bg-[var(--color-paper-2)] p-[var(--space-sm)] rounded-[var(--radius-card)] border border-[var(--color-rule)]">{lang === "hi" && item.content_hindi ? item.content_hindi : item.content}</div>
            <div className="mt-[var(--space-sm)] pt-[var(--space-sm)] border-t border-[var(--color-rule)] flex items-center justify-between text-[var(--text-xs)]"><span className="font-semibold text-[var(--color-muted)]">Gidhaur Central School Administration</span><div className="flex items-center gap-[var(--space-xs)]"><button onClick={() => handleShare(item.id)} className="inline-flex items-center gap-[var(--space-xs)] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition">{copiedId === item.id ? <Check size={14} className="text-[var(--color-success)]" /> : <Share2 size={14} />}<span>{copiedId === item.id ? "Copied" : "Share"}</span></button><button onClick={() => window.print()} className="inline-flex items-center gap-[var(--space-xs)] text-[var(--color-accent)] font-semibold hover:underline"><Printer size={14} /><span>{L("प्रिंट", "Print")}</span></button></div></div>
          </div>
        ))}
        {!filtered.length && <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-2xl)] text-center shadow-[var(--shadow-card)]"><Bell size={28} className="mx-auto text-[var(--color-muted)]" /><p className="mt-[var(--space-sm)] text-sm font-bold text-[var(--color-ink)]">No circulars found matching your filter</p><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">Try selecting 'All Notices' or changing your search term.</p></div>}
        </div>
      </div>
    </main>
  );
}
