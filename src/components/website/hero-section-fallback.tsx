import { HERO_MIN_HEIGHT_CLASS } from "@/lib/nav-layout";

export function HeroSectionFallback() {
  return (
    <section
      className={`relative animate-pulse overflow-hidden bg-brand/20 ${HERO_MIN_HEIGHT_CLASS}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand/30 via-brand/10 to-transparent" />
    </section>
  );
}
