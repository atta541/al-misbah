"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { NavbarDrawer } from "@/components/website/navbar-drawer";
import {
  isNavItemActive,
  websiteNavItems,
} from "@/components/website/nav-config";
import { websiteRoutes } from "@/lib/routes";

import type { NavbarSettings } from "@/components/website/navbar-types";

type NavbarMainProps = {
  settings: NavbarSettings;
};

function navLinkClass(active: boolean) {
  return [
    "relative px-3 py-2 text-sm font-medium transition-colors lg:px-4 lg:text-[15px]",
    active
      ? "text-accent after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-accent lg:after:left-4 lg:after:right-4"
      : "text-white/85 hover:text-white",
  ].join(" ");
}

export function NavbarMain({ settings }: NavbarMainProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-3 rounded-2xl rounded-bl-[1.75rem] rounded-tr-[1.75rem] bg-brand-dark px-3 py-3 shadow-lg shadow-black/10 sm:gap-4 sm:px-4 lg:py-0">
            <Link href={websiteRoutes.home} className="relative z-10 shrink-0">
              <div className="flex min-h-[4.25rem] min-w-[5rem] items-center justify-center rounded-2xl bg-white px-3 py-2.5 shadow-md sm:min-h-[4.75rem] sm:min-w-[6rem] sm:px-4">
                {settings.logoUrl ? (
                  <Image
                    src={settings.logoUrl}
                    alt={settings.websiteName}
                    width={88}
                    height={64}
                    className="h-11 w-auto object-contain sm:h-12"
                  />
                ) : (
                  <div className="text-center">
                    <span className="block text-lg font-bold leading-none text-brand-dark sm:text-xl">
                      AM
                    </span>
                    <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-[10px]">
                      Center
                    </span>
                  </div>
                )}
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              {websiteNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(isNavItemActive(pathname, item))}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={websiteRoutes.contact}
                className="hidden items-center gap-2 rounded-xl border border-white/80 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-dark sm:inline-flex"
              >
                Donate now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition hover:bg-white/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <NavbarDrawer
        open={drawerOpen}
        pathname={pathname}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
