import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { websiteRoutes } from "@/lib/routes";

type HeroSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl?: string | null;
};

const defaults = {
  eyebrow: "Humanitarian NGO",
  title: "A culture of verifiable impact",
  description:
    "Al-Misbah Center works on the ground to deliver relief, education, and sustainable projects for communities in need.",
  primaryCta: { label: "Start Donating", href: websiteRoutes.contact },
  secondaryCta: { label: "Our Projects", href: websiteRoutes.projects },
};

export function HeroSection({
  eyebrow = defaults.eyebrow,
  title = defaults.title,
  description = defaults.description,
  primaryCta = defaults.primaryCta,
  secondaryCta = defaults.secondaryCta,
  imageUrl,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark" />
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_42%),linear-gradient(135deg,var(--theme-primary-dark),var(--theme-primary))]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/75 to-brand-dark/20" />

      <div className="relative mx-auto grid max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:bg-accent-light"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="mt-10 hidden lg:block">
          <div className="ml-auto h-[22rem] w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-sm" />
        </div>
      </div>
    </section>
  );
}
