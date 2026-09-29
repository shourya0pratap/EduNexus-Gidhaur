import { requireRole } from "@/lib/auth/server";
import AdminShell from "@/components/dashboard/AdminShell";
export default async function TeacherLayout({children}:{children:React.ReactNode}) {
  await requireRole("teacher");
  return <AdminShell>{children}</AdminShell>;
}
