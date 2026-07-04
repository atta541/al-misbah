import { HeroCarousel, type HeroSlideData } from "@/components/website/hero-carousel";
import { HeroSectionEmpty } from "@/components/website/hero-section-empty";
import type { HeroSlide } from "@/types";

type HomeHeroSectionProps = {
  slides: HeroSlide[];
};

function toHeroSlideData(slide: HeroSlide): HeroSlideData {
  return {
    id: slide.id,
    imageUrl: slide.imageUrl,
  };
}

export function HomeHeroSection({ slides }: HomeHeroSectionProps) {
  if (slides.length === 0) {
    return <HeroSectionEmpty />;
  }

  return <HeroCarousel slides={slides.map(toHeroSlideData)} />;
}
