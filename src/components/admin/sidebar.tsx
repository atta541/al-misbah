import Link from "next/link";
import { logoutAdmin } from "@/actions/auth";
import type { SessionPayload } from "@/lib/auth";
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

type AdminSidebarProps = {
  session: SessionPayload | null;
};

export function AdminSidebar({ session }: AdminSidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 px-4 py-5">
        <p className="text-sm text-zinc-400">Admin Panel</p>
        <p className="font-semibold">Al-Misbah Center</p>
        {session ? (
          <p className="mt-2 truncate text-xs text-zinc-500">{session.email}</p>
        ) : null}
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
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
      <div className="border-t border-zinc-800 p-3">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
