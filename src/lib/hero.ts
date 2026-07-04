/** Recommended hero image size for full-width `object-cover` slides. */
export const HERO_IMAGE_SPECS = {
  recommended: { width: 1920, height: 900 },
  minimum: { width: 1280, height: 720 },
  aspectRatio: "16:9",
  formats: "JPG, PNG, WEBP, or AVIF",
  maxSizeMB: 5,
  safeZone:
    "Use the full frame for the image — no text overlay is shown on the homepage.",
} as const;

export const HERO_IMAGE_RECOMMENDATION = `${HERO_IMAGE_SPECS.recommended.width} × ${HERO_IMAGE_SPECS.recommended.height} px (${HERO_IMAGE_SPECS.aspectRatio})`;
