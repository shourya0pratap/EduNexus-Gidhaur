import { requireRole } from "@/lib/auth/server";
export const dynamic = "force-dynamic";

export default async function ParentLayout({children}:{children:React.ReactNode}){await requireRole("parent");return children}
