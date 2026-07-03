import { HeroCarousel, type HeroSlideData } from "@/components/website/hero-carousel";
import { HeroSectionEmpty } from "@/components/website/hero-section-empty";
import { NAV_TOP_BAR_SPACER_CLASS } from "@/lib/nav-layout";
import type { HeroSlide } from "@/types";

type HomeHeroSectionProps = {
  slides: HeroSlide[];
};

function toHeroSlideData(slide: HeroSlide): HeroSlideData {
  return {
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    description: slide.description,
    imageUrl: slide.imageUrl,
    buttonText: slide.buttonText,
    buttonLink: slide.buttonLink,
  };
}

export function HomeHeroSection({ slides }: HomeHeroSectionProps) {
  return (
    <>
      <div className={NAV_TOP_BAR_SPACER_CLASS} aria-hidden />
      {slides.length === 0 ? (
        <HeroSectionEmpty />
      ) : (
        <HeroCarousel slides={slides.map(toHeroSlideData)} />
      )}
    </>
  );
}
