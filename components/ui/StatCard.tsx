import { LucideIcon } from "lucide-react";

export function StatCard({ label, value, icon: Icon, helper }: { label: string; value: string | number; icon: LucideIcon; helper?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-card)] p-[var(--space-lg)] shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[var(--text-sm)] font-medium text-[var(--color-muted)]">{label}</p>
          <p className="mt-[var(--space-sm)] text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{value}</p>
          {helper && <p className="mt-[var(--space-xs)] text-[var(--text-xs)] text-[var(--color-muted)]">{helper}</p>}
        </div>
        <div className="rounded-[var(--radius-card)] bg-[var(--color-paper-2)] p-[var(--space-sm)] text-[var(--color-muted)]"><Icon size={20} /></div>
      </div>
    </div>
  );
}
