import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/server";

export default async function DashboardRouter() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  redirect(`/${profile.role}`);
}
