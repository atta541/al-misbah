"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { GalleryMasonry } from "@/components/website/gallery-masonry";
import { getGsap } from "@/lib/gsap";
import { websiteRoutes } from "@/lib/routes";
import type { GalleryImage } from "@/types";

type GalleryCollectionContentProps = {
  title: string;
  description: string | null;
  images: Pick<
    GalleryImage,
    "id" | "imageUrl" | "caption" | "width" | "height"
  >[];
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function GalleryCollectionContent({
  title,
  description,
  images,
}: GalleryCollectionContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const header = headerRef.current;
    const masonry = masonryRef.current;

    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(
          header.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "opacity,visibility,transform",
          },
        );
      }

      const tiles = masonry?.querySelectorAll<HTMLElement>(
        "[data-gallery-tile]",
      );

      if (tiles && tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { autoAlpha: 0, y: 40, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: masonry,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [images]);

  return (
    <article className="bg-white pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div ref={headerRef} className="max-w-3xl">
          <Link
            href={websiteRoutes.gallery}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            All collections
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              {description}
            </p>
          ) : null}
          <p className="mt-3 text-sm text-muted">
            {images.length} photo
            {images.length === 1 ? "" : "s"}
          </p>
        </div>

        <div ref={masonryRef} className="mt-10">
          <GalleryMasonry images={images} collectionTitle={title} />
        </div>
      </div>
    </article>
  );
}
