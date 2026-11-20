"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AnalyticsOverviewProps {
  total: number;
  present: number;
  pct: number;
}

export default function AnalyticsOverview({ total, present, pct }: AnalyticsOverviewProps) {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-[var(--space-md)] md:p-[var(--space-lg)]"><div className="container">
      <h1 className="text-[var(--text-section)] font-[var(--font-display)] font-[var(--display-weight)] tracking-[var(--tracking-display)] text-[var(--color-ink)] leading-[1.05]">{L("विश्लेषण", "Analytics")}</h1>
      <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("परिशिष्ट अकादमिक डेटा से परिचालन मेट्रिक्स।", "Operational metrics from persisted academic data.")}</p>
      <div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] md:grid-cols-3"><div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><p className="text-[var(--text-sm)] text-[var(--color-muted)]">{L("उपस्थिति रिकॉर्ड", "Attendance records")}</p><p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{total}</p></div><div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><p className="text-[var(--text-sm)] text-[var(--color-muted)]">{L("उपस्थित / विलंब", "Present / late")}</p><p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-accent-2)]">{present}</p></div><div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><p className="text-[var(--text-sm)] text-[var(--color-muted)]">{L("रिकॉर्डेड उपस्थिति", "Recorded attendance")}</p><p className="mt-[var(--space-xs)] text-[var(--text-2xl)] font-bold text-[var(--color-success)]">{pct}%</p></div></div>
      <div className="mt-[var(--space-md)] rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-md)] shadow-[var(--shadow-card)]"><h2 className="font-bold text-[var(--color-ink)]">{L("चार्ट लेयर तैयार", "Chart layer ready")}</h2><p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{L("परिचालन मेट्रिक्स लाइव हैं और स्थानीय डेटाबेस के साथ सिंक्रनाइज़ हैं। कक्षाएं, परीक्षाएं और विषय प्रदर्शन को गतिशील रूप से विज़ुअलाइज़ किया जा सकता है।", "Operational metrics are live and synchronized with the local database. Classes, examinations, and subject performance can be visualized dynamically.")}</p></div></div></div>
  );
}
