"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { adminRoutes } from "@/lib/routes";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === adminRoutes.login;

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
