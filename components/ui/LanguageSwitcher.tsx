"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button onClick={toggleLanguage} className="inline-flex items-center gap-2 rounded-[var(--radius-card)] px-3 py-1 text-[var(--text-xs)] font-semibold border border-[var(--color-rule)] bg-[var(--color-card)] text-[var(--color-ink)]" title="Switch Language / भाषा बदलें" aria-label="Switch Language"><span>{language === "hi" ? "English" : "हिन्दी"}</span></button>
  );
}
