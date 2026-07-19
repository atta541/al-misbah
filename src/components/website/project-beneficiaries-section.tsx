"use client";

import { useEffect, useRef } from "react";
import {
  Baby,
  Droplets,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Stethoscope,
  TreePine,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { getGsap } from "@/lib/gsap";
import type { ProjectBeneficiary } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Droplets,
  Heart,
  GraduationCap,
  Home,
  HandHeart,
  Utensils,
  Stethoscope,
  Baby,
  TreePine,
};

type ProjectBeneficiariesSectionProps = {
  beneficiaries: Pick<
    ProjectBeneficiary,
    "id" | "title" | "description" | "icon"
  >[];
};

export function ProjectBeneficiariesSection({
  beneficiaries,
}: ProjectBeneficiariesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || beneficiaries.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = getGsap();
    const header = section.querySelector<HTMLElement>("[data-section-header]");
    const cards = section.querySelectorAll<HTMLElement>("[data-benefit-card]");
    const targets = [
      ...(header ? Array.from(header.children) : []),
      ...Array.from(cards),
    ];

    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
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
            start: "top 88%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [beneficiaries]);

  if (beneficiaries.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="mt-16 sm:mt-20">
      <div data-section-header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Impact
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Who benefited
        </h2>
        <p className="mt-3 text-base leading-7 text-muted">
          Real outcomes delivered through this initiative.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {beneficiaries.map((item, index) => {
          const Icon = ICON_MAP[item.icon ?? "Users"] ?? Users;

          return (
            <article
              key={item.id}
              data-benefit-card
              className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-white p-6 text-center shadow-[0_16px_40px_-28px_rgba(15,92,76,0.4)] transition duration-300 hover:-translate-y-1 hover:border-brand/20 sm:p-7"
            >
              <div
                className={[
                  "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-60 blur-3xl transition group-hover:opacity-90",
                  index % 2 === 0 ? "bg-brand/15" : "bg-accent/20",
                ].join(" ")}
              />
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-light text-white shadow-lg shadow-brand/20 transition duration-300 group-hover:scale-105">
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="relative mt-5 text-xl font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              {item.description ? (
                <p className="relative mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
