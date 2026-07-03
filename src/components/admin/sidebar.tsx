"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";
import type { SessionPayload } from "@/lib/auth";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
  IconX,
} from "@/components/admin/icons";
import { adminNavItems } from "@/components/admin/nav-config";

type AdminSidebarProps = {
  session: SessionPayload | null;
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
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

export function AdminSidebar({
  session,
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const showLabels = !collapsed || mobileOpen;

  return (
    <aside
      className={[
        "admin-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1220] text-slate-100 shadow-2xl transition-[width,transform] duration-300 ease-out",
        collapsed ? "w-[78px]" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-3">
        <Link
          href={adminNavItems[0].href}
          onClick={onCloseMobile}
          className="flex min-w-0 items-center gap-3 overflow-hidden rounded-xl px-2 py-1.5 transition hover:bg-white/5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
            AM
          </div>
          {showLabels ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Al-Misbah
              </p>
              <p className="truncate text-xs text-slate-400">Admin Console</p>
            </div>
          ) : null}
        </Link>

        <button
          type="button"
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          onClick={onCloseMobile}
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p
          className={[
            "mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
            showLabels ? "opacity-100" : "sr-only",
          ].join(" ")}
        >
          Main Menu
        </p>

        {adminNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={showLabels ? undefined : item.label}
              className={[
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition",
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                    : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
              </span>
              {showLabels ? <span className="truncate">{item.label}</span> : null}
              {isActive ? (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        {session && showLabels ? (
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
              {getInitials(session.fullName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {session.fullName}
              </p>
              <p className="truncate text-xs text-slate-400">{session.email}</p>
            </div>
          </div>
        ) : null}

        <form action={logoutAdmin}>
          <button
            type="submit"
            title={showLabels ? undefined : "Logout"}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-200",
              showLabels ? "" : "justify-center",
            ].join(" ")}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
              <IconLogout className="h-5 w-5" />
            </span>
            {showLabels ? <span>Logout</span> : null}
          </button>
        </form>

        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleCollapsed}
          className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white lg:flex"
        >
          {collapsed ? (
            <IconChevronRight className="h-4 w-4" />
          ) : (
            <>
              <IconChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
