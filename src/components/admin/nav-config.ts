import type { ComponentType, SVGProps } from "react";
import {
  IconDashboard,
  IconGallery,
  IconHero,
  IconLeads,
  IconMessages,
  IconPages,
  IconProjects,
  IconSettings,
  IconVideo,
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
    description: "Manage homepage hero carousel images.",
    icon: IconHero,
  },
  {
    href: adminRoutes.homeVideo,
    label: "Video",
    title: "Homepage Video",
    description:
      "Upload the NGO introduction video shown below the hero section.",
    icon: IconVideo,
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
  {
    href: adminRoutes.leads,
    label: "Leads",
    title: "Checkout Leads",
    description:
      "Review checkout requests and update lead statuses from project contributions.",
    icon: IconLeads,
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
