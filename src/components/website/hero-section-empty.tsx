import { HERO_MIN_HEIGHT_CLASS } from "@/lib/nav-layout";

export function HeroSectionEmpty() {
  return (
    <section className={`relative overflow-hidden ${HERO_MIN_HEIGHT_CLASS}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.2),transparent_42%),linear-gradient(135deg,var(--theme-primary-dark),var(--theme-primary))]" />
    </section>
  );
}
