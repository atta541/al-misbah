"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_MIN_HEIGHT_CLASS } from "@/lib/nav-layout";

export type HeroSlideData = {
  id: string;
  imageUrl: string;
};

type HeroCarouselProps = {
  slides: HeroSlideData[];
};

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      setIndex((nextIndex + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1 || paused) return;

    const timer = window.setInterval(() => {
      goTo(index + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [goTo, index, paused, total]);

  if (total === 0) {
    return null;
  }

  return (
    <section
      className={`relative overflow-hidden ${HERO_MIN_HEIGHT_CLASS}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Homepage hero images"
    >
      {slides.map((item, slideIndex) => (
        <div
          key={item.id}
          className={[
            "absolute inset-0 transition-opacity duration-700",
            slideIndex === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden={slideIndex !== index}
        >
          <Image
            src={item.imageUrl}
            alt=""
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  dotIndex === index
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-white/50 hover:bg-white/80",
                ].join(" ")}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
