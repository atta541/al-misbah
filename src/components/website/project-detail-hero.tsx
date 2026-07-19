"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { decimalToNumber, formatMoney } from "@/lib/currency";
import { getGsap } from "@/lib/gsap";
import {
  formatCategoryPrice,
  getProjectPriceLabel,
} from "@/lib/project-price";
import { websiteRoutes } from "@/lib/routes";
import type { Project } from "@/types";

type Category = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  priceTo: number | null;
  isActive: boolean;
};

type ProjectDetailHeroProps = {
  project: Pick<
    Project,
    | "id"
    | "title"
    | "slug"
    | "currency"
    | "featuredImage"
    | "shortDescription"
    | "location"
  >;
  categories: Category[];
  startDateLabel?: string | null;
  endDateLabel?: string | null;
};

export function ProjectDetailHero({
  project,
  categories,
  startDateLabel,
  endDateLabel,
}: ProjectDetailHeroProps) {
  const visibleCategories = categories.filter(
    (category) => category.isActive !== false,
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    visibleCategories[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.location.hash === "#donate" || window.location.hash === "#checkout") {
      document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const details = detailsRef.current;
    const back = backRef.current;
    if (!section || !image || !details) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = getGsap();
    const detailItems = details.querySelectorAll<HTMLElement>(
      "[data-hero-item]",
    );
    const optionsBlock = details.querySelector<HTMLElement>(
      "[data-options-block]",
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
        },
      });

      if (back) {
        tl.fromTo(
          back,
          { autoAlpha: 0, x: -12 },
          { autoAlpha: 1, x: 0, duration: 0.45 },
          0,
        );
      }

      tl.fromTo(
        image,
        { autoAlpha: 0, y: 24, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
        0.05,
      );

      if (detailItems.length > 0) {
        tl.fromTo(
          detailItems,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
          },
          0.18,
        );
      }

      if (optionsBlock) {
        tl.fromTo(
          optionsBlock,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const selected =
    visibleCategories.find((category) => category.id === selectedId) ?? null;
  const rangeLabel = getProjectPriceLabel(visibleCategories, project.currency);
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

  function clearSelection() {
    setSelectedId(null);
    setQuantity(1);
  }

  return (
    <section ref={sectionRef} id="donate" className="scroll-mt-28">
      <Link
        ref={backRef}
        href={websiteRoutes.projects}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="relative" ref={imageRef}>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-muted shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)]">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <button
              type="button"
              aria-label="Zoom image"
              onClick={() => setZoomOpen(true)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-md transition hover:bg-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={detailsRef} className="flex flex-col">
          <h1
            data-hero-item
            className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
          >
            {project.title}
          </h1>

          {visibleCategories.length > 0 ? (
            <p data-hero-item className="mt-3 text-sm text-muted">
              Categories:{" "}
              <span className="font-medium text-foreground">
                {visibleCategories.map((category) => category.name).join(", ")}
              </span>
            </p>
          ) : null}

          {rangeLabel ? (
            <p
              data-hero-item
              className="mt-3 text-xl font-bold text-brand sm:text-2xl"
            >
              {rangeLabel}
            </p>
          ) : null}

          {project.location || startDateLabel ? (
            <div
              data-hero-item
              className="mt-4 flex flex-wrap gap-4 text-sm text-muted"
            >
              {project.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand" />
                  {project.location}
                </span>
              ) : null}
              {startDateLabel ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand" />
                  {startDateLabel}
                  {endDateLabel ? ` – ${endDateLabel}` : ""}
                </span>
              ) : null}
            </div>
          ) : null}

          <p data-hero-item className="mt-5 text-base leading-7 text-muted">
            {project.shortDescription}
          </p>

          {visibleCategories.length > 0 ? (
            <div data-options-block className="mt-8">
              <p className="text-sm font-semibold text-foreground">
                Option
                {selected ? (
                  <>
                    :{" "}
                    <span className="font-bold text-brand-dark">
                      {selected.name}
                    </span>
                  </>
                ) : (
                  <span className="font-normal text-muted">
                    {" "}
                    — select below
                  </span>
                )}
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {visibleCategories.map((category) => {
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
                        "rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition",
                        isSelected
                          ? "border-brand-dark bg-white text-brand-dark shadow-sm ring-1 ring-brand-dark"
                          : "border-border bg-white text-foreground hover:border-brand-dark/40",
                      ].join(" ")}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>

              {selectedId ? (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="mt-3 inline-flex rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:border-brand-dark/30 hover:text-foreground"
                >
                  Clear
                </button>
              ) : null}

              {selected ? (
                <div className="mt-8 border-t border-border pt-6">
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

                  <div className="mt-5 flex items-stretch gap-3">
                    <div className="flex h-12 shrink-0 items-stretch overflow-hidden rounded-xl border-2 border-brand-dark/20 bg-white shadow-sm">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          setQuantity((value) => Math.max(1, value - 1))
                        }
                        className="flex w-11 items-center justify-center bg-surface-muted/80 text-brand-dark transition hover:bg-brand/10 active:bg-brand/15"
                      >
                        <Minus className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={quantity}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          if (!Number.isFinite(next)) return;
                          setQuantity(Math.min(99, Math.max(1, next)));
                        }}
                        aria-label="Quantity"
                        className="w-12 border-x-2 border-brand-dark/15 bg-transparent text-center text-base font-bold text-brand-dark outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          setQuantity((value) => Math.min(99, value + 1))
                        }
                        className="flex w-11 items-center justify-center bg-surface-muted/80 text-brand-dark transition hover:bg-brand/10 active:bg-brand/15"
                      >
                        <Plus className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                    </div>

                    <Link
                      href={`${websiteRoutes.checkout}?project=${encodeURIComponent(project.slug)}&category=${encodeURIComponent(selected.id)}&qty=${quantity}`}
                      className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 text-sm font-semibold text-white shadow-md shadow-brand-dark/20 transition hover:bg-brand active:scale-[0.99] sm:rounded-full sm:px-6"
                    >
                      <ShoppingBag className="h-4 w-4 shrink-0" />
                      <span className="truncate">Checkout</span>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {zoomOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close zoom"
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            onClick={() => setZoomOpen(false)}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-brand-dark"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3] w-full sm:aspect-video">
              <Image
                src={project.featuredImage}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
