import Link from "next/link";
import { websiteRoutes } from "@/lib/routes";

const navItems = [
  { href: websiteRoutes.home, label: "Home" },
  { href: websiteRoutes.projects, label: "Projects" },
  { href: websiteRoutes.gallery, label: "Gallery" },
  { href: websiteRoutes.about, label: "About" },
  { href: websiteRoutes.contact, label: "Contact" },
];

export function WebsiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={websiteRoutes.home} className="text-lg font-semibold">
          Al-Misbah Center
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-600 transition hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function WebsiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Al-Misbah Center</p>
        <div className="flex gap-4">
          <Link href={websiteRoutes.privacyPolicy}>Privacy Policy</Link>
          <Link href={websiteRoutes.terms}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
