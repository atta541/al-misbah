import { ProjectCard } from "@/components/website/project-card";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { projectService } from "@/services/project.service";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await projectService.listPublished();

  return (
    <section className={`bg-white pb-14 sm:pb-20 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-[90rem] px-3 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-3xl text-center sm:text-left">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            <span className="hidden h-px w-12 bg-accent sm:block" />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Our Initiatives
            </p>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Building Better Lives Together
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Browse our projects and choose a donation option that matches how
            you want to help.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center text-sm text-muted">
            Projects will appear here once published from the admin panel.
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
