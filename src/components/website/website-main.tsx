"use client";

import { usePathname } from "next/navigation";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/nav-layout";

type WebsiteMainProps = {
  children: React.ReactNode;
};

export function WebsiteMain({ children }: WebsiteMainProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={isHome ? "flex-1" : `flex-1 ${SITE_HEADER_OFFSET_CLASS}`}>
      {children}
    </main>
  );
}
