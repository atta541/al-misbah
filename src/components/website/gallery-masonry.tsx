"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "@/components/website/gallery-lightbox";
import type { GalleryImage } from "@/types";

type GalleryMasonryProps = {
  images: Pick<
    GalleryImage,
    "id" | "imageUrl" | "caption" | "width" | "height"
  >[];
  collectionTitle: string;
};

export function GalleryMasonry({ images, collectionTitle }: GalleryMasonryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-muted p-12 text-center text-sm text-muted">
        Photos will appear here once uploaded from the admin panel.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => {
          const width = image.width ?? 1200;
          const height = image.height ?? 900;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border/70 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-md"
            >
              <div className="relative w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.caption ?? collectionTitle}
                  width={width}
                  height={height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                {image.caption ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent px-4 py-3 opacity-0 transition group-hover:opacity-100">
                    <p className="text-sm text-white">{image.caption}</p>
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {activeIndex != null ? (
        <GalleryLightbox
          images={images}
          activeIndex={activeIndex}
          collectionTitle={collectionTitle}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      ) : null}
    </>
  );
}
