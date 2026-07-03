import { websiteRoutes } from "@/lib/routes";

export type WebsiteNavItem = {
  href: string;
  label: string;
  match?: (pathname: string) => boolean;
};

export const websiteNavItems: WebsiteNavItem[] = [
  {
    href: websiteRoutes.home,
    label: "Home",
    match: (pathname) => pathname === websiteRoutes.home,
  },
  {
    href: websiteRoutes.projects,
    label: "Projects",
    match: (pathname) => pathname.startsWith(websiteRoutes.projects),
  },
  {
    href: websiteRoutes.gallery,
    label: "Gallery",
    match: (pathname) => pathname.startsWith(websiteRoutes.gallery),
  },
  {
    href: websiteRoutes.about,
    label: "About",
    match: (pathname) => pathname.startsWith(websiteRoutes.about),
  },
  {
    href: websiteRoutes.contact,
    label: "Contact Us",
    match: (pathname) => pathname.startsWith(websiteRoutes.contact),
  },
];

export function isNavItemActive(pathname: string, item: WebsiteNavItem) {
  return item.match ? item.match(pathname) : pathname === item.href;
}
