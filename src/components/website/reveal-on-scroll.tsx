"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  /** Selector within the root to animate. Defaults to direct children. */
  target?: string;
  y?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-triggered fade/rise reveal. Clears inline styles after play
 * so content never stays stuck invisible (React Strict Mode safe).
 */
export function RevealOnScroll({
  children,
  className,
  target,
  y = 36,
  stagger = 0.1,
  start = "top 85%",
  delay = 0,
}: RevealOnScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const nodes = target
      ? Array.from(root.querySelectorAll<HTMLElement>(target))
      : Array.from(root.children);

    if (nodes.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger,
          delay,
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [target, y, stagger, start, delay]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
