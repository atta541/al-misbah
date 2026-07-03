import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { adminNavItems } from "@/components/admin/nav-config";

const page = adminNavItems.find((item) => item.href === "/admin/pages")!;

export default function AdminPagesPage() {
  return (
    <AdminPageShell description={page.description}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Static page editor coming next.
      </div>
    </AdminPageShell>
  );
}
