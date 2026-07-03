import { NavbarShell } from "@/components/website/navbar-shell";
import type { NavbarSettings } from "@/components/website/navbar-types";

type WebsiteNavbarProps = {
  settings: NavbarSettings;
};

export function WebsiteNavbar({ settings }: WebsiteNavbarProps) {
  return <NavbarShell settings={settings} />;
}
