"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Languages } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "button" | "minimal";
}

export default function LanguageSwitcher({ className = "", variant = "pill" }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === "minimal") {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition active:scale-95 ${className} ${
          language === "hi"
            ? "bg-amber-100 text-amber-900 border border-amber-200"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
        title="Switch Language / भाषा बदलें"
      >
        <Languages size={14} className={language === "hi" ? "text-amber-600" : "text-slate-500"} />
        <span>{language === "hi" ? "हिन्दी" : "English"}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xs backdrop-blur-xs transition ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition active:scale-95 ${
          language === "en"
            ? "bg-slate-900 text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition active:scale-95 ${
          language === "hi"
            ? "bg-amber-600 text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`}
      >
        <span>🇮🇳</span>
        <span>हिन्दी</span>
      </button>
    </div>
  );
}
