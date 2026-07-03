import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  HERO_CONTENT_OFFSET_CLASS,
  HERO_MIN_HEIGHT_CLASS,
} from "@/lib/nav-layout";
import { websiteRoutes } from "@/lib/routes";

export function HeroSectionEmpty() {
  return (
    <section
      className={`relative overflow-hidden ${HERO_MIN_HEIGHT_CLASS}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_42%),linear-gradient(135deg,var(--theme-primary-dark),var(--theme-primary))]" />

      <div
        className={`relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28 ${HERO_CONTENT_OFFSET_CLASS}`}
      >
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Humanitarian NGO
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            A culture of verifiable impact
          </h1>
          <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg">
            Add hero slides from the admin panel to showcase your campaigns here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={websiteRoutes.contact}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:bg-accent-light"
            >
              Start Donating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
