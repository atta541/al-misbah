import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { adminNavItems } from "@/components/admin/nav-config";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const dashboard = adminNavItems[0];

export default async function AdminDashboardPage() {
  const session = await getSession();

  return (
    <AdminPageShell
      description={
        session
          ? `Welcome back, ${session.fullName}. ${dashboard.description}`
          : dashboard.description
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminNavItems.slice(1).map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-base font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </AdminPageShell>
  );
}
