"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell, BellRing, School, Search, ArrowLeft, Calendar,
  FileText, Filter, Tag, Share2, Check, Sparkles, ExternalLink, Printer
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface Announcement {
  id: string;
  title: string;
  title_hindi?: string;
  category: "Exams" | "Academic" | "Events" | "Holidays" | "General";
  priority: "urgent" | "important" | "normal";
  target_audience: string;
  date: string;
  circular_number: string;
  content: string;
  content_hindi?: string;
  author: string;
  is_pinned?: boolean;
}

export default function PublicAnnouncementsPage() {
  const { lang, t } = useLanguage();
  const supabase = createBrowserClient();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeNotice, setActiveNotice] = useState<Announcement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotices() {
      // First try local db API directly for maximum speed and freshest server state
      try {
        const res = await fetch("/api/local-db?table=announcements");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            setAnnouncements(json);
            return;
          }
        }
      } catch {
        // fallback to supabase browser client
      }

      const { data } = await supabase.from("announcements").select("*");
      if (data && data.length) {
        setAnnouncements(data);
      }
    }
    loadNotices();
  }, []);

  const categories = ["all", "Exams", "Academic", "Events", "Holidays", "General"];

  const filtered = announcements.filter((a) => {
    if (selectedCategory !== "all" && a.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        a.title.toLowerCase().includes(q) ||
        (a.title_hindi && a.title_hindi.toLowerCase().includes(q)) ||
        a.content.toLowerCase().includes(q) ||
        (a.content_hindi && a.content_hindi.toLowerCase().includes(q)) ||
        a.circular_number.toLowerCase().includes(q) ||
        a.target_audience.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  function handleShare(id: string) {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition"
          >
            <ArrowLeft size={16} />
            <span>{lang === "hi" ? "मुख्य पृष्ठ" : "Home"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/report"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              {lang === "hi" ? "अंकतालिका खोज" : "Report Card Lookup"}
            </Link>
            <Link
              href="/login"
              className="rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-slate-800 transition"
            >
              {lang === "hi" ? "पोर्टल लॉगिन" : "Portal Login"}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Header Hero Banner */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-md">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <School size={14} className="text-amber-400" />
            <span>Gidhaur Central School, Jamui (Bihar)</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {lang === "hi" ? "आधिकारिक सूचना पट एवं परिपत्र (Notice Board)" : "Official Public Notices & Circulars"}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {lang === "hi"
              ? "विद्यालय की सभी महत्वपूर्ण घोषणाएं, परीक्षा समय-सारणी, अवकाश एवं शैक्षणिक सूचनाएं बिना लॉगिन के सीधे देखें।"
              : "Access all school announcements, examination circulars, holiday notices, and academic directives publicly without login."}
          </p>

          {/* Quick Counter */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-lg bg-white/10 px-3 py-1 font-bold text-amber-400">
              📢 {announcements.length} {lang === "hi" ? "सक्रिय सूचनाएं" : "Active Circulars"}
            </span>
            <span className="text-slate-300">
              Session 2026-27 · Bihar School Examination Board (BSEB)
            </span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition capitalize ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat === "all" ? (lang === "hi" ? "सभी सूचनाएं" : "All Notices") : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs font-medium"
              placeholder={lang === "hi" ? "सूचना खोजें..." : "Search notices..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="mt-5 space-y-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm ${
                item.priority === "urgent" ? "border-l-4 border-l-red-500" : item.priority === "important" ? "border-l-4 border-l-amber-500" : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    item.priority === "urgent"
                      ? "bg-red-100 text-red-800"
                      : item.priority === "important"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {item.priority === "urgent" ? "URGENT (अति आवश्यक)" : item.priority === "important" ? "IMPORTANT" : "NOTICE"}
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    {item.category}
                  </span>

                  <span className="text-[11px] text-slate-500 font-mono font-medium">
                    Ref: {item.circular_number}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={13} />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="mt-2.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {lang === "hi" && item.title_hindi ? item.title_hindi : item.title}
              </h2>

              {/* Audience */}
              <p className="mt-1 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-700">{lang === "hi" ? "लक्षित वर्ग:" : "Target Audience:"}</span> {item.target_audience} · <span className="font-bold text-slate-700">{lang === "hi" ? "जारीकर्ता:" : "Issuer:"}</span> {item.author}
              </p>

              {/* Body Content */}
              <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                {lang === "hi" && item.content_hindi ? item.content_hindi : item.content}
              </div>

              {/* Actions Footer */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  Gidhaur Central School Administration
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(item.id)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition"
                  >
                    {copiedId === item.id ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                    <span>{copiedId === item.id ? "Copied" : "Share"}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
                  >
                    <Printer size={14} />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!filtered.length && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Bell size={28} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-bold text-slate-700">No circulars found matching your filter</p>
              <p className="mt-0.5 text-xs text-slate-400">Try selecting &apos;All Notices&apos; or changing your search term.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
