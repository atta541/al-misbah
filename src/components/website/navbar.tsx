import { NavbarMain } from "@/components/website/navbar-main";
import type { NavbarSettings } from "@/components/website/navbar-types";
import { NavbarTopBar } from "@/components/website/navbar-top-bar";

type WebsiteNavbarProps = {
  settings: NavbarSettings;
};

export function WebsiteNavbar({ settings }: WebsiteNavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <NavbarTopBar settings={settings} />
      <div className="pb-3 pt-2">
        <NavbarMain settings={settings} />
      </div>
    </header>
  );
}
