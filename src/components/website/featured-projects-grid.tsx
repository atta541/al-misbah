"use client";

import { useEffect, useRef } from "react";
import {
  HomeFeaturedProjectRow,
  type FeaturedProject,
} from "@/components/website/home-featured-project-row";
import { getGsap } from "@/lib/gsap";

type FeaturedProjectsGridProps = {
  projects: FeaturedProject[];
};

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>("[data-featured-row]");

      rows.forEach((row, index) => {
        const image = row.querySelector<HTMLElement>("[data-featured-image]");
        const content = row.querySelector<HTMLElement>(
          "[data-featured-content]",
        );
        if (!image || !content) return;

        const imageOnRight = index % 2 === 1;

        gsap.fromTo(
          image,
          { autoAlpha: 0, x: imageOnRight ? 42 : -42, scale: 0.97 },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          content,
          { autoAlpha: 0, x: imageOnRight ? -32 : 32 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            delay: 0.08,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div
      ref={sectionRef}
      className="mt-14"
    >
      {projects.map((project, index) => (
        <HomeFeaturedProjectRow
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
