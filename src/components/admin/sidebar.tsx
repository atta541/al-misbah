import Link from "next/link";
import { adminRoutes } from "@/lib/routes";

const navItems = [
  { href: adminRoutes.dashboard, label: "Dashboard" },
  { href: adminRoutes.hero, label: "Hero" },
  { href: adminRoutes.projects, label: "Projects" },
  { href: adminRoutes.gallery, label: "Gallery" },
  { href: adminRoutes.pages, label: "Pages" },
  { href: adminRoutes.settings, label: "Settings" },
  { href: adminRoutes.messages, label: "Messages" },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 px-4 py-5">
        <p className="text-sm text-zinc-400">Admin Panel</p>
        <p className="font-semibold">Al-Misbah Center</p>
      </div>
      <nav className="flex flex-col gap-1 p-3 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 transition hover:bg-zinc-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
