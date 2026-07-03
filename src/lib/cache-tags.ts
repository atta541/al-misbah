export const CACHE_TAGS = {
  heroSlides: "hero-slides",
} as const;

export const ISR_REVALIDATE_SECONDS = Number(
  process.env.ISR_REVALIDATE_SECONDS ?? "3600",
);
