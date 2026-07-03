import type { ComponentType, SVGProps } from "react";
import {
  IconDashboard,
  IconGallery,
  IconHero,
  IconMessages,
  IconPages,
  IconProjects,
  IconSettings,
} from "@/components/admin/icons";
import { adminRoutes } from "@/lib/routes";

export type AdminNavItem = {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const adminNavItems: AdminNavItem[] = [
  {
    href: adminRoutes.dashboard,
    label: "Dashboard",
    title: "Dashboard",
    description: "Overview of your NGO website and recent activity.",
    icon: IconDashboard,
  },
  {
    href: adminRoutes.hero,
    label: "Hero",
    title: "Hero Slides",
    description: "Manage homepage carousel slides and call-to-action buttons.",
    icon: IconHero,
  },
  {
    href: adminRoutes.projects,
    label: "Projects",
    title: "Projects",
    description: "Create and manage NGO projects and their image galleries.",
    icon: IconProjects,
  },
  {
    href: adminRoutes.gallery,
    label: "Gallery",
    title: "Gallery",
    description: "Organize photo collections for the public gallery page.",
    icon: IconGallery,
  },
  {
    href: adminRoutes.pages,
    label: "Pages",
    title: "Static Pages",
    description: "Edit About, Privacy Policy, Terms, and other content pages.",
    icon: IconPages,
  },
  {
    href: adminRoutes.settings,
    label: "Settings",
    title: "Site Settings",
    description: "Update branding, contact details, and social media links.",
    icon: IconSettings,
  },
  {
    href: adminRoutes.messages,
    label: "Messages",
    title: "Contact Messages",
    description: "Read and manage inquiries submitted from the contact form.",
    icon: IconMessages,
  },
];

export function getAdminNavItem(pathname: string) {
  return (
    adminNavItems.find(
      (item) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`),
    ) ?? adminNavItems[0]
  );
}
