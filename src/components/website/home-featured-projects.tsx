"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedProjectsGrid } from "@/components/website/featured-projects-grid";
import type { FeaturedProject } from "@/components/website/home-featured-project-row";
import { getGsap } from "@/lib/gsap";
import { websiteRoutes } from "@/lib/routes";

type HomeFeaturedProjectsSectionProps = {
  projects: FeaturedProject[];
};

export function HomeFeaturedProjectsSection({
  projects,
}: HomeFeaturedProjectsSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length === 0) return;

    const { gsap } = getGsap();
    const header = headerRef.current;
    const cta = ctaRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.from(header.children, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
        },
      });

      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 92%",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [projects.length]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-5 lg:px-6">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-accent sm:block sm:w-24" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Our Initiatives
            </p>
            <span className="hidden h-px w-16 bg-accent sm:block sm:w-24" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.75rem]">
            Building Better Lives Together
          </h2>
        </div>

        <FeaturedProjectsGrid projects={projects} />

        <div ref={ctaRef} className="mt-12 flex justify-center">
          <Link
            href={websiteRoutes.projects}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
