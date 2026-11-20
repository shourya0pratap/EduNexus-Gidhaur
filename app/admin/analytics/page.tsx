import { createServerSupabase } from "@/lib/supabase/server";
import { calculateAttendancePercentage } from "@/lib/calculations/academic";
import AnalyticsOverview from "@/components/analytics/AnalyticsOverview";

export default async function AnalyticsPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("attendance").select("status,student_id");
  const rows: any[] = data ?? [];
  const present = rows.filter((x: any) => x.status !== "absent").length;
  const pct = calculateAttendancePercentage(present, rows.length - present, 0);
  return <AnalyticsOverview total={rows.length} present={present} pct={pct} />;
}
