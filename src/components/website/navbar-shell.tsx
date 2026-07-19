"use client";

import { NavbarMain } from "@/components/website/navbar-main";
import type {
  NavbarSettings,
  NavProject,
} from "@/components/website/navbar-types";
import { NavbarTopBar } from "@/components/website/navbar-top-bar";
import { NAV_MAIN_POSITION_CLASS } from "@/lib/nav-layout";

type NavbarShellProps = {
  settings: NavbarSettings;
  projects: NavProject[];
};

export function NavbarShell({ settings, projects }: NavbarShellProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto">
        <NavbarTopBar settings={settings} />
      </div>
      <div className={`pointer-events-auto ${NAV_MAIN_POSITION_CLASS}`}>
        <NavbarMain settings={settings} projects={projects} />
      </div>
    </header>
  );
}
