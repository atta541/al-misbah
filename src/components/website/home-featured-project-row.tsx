"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Minus, Plus, ShoppingBag } from "lucide-react";
import { decimalToNumber, formatMoney } from "@/lib/currency";
import {
  formatCategoryPrice,
  getProjectPriceLabel,
} from "@/lib/project-price";
import { websiteRoutes } from "@/lib/routes";
import type { Project, ProjectImage } from "@/types";

export type FeaturedProjectCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  priceTo: number | null;
  isActive: boolean;
};

export type FeaturedProject = Project & {
  images: ProjectImage[];
  categories: FeaturedProjectCategory[];
};

type HomeFeaturedProjectRowProps = {
  project: FeaturedProject;
  index: number;
};

export function HomeFeaturedProjectRow({
  project,
  index,
}: HomeFeaturedProjectRowProps) {
  const categories = project.categories.filter((item) => item.isActive);
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const imageOnRight = index % 2 === 1;
  const selected =
    categories.find((category) => category.id === selectedId) ?? null;
  const projectHref = `${websiteRoutes.projects}/${project.slug}`;
  const rangeLabel = getProjectPriceLabel(categories, project.currency);
  const selectedPriceLabel = selected
    ? formatCategoryPrice(
        selected.price,
        selected.priceTo,
        project.currency,
      )
    : null;
  const unitPrice = selected ? decimalToNumber(selected.price) : null;
  const hasRange =
    selected?.priceTo != null && selected.priceTo !== selected.price;
  const totalLabel =
    unitPrice != null && !hasRange
      ? formatMoney(unitPrice * quantity, project.currency)
      : selectedPriceLabel;

  return (
    <article
      data-featured-row
      className="grid items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 sm:py-16 lg:grid-cols-2 lg:gap-14 xl:gap-20"
    >
      <div
        data-featured-image
        className={[
          "relative",
          imageOnRight ? "lg:order-2" : "lg:order-1",
        ].join(" ")}
      >
        <Link
          href={projectHref}
          className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted lg:aspect-[10/9]"
        >
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
          <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-sm backdrop-blur-sm transition group-hover:bg-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <div
        data-featured-content
        className={imageOnRight ? "lg:order-1" : "lg:order-2"}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Featured project {String(index + 1).padStart(2, "0")}
        </p>
        <Link href={projectHref}>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-brand-dark transition hover:text-brand sm:text-4xl">
            {project.title}
          </h3>
        </Link>

        {project.location ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-brand" />
            {project.location}
          </p>
        ) : null}

        {rangeLabel ? (
          <p className="mt-4 text-xl font-bold text-brand sm:text-2xl">
            {rangeLabel}
          </p>
        ) : null}

        <p className="mt-5 max-w-xl text-base leading-8 text-muted">
          {project.shortDescription}
        </p>

        {categories.length > 0 ? (
          <div className="mt-7">
            <p className="text-sm font-semibold text-foreground">
              Choose an option
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const isSelected = category.id === selectedId;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(category.id);
                      setQuantity(1);
                    }}
                    className={[
                      "rounded-lg border px-3.5 py-2.5 text-sm font-medium transition",
                      isSelected
                        ? "border-brand-dark bg-brand-dark text-white shadow-sm"
                        : "border-border bg-white text-foreground hover:border-brand-dark/40",
                    ].join(" ")}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {selected ? (
          <div className="mt-7 border-t border-border pt-6">
            {selected.description ? (
              <p className="mb-4 text-sm leading-6 text-muted">
                {selected.description}
              </p>
            ) : null}

            {totalLabel ? (
              <p className="text-2xl font-bold text-brand sm:text-3xl">
                {totalLabel}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex h-12 w-fit shrink-0 items-stretch overflow-hidden rounded-xl border-2 border-brand-dark/20 bg-white">
                <button
                  type="button"
                  aria-label={`Decrease quantity for ${project.title}`}
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="flex w-11 items-center justify-center bg-surface-muted text-brand-dark transition hover:bg-brand/10"
                >
                  <Minus className="h-5 w-5" strokeWidth={2.5} />
                </button>
                <span className="flex w-12 items-center justify-center border-x-2 border-brand-dark/15 text-base font-bold text-brand-dark">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Increase quantity for ${project.title}`}
                  onClick={() =>
                    setQuantity((value) => Math.min(99, value + 1))
                  }
                  className="flex w-11 items-center justify-center bg-surface-muted text-brand-dark transition hover:bg-brand/10"
                >
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>

              <Link
                href={`${websiteRoutes.checkout}?project=${encodeURIComponent(project.slug)}&category=${encodeURIComponent(selected.id)}&qty=${quantity}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 text-sm font-semibold text-white shadow-md shadow-brand-dark/15 transition hover:bg-brand sm:min-w-44"
              >
                <ShoppingBag className="h-4 w-4" />
                Checkout
              </Link>
            </div>
          </div>
        ) : (
          <Link
            href={projectHref}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            View project details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
