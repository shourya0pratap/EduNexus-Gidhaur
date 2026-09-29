import { createServerSupabase } from "@/lib/supabase/server";
import ResourceExplorer from "@/components/resources/ResourceExplorer";
import { INITIAL_RESOURCES } from "@/lib/local-db/initial-data";

export default async function ResourcesPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("resources")
    .select("*")
    .order("grade_level", { ascending: false });

  const resources = data && data.length > 0 ? data : INITIAL_RESOURCES;

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <ResourceExplorer initialResources={resources} />
      </div>
    </div>
  );
}
