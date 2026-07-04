import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { adminRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";

type AdminProjectEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProjectEditPage({
  params,
}: AdminProjectEditPageProps) {
  const { id } = await params;
  const project = await projectService.getById(id);

  if (!project) {
    notFound();
  }

  return (
    <AdminPageShell description="Update project content, images, and homepage visibility.">
      <div className="mb-5">
        <Link
          href={adminRoutes.projects}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to projects
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProjectForm mode="edit" project={project} />
      </div>
    </AdminPageShell>
  );
}
