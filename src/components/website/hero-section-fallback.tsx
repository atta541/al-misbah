import {
  HERO_CONTENT_OFFSET_CLASS,
  HERO_MIN_HEIGHT_CLASS,
} from "@/lib/nav-layout";

export function HeroSectionFallback() {
  return (
    <section
      className={`relative animate-pulse overflow-hidden bg-brand/20 ${HERO_MIN_HEIGHT_CLASS}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand/30 via-brand/10 to-transparent" />
      <div
        className={`relative mx-auto flex max-w-7xl flex-col justify-center px-4 pb-20 sm:px-6 lg:px-8 ${HERO_CONTENT_OFFSET_CLASS}`}
      >
        <div className="h-4 w-36 rounded bg-white/30" />
        <div className="mt-6 h-12 max-w-2xl rounded bg-white/35 sm:h-16" />
        <div className="mt-4 h-12 max-w-xl rounded bg-white/25" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-36 rounded-xl bg-accent/40" />
          <div className="h-12 w-36 rounded-xl bg-white/20" />
        </div>
      </div>
    </section>
  );
}
