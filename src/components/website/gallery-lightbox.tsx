"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types";

type GalleryLightboxProps = {
  images: Pick<
    GalleryImage,
    "id" | "imageUrl" | "caption" | "width" | "height"
  >[];
  activeIndex: number;
  collectionTitle: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function GalleryLightbox({
  images,
  activeIndex,
  collectionTitle,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const image = images[activeIndex];
  const total = images.length;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + total) % total);
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % total);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, onChange, onClose, total]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col">
        <div className="mb-4 flex items-center justify-between gap-4 text-white">
          <div>
            <p className="text-sm text-white/70">{collectionTitle}</p>
            <p className="text-sm font-medium">
              {activeIndex + 1} / {total}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black/40">
          <div className="relative flex max-h-[75vh] min-h-[240px] items-center justify-center">
            <Image
              src={image.imageUrl}
              alt={image.caption ?? collectionTitle}
              width={image.width ?? 1600}
              height={image.height ?? 1200}
              className="max-h-[75vh] w-auto object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {image.caption ? (
            <p className="border-t border-white/10 px-5 py-4 text-sm text-white/90">
              {image.caption}
            </p>
          ) : null}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => onChange((activeIndex - 1 + total) % total)}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:-left-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => onChange((activeIndex + 1) % total)}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:-right-4"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
