"use client";

import { useEffect, useRef } from "react";
import { missionVisionBlocks } from "@/content/mission-vision";
import { getGsap } from "@/lib/gsap";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HomeMissionVisionSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const blocks = root.querySelectorAll<HTMLElement>("[data-mv-block]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        blocks,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.14,
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const [mission, vision] = missionVisionBlocks;

  return (
    <section
      ref={rootRef}
      className="border-t border-border bg-surface-muted/40 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-[90rem] gap-0 px-3 sm:px-5 lg:grid-cols-2 lg:px-6">
        <div
          data-mv-block
          className="border-border/80 px-2 py-2 sm:px-4 lg:border-r lg:pr-12 lg:py-4"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {mission.label}
          </p>
          <h2 className="mt-5 max-w-md text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            {mission.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-[17px]">
            {mission.body}
          </p>
        </div>

        <div
          data-mv-block
          className="mt-12 border-t border-border/80 px-2 pt-12 sm:px-4 lg:mt-0 lg:border-t-0 lg:pl-12 lg:pt-4"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {vision.label}
          </p>
          <h2 className="mt-5 max-w-md text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            {vision.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-[17px]">
            {vision.body}
          </p>
        </div>
      </div>
    </section>
  );
}
