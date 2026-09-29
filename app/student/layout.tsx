import { requireRole } from "@/lib/auth/server";
export default async function StudentLayout({children}:{children:React.ReactNode}){await requireRole("student");return children}
