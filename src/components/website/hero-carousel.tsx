"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  HERO_CONTENT_OFFSET_CLASS,
  HERO_MIN_HEIGHT_CLASS,
} from "@/lib/nav-layout";
import { websiteRoutes } from "@/lib/routes";

export type HeroSlideData = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string;
  buttonText: string | null;
  buttonLink: string | null;
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

  const slide = slides[index];

  return (
    <section
      className={`relative overflow-hidden ${HERO_MIN_HEIGHT_CLASS}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Homepage hero slides"
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
            alt={item.title}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div
        className={`relative mx-auto flex max-w-7xl items-center px-4 pb-16 sm:px-6 lg:px-8 ${HERO_MIN_HEIGHT_CLASS} ${HERO_CONTENT_OFFSET_CLASS}`}
      >
        <div className="max-w-2xl text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.75)]">
          {slide.subtitle ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {slide.subtitle}
            </p>
          ) : null}
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          {slide.description ? (
            <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg">
              {slide.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={slide.buttonLink || websiteRoutes.contact}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:bg-accent-light"
            >
              {slide.buttonText || "Start Donating"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={websiteRoutes.projects}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Our Projects
            </Link>
          </div>
        </div>
      </div>

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
