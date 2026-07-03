import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { adminNavItems } from "@/components/admin/nav-config";

const page = adminNavItems.find((item) => item.href === "/admin/projects")!;

export default function AdminProjectsPage() {
  return (
    <AdminPageShell description={page.description}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Project management UI coming next.
      </div>
    </AdminPageShell>
  );
}
