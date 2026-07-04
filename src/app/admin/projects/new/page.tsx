import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { adminRoutes } from "@/lib/routes";

export default function AdminProjectNewPage() {
  return (
    <AdminPageShell description="Create a new NGO project with images and rich text content.">
      <div className="mb-5">
        <Link
          href={adminRoutes.projects}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to projects
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProjectForm mode="create" />
      </div>
    </AdminPageShell>
  );
}
