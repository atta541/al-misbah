"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getGsap } from "@/lib/gsap";
import { websiteRoutes } from "@/lib/routes";
import type { NavProject } from "@/components/website/navbar-types";

type ProjectsNavDropdownProps = {
  projects: NavProject[];
  linkClassName: string;
};

export function ProjectsNavDropdown({
  projects,
  linkClassName,
}: ProjectsNavDropdownProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const { gsap } = getGsap();
    gsap.killTweensOf(panel);

    if (open) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 8, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.28,
          ease: "power2.out",
          overwrite: true,
        },
      );
    } else {
      gsap.to(panel, {
        autoAlpha: 0,
        y: 6,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
        overwrite: true,
      });
    }
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href={websiteRoutes.projects}
        className={`${linkClassName} inline-flex items-center gap-1`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        Projects
        <ChevronDown
          className={[
            "h-3.5 w-3.5 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </Link>

      <div
        id={menuId}
        ref={panelRef}
        role="menu"
        aria-label="Projects"
        className={[
          "absolute left-1/2 top-full z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 pt-3",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-xl shadow-black/15 ring-1 ring-black/5">
          <div className="border-b border-brand-dark/10 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-dark/50">
              Our projects
            </p>
          </div>

          <ul className="max-h-[min(22rem,60vh)] overflow-y-auto py-1.5">
            {projects.length === 0 ? (
              <li className="px-4 py-3 text-sm text-brand-dark/55">
                No projects published yet.
              </li>
            ) : (
              projects.map((project) => (
                <li key={project.id} role="none">
                  <Link
                    role="menuitem"
                    href={`${websiteRoutes.projects}/${project.slug}`}
                    className="group flex items-center gap-3 px-3 py-2.5 transition hover:bg-brand-dark/[0.04]"
                    onClick={() => setOpen(false)}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-brand-dark/5">
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage}
                          alt=""
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="44px"
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-brand-dark group-hover:text-brand">
                        {project.title}
                      </span>
                      {project.shortDescription ? (
                        <span className="mt-0.5 block truncate text-xs text-brand-dark/55">
                          {project.shortDescription}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className="border-t border-brand-dark/10 p-2">
            <Link
              href={websiteRoutes.projects}
              role="menuitem"
              className="flex items-center justify-center rounded-xl bg-brand-dark px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
              onClick={() => setOpen(false)}
            >
              View all projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
