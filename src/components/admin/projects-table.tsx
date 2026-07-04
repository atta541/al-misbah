import Image from "next/image";
import Link from "next/link";
import {
  deleteProject,
  toggleProjectFeatured,
  toggleProjectPublished,
} from "@/actions/project";
import { MAX_FEATURED_PROJECTS } from "@/lib/project";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import type { Project, ProjectImage } from "@/types";

type ProjectsTableProps = {
  projects: (Project & { images: ProjectImage[] })[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No projects yet. Create your first project to show on the website.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Preview</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-14 w-24 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{project.title}</p>
                  <p className="text-xs text-slate-500">/{project.slug}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{project.order}</td>
                <td className="px-4 py-3">
                  <form
                    action={toggleProjectFeatured.bind(
                      null,
                      project.id,
                      !project.isFeatured,
                    )}
                  >
                    <button
                      type="submit"
                      className={[
                        "rounded-full px-3 py-1 text-xs font-medium",
                        project.isFeatured
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {project.isFeatured ? "Featured" : "Not featured"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form
                    action={toggleProjectPublished.bind(
                      null,
                      project.id,
                      !project.isPublished,
                    )}
                  >
                    <button
                      type="submit"
                      className={[
                        "rounded-full px-3 py-1 text-xs font-medium",
                        project.isPublished
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {project.isPublished ? "Published" : "Draft"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`${websiteRoutes.projects}/${project.slug}`}
                      target="_blank"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`${adminRoutes.projects}/${project.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <form action={deleteProject.bind(null, project.id)}>
                      <button
                        type="submit"
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        Up to {MAX_FEATURED_PROJECTS} projects can be featured on the homepage.
      </p>
    </div>
  );
}
