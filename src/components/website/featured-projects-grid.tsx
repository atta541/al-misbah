"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/website/project-card";
import { getGsap } from "@/lib/gsap";
import type { Project, ProjectImage } from "@/types";

type SerializedCategory = {
  price: number;
  priceTo: number | null;
  isActive: boolean;
};

type FeaturedProjectsGridProps = {
  projects: (Omit<Project, "categories"> & {
    images: ProjectImage[];
    categories: SerializedCategory[];
  })[];
};

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div
      ref={sectionRef}
      className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8"
    >
      {projects.map((project) => (
        <div key={project.id} data-project-card>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
