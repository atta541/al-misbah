import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { adminNavItems } from "@/components/admin/nav-config";

const page = adminNavItems.find((item) => item.href === "/admin/settings")!;

export default function AdminSettingsPage() {
  return (
    <AdminPageShell description={page.description}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Site settings form coming next.
      </div>
    </AdminPageShell>
  );
}
