import { createServerSupabase } from "@/lib/supabase/server";
import TeachersDirectory from "@/components/teachers/TeachersDirectory";

export default async function TeachersPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("teachers")
    .select("*")
    .order("hierarchy_level", { ascending: true });

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TeachersDirectory teachers={data ?? []} />
      </div>
    </div>
  );
}
