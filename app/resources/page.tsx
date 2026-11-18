"use client";
import { useEffect, useState } from "react";
import ResourceExplorer from "@/components/resources/ResourceExplorer";
import Link from "next/link";
import { ArrowLeft, BellRing, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function PublicResourcesPage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  const supabase = createBrowserClient();
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    async function loadResources() {
      const { data } = await supabase.from("resources").select("*").order("grade_level", { ascending: false });
      if (data) setResources(data);
    }
    loadResources();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-card)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-[var(--space-sm)]">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-[var(--space-xs)] text-[var(--text-xs)] font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)]">
              <ArrowLeft size={16} /> {L("मुख्य पृष्ठ", "Home")}
            </Link>
            <div className="h-4 w-px bg-[var(--color-rule)]" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs shadow-xs">ER</div>
              <span className="text-sm font-extrabold text-[var(--color-ink)]">{L("EduNexus संसाधन", "EduNexus Resources")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/announcements" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]">
              <BellRing size={14} className="text-[var(--color-accent)]" />
              <span>{L("सूचना पट", "Notice Board")}</span>
            </Link>
            <Link href="/report" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] border border-[var(--color-accent-2)] bg-[var(--color-accent-3)] px-[var(--space-sm)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-2)]">
              <FileCheck size={14} />
              <span>{L("अंकतालिका", "Report Card")}</span>
            </Link>
            <Link href="/login" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius-card)] bg-[var(--color-ink)] px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-xs)] font-bold text-[var(--color-card)] hover:bg-[var(--color-ink-2)]">
              {L("पोर्टल लॉगिन", "Portal Login")}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-[var(--space-lg)] sm:px-6 md:py-[var(--space-2xl)]">
        <ResourceExplorer initialResources={resources} />
      </main>
    </div>
  );
}
