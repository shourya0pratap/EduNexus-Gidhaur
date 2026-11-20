import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardRouter() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  redirect(`/${profile.role}`);
}
