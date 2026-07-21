import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getProjectPriceLabel } from "@/lib/project-price";
import { websiteRoutes } from "@/lib/routes";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Pick<Project, "title" | "slug" | "featuredImage" | "currency"> & {
    categories: Array<{
      price: number;
      priceTo: number | null;
      isActive: boolean;
    }>;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const priceLabel = getProjectPriceLabel(project.categories, project.currency);
  const href = `${websiteRoutes.projects}/${project.slug}`;

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} className="block overflow-hidden rounded-2xl bg-surface-muted">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link href={href}>
            <h3 className="text-lg font-bold tracking-tight text-brand-dark transition group-hover:text-brand sm:text-xl">
              {project.title}
            </h3>
          </Link>
          {priceLabel ? (
            <p className="mt-1.5 text-sm text-muted">{priceLabel}</p>
          ) : (
            <p className="mt-1.5 text-sm text-muted">View project details</p>
          )}
        </div>

        <Link
          href={`${href}#donate`}
          aria-label={`Checkout ${project.title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-dark text-white transition hover:bg-brand"
        >
          <ShoppingBag className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
