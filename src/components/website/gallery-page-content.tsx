"use client";

import { useEffect, useRef } from "react";
import { GalleryCollectionCard } from "@/components/website/gallery-collection-card";
import { getGsap } from "@/lib/gsap";
import type { GalleryCollection, GalleryImage } from "@/types";

type GalleryPageContentProps = {
  collections: (GalleryCollection & { images: GalleryImage[] })[];
};

export function GalleryPageContent({ collections }: GalleryPageContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const header = headerRef.current;

    const ctx = gsap.context(() => {
      if (header) {
        gsap.from(header.children, {
          opacity: 0,
          y: 28,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
        });
      }

      const cards = gridRef.current?.querySelectorAll<HTMLElement>(
        "[data-gallery-card]",
      );

      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.97,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        });
      }

      if (emptyRef.current) {
        gsap.from(emptyRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          ease: "power2.out",
          delay: 0.2,
        });
      }
    });

    return () => ctx.revert();
  }, [collections]);

  return (
    <>
      <div ref={headerRef} className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          Our Gallery
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Moments from the field
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Browse photo collections from our humanitarian work, community events,
          and relief activities.
        </p>
      </div>

      {collections.length === 0 ? (
        <div
          ref={emptyRef}
          className="mt-10 rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center text-sm text-muted"
        >
          Gallery albums will appear here once created from the admin panel.
        </div>
      ) : (
        <div
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {collections.map((collection) => (
            <div key={collection.id} data-gallery-card>
              <GalleryCollectionCard collection={collection} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
