"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import type { ProjectFaq } from "@/types";

type ProjectFaqSectionProps = {
  faqs: Pick<ProjectFaq, "id" | "question" | "answer">[];
};

export function ProjectFaqSection({ faqs }: ProjectFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || faqs.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = getGsap();
    const header = section.querySelector<HTMLElement>("[data-section-header]");
    const items = section.querySelectorAll<HTMLElement>("[data-faq-item]");
    const targets = [
      ...(header ? Array.from(header.children) : []),
      ...Array.from(items),
    ];

    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.07,
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [faqs]);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="mt-16 sm:mt-20">
      <div data-section-header className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          FAQ
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-5xl space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              data-faq-item
              className={[
                "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                isOpen
                  ? "border-brand/25 shadow-[0_18px_40px_-24px_rgba(15,92,76,0.35)]"
                  : "border-border/70 hover:border-brand/20",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-foreground sm:text-[17px]">
                  {faq.question}
                </span>
                <span
                  className={[
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand",
                  ].join(" ")}
                >
                  <ChevronDown
                    className={[
                      "h-5 w-5 transition-transform duration-300 ease-out",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </span>
              </button>

              <div
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "" : "",
                ].join(" ")}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-border/60 px-5 pb-5 pt-4 text-sm leading-7 text-muted sm:px-6 sm:pb-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
