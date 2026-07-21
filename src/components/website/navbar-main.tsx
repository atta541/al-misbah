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
import { ProjectsNavDropdown } from "@/components/website/projects-nav-dropdown";
import type {
  NavbarSettings,
  NavProject,
} from "@/components/website/navbar-types";
import { websiteRoutes } from "@/lib/routes";

type NavbarMainProps = {
  settings: NavbarSettings;
  projects: NavProject[];
};

function navLinkClass(active: boolean) {
  return [
    "relative px-3 py-2 text-sm font-medium transition-colors lg:px-4 lg:text-[15px]",
    active
      ? "text-accent after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-accent lg:after:left-4 lg:after:right-4"
      : "text-white/85 hover:text-white",
  ].join(" ");
}

export function NavbarMain({ settings, projects }: NavbarMainProps) {
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
      <div className="mx-auto w-full max-w-[90rem]">
          <div className="flex items-center justify-between gap-3 rounded-2xl rounded-bl-[1.75rem] rounded-tr-[1.75rem] bg-brand-dark px-3 py-3 shadow-lg shadow-black/10 sm:gap-4 sm:px-5 lg:px-6 lg:py-0">
            <Link href={websiteRoutes.home} className="relative z-10 shrink-0">
              <div className="relative flex h-[4.25rem] w-[5rem] items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md sm:h-[4.75rem] sm:w-[6rem]">
                <Image
                  src="/logo/logo.png"
                  alt={settings.websiteName}
                  fill
                  priority
                  sizes="96px"
                  className="scale-[2.7] object-contain"
                />
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              {websiteNavItems.map((item) => {
                const active = isNavItemActive(pathname, item);

                if (item.href === websiteRoutes.projects) {
                  return (
                    <ProjectsNavDropdown
                      key={item.href}
                      projects={projects}
                      linkClassName={navLinkClass(active)}
                    />
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={navLinkClass(active)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={websiteRoutes.donate}
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

      <NavbarDrawer
        open={drawerOpen}
        pathname={pathname}
        projects={projects}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
