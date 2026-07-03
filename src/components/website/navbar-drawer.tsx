"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import {
  isNavItemActive,
  websiteNavItems,
} from "@/components/website/nav-config";
import { websiteRoutes } from "@/lib/routes";

type NavbarDrawerProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function NavbarDrawer({ open, pathname, onClose }: NavbarDrawerProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        className={[
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        aria-hidden={!open}
        className={[
          "fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,20rem)] flex-col bg-brand-dark shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
            Menu
          </p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
          {websiteNavItems.map((item) => {
            const active = isNavItemActive(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "rounded-xl px-4 py-3 text-base font-medium transition",
                  active
                    ? "bg-white/10 text-accent"
                    : "text-white/85 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href={websiteRoutes.contact}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/80 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-dark"
          >
            Donate now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
