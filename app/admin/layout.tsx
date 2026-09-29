import { requireRole } from "@/lib/auth/server";
import AdminShell from "@/components/dashboard/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("admin");
  return <AdminShell>{children}</AdminShell>;
}
