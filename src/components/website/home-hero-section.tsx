import { Suspense } from "react";
import { HeroSection } from "@/components/website/hero-section";
import { HeroSectionFallback } from "@/components/website/hero-section-fallback";
import { heroService } from "@/services";

async function HeroSectionContent() {
  const slides = await heroService.listActive();
  const slide = slides[0];

  return (
    <HeroSection
      eyebrow="Humanitarian NGO"
      title={slide?.title ?? "A culture of verifiable impact"}
      description={
        slide?.description ??
        slide?.subtitle ??
        "Al-Misbah Center works on the ground to deliver relief, education, and sustainable projects for communities in need."
      }
      primaryCta={{
        label: slide?.buttonText ?? "Start Donating",
        href: slide?.buttonLink ?? "/contact",
      }}
      imageUrl={slide?.imageUrl}
    />
  );
}

export function HomeHeroSection() {
  return (
    <Suspense fallback={<HeroSectionFallback />}>
      <HeroSectionContent />
    </Suspense>
  );
}
