import { requireRole } from "@/lib/auth/server";
export default async function ParentLayout({children}:{children:React.ReactNode}){await requireRole("parent");return children}
