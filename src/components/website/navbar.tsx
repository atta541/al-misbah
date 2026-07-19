import { NavbarShell } from "@/components/website/navbar-shell";
import type {
  NavbarSettings,
  NavProject,
} from "@/components/website/navbar-types";

type WebsiteNavbarProps = {
  settings: NavbarSettings;
  projects: NavProject[];
};

export function WebsiteNavbar({ settings, projects }: WebsiteNavbarProps) {
  return <NavbarShell settings={settings} projects={projects} />;
}
