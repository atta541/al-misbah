"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SessionPayload } from "@/lib/auth";
import { websiteRoutes } from "@/lib/routes";
import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconMenu,
} from "@/components/admin/icons";
import { getAdminNavItem } from "@/components/admin/nav-config";

type AdminHeaderProps = {
  session: SessionPayload | null;
  collapsed: boolean;
  onOpenMobile: () => void;
  onToggleCollapsed: () => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminHeader({
  session,
  collapsed,
  onOpenMobile,
  onToggleCollapsed,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const current = getAdminNavItem(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={onOpenMobile}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <IconMenu className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapsed}
            className="hidden rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:inline-flex"
          >
            {collapsed ? (
              <IconChevronRight className="h-5 w-5" />
            ) : (
              <IconChevronLeft className="h-5 w-5" />
            )}
          </button>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-600">
              Admin
            </p>
            <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
              {current.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={websiteRoutes.home}
            target="_blank"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:inline-flex"
          >
            <IconExternalLink className="h-4 w-4" />
            View Site
          </Link>

          {session ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-900">
                  {session.fullName}
                </p>
                <p className="max-w-[180px] truncate text-xs text-slate-500">
                  {session.email}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white shadow-sm">
                {getInitials(session.fullName)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
