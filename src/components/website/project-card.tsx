import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getProjectPriceLabel } from "@/lib/project-price";
import { websiteRoutes } from "@/lib/routes";
import type { Project, ProjectCategory } from "@/types";

type ProjectCardProps = {
  project: Pick<Project, "title" | "slug" | "featuredImage" | "currency"> & {
    categories: Pick<ProjectCategory, "price" | "priceTo" | "isActive">[];
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const priceLabel = getProjectPriceLabel(project.categories, project.currency);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border/70 bg-white shadow-[0_16px_40px_-28px_rgba(15,92,76,0.45)] transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_24px_50px_-24px_rgba(15,92,76,0.35)]">
      <Link
        href={`${websiteRoutes.projects}/${project.slug}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            {project.title}
          </h3>
          {priceLabel ? (
            <p className="mt-2 text-sm font-semibold text-brand">{priceLabel}</p>
          ) : (
            <p className="mt-2 text-sm text-muted">View project details</p>
          )}
        </div>
      </Link>

      <Link
        href={`${websiteRoutes.projects}/${project.slug}#donate`}
        aria-label={`Donate to ${project.title}`}
        className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:scale-105 hover:bg-brand-light"
      >
        <Heart className="h-4 w-4 fill-current" />
      </Link>
    </article>
  );
}
