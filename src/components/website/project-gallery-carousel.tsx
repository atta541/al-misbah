"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/types";

type ProjectGalleryCarouselProps = {
  images: Pick<ProjectImage, "id" | "imageUrl" | "caption">[];
  projectTitle: string;
};

export function ProjectGalleryCarousel({
  images,
  projectTitle,
}: ProjectGalleryCarouselProps) {
  const [paused, setPaused] = useState(false);

  if (images.length === 0) {
    return null;
  }

  const loopImages = [...images, ...images];

  return (
    <section className="mt-16 sm:mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl lg:text-5xl">
          Gallery
        </h2>
        <p className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Project in pictures
        </p>
      </div>

      <div
        className="relative mt-8 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label={`${projectTitle} image gallery`}
      >
        <div
          className={[
            "flex w-max gap-4",
            paused ? "[animation-play-state:paused]" : "",
            "animate-project-marquee-rtl",
          ].join(" ")}
        >
          {loopImages.map((image, index) => (
            <figure
              key={`${image.id}-${index}`}
              className="relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-surface sm:h-64 sm:w-96"
            >
              <Image
                src={image.imageUrl}
                alt={image.caption ?? projectTitle}
                fill
                sizes="384px"
                className="object-cover"
              />
              {image.caption ? (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent px-4 py-3 text-sm text-white">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
