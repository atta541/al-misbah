import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/website/project-card";
import { websiteRoutes } from "@/lib/routes";
import type { Project, ProjectCategory, ProjectImage } from "@/types";

type HomeFeaturedProjectsSectionProps = {
  projects: (Project & {
    images: ProjectImage[];
    categories: ProjectCategory[];
  })[];
};

export function HomeFeaturedProjectsSection({
  projects,
}: HomeFeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Our Initiatives
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Building Better Lives Together
          </p>
          <p className="mt-3 text-base leading-7 text-muted">
            Support meaningful projects that create lasting change in
            communities.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={websiteRoutes.projects}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
