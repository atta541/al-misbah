import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ProjectsTable } from "@/components/admin/projects-table";
import { adminNavItems } from "@/components/admin/nav-config";
import { adminRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";

const page = adminNavItems.find((item) => item.href === adminRoutes.projects)!;

export default async function AdminProjectsPage() {
  const projects = await projectService.listAll();

  return (
    <AdminPageShell description={page.description}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
        <Link
          href={`${adminRoutes.projects}/new`}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Add project
        </Link>
      </div>
      <ProjectsTable projects={projects} />
    </AdminPageShell>
  );
}
