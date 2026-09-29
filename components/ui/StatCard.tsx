import { LucideIcon } from "lucide-react";

export function StatCard({
  label, value, icon: Icon, helper
}: {
  label: string; value: string | number; icon: LucideIcon; helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-slate-700"><Icon size={20}/></div>
      </div>
    </div>
  );
}
