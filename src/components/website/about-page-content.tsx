"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { aboutPageContent } from "@/content/about";
import { missionVisionBlocks } from "@/content/mission-vision";
import { getGsap } from "@/lib/gsap";
import { websiteRoutes } from "@/lib/routes";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function AboutPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const sections = root.querySelectorAll<HTMLElement>("[data-about-section]");

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const targets = section.querySelectorAll<HTMLElement>(
          "[data-about-item]",
        );
        if (targets.length === 0) return;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const [mission, vision] = missionVisionBlocks;

  return (
    <div ref={rootRef} className="space-y-20 sm:space-y-28">
      <header data-about-section className="max-w-3xl">
        <p
          data-about-item
          className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"
        >
          {aboutPageContent.eyebrow}
        </p>
        <h1
          data-about-item
          className="mt-4 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
        >
          {aboutPageContent.title}
        </h1>
        <p
          data-about-item
          className="mt-6 text-lg leading-8 text-muted sm:text-xl sm:leading-9"
        >
          {aboutPageContent.lead}
        </p>
      </header>

      <section data-about-section className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div data-about-item>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {aboutPageContent.storyTitle}
          </p>
        </div>
        <div className="space-y-5">
          {aboutPageContent.story.map((paragraph) => (
            <p
              key={paragraph}
              data-about-item
              className="text-base leading-8 text-foreground/85 sm:text-[17px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section
        data-about-section
        className="-mx-3 border-y border-border bg-surface-muted/40 px-3 py-14 sm:-mx-5 sm:px-5 sm:py-16 lg:-mx-6 lg:px-6"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div
            data-about-item
            className="lg:border-r lg:border-border/80 lg:pr-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {mission.label}
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {mission.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-[17px]">
              {mission.body}
            </p>
          </div>
          <div data-about-item className="lg:pl-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {vision.label}
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {vision.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-[17px]">
              {vision.body}
            </p>
          </div>
        </div>
      </section>

      <section data-about-section>
        <p
          data-about-item
          className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"
        >
          {aboutPageContent.focusTitle}
        </p>
        <ol className="mt-10 divide-y divide-border border-y border-border">
          {aboutPageContent.focusAreas.map((area, index) => (
            <li
              key={area.id}
              data-about-item
              className="grid gap-3 py-8 sm:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-sm text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
                {area.title}
              </h3>
              <p className="text-base leading-7 text-muted sm:text-[17px]">
                {area.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        data-about-section
        className="flex flex-col gap-6 border-t border-border pt-12 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-xl">
          <h2
            data-about-item
            className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl"
          >
            {aboutPageContent.ctaTitle}
          </h2>
          <p data-about-item className="mt-3 text-base leading-7 text-muted">
            {aboutPageContent.ctaDescription}
          </p>
        </div>
        <div data-about-item className="flex flex-wrap gap-3">
          <Link
            href={websiteRoutes.donate}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
          >
            {aboutPageContent.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={websiteRoutes.projects}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10"
          >
            {aboutPageContent.ctaSecondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
