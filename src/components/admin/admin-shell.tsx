"use client";

import { useEffect, useState } from "react";
import type { SessionPayload } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";

const STORAGE_KEY = "admin-sidebar-collapsed";

type AdminShellProps = {
  session: SessionPayload | null;
  children: React.ReactNode;
};

export function AdminShell({ session, children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setCollapsed(stored === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed, mounted]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const toggleCollapsed = () => setCollapsed((value) => !value);

  return (
    <div className="admin-shell flex min-h-screen bg-[#f4f6f8]">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <AdminSidebar
        session={session}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapsed={toggleCollapsed}
      />

      <div
        className={[
          "flex min-w-0 flex-1 flex-col transition-[margin-left] duration-300 ease-out",
          collapsed ? "lg:ml-[78px]" : "lg:ml-72",
        ].join(" ")}
      >
        <AdminHeader
          session={session}
          collapsed={collapsed}
          onOpenMobile={() => setMobileOpen(true)}
          onToggleCollapsed={toggleCollapsed}
        />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
