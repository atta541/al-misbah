import { websiteRoutes } from "@/lib/routes";

/** Recommended hero image size for full-width `object-cover` slides. */
export const HERO_IMAGE_SPECS = {
  recommended: { width: 1920, height: 900 },
  minimum: { width: 1280, height: 720 },
  aspectRatio: "16:9",
  formats: "JPG, PNG, WEBP, or AVIF",
  maxSizeMB: 5,
  safeZone:
    "Keep faces and key subjects on the left third — hero text sits on the left side.",
} as const;

export const HERO_IMAGE_RECOMMENDATION = `${HERO_IMAGE_SPECS.recommended.width} × ${HERO_IMAGE_SPECS.recommended.height} px (${HERO_IMAGE_SPECS.aspectRatio})`;

export const heroButtonLinkOptions = [
  { label: "Home", value: websiteRoutes.home },
  { label: "Contact / Donate", value: websiteRoutes.contact },
  { label: "Our Projects", value: websiteRoutes.projects },
  { label: "Gallery", value: websiteRoutes.gallery },
  { label: "About Us", value: websiteRoutes.about },
  { label: "Privacy Policy", value: websiteRoutes.privacyPolicy },
  { label: "Terms & Conditions", value: websiteRoutes.terms },
] as const;

export const heroButtonLinkValues = heroButtonLinkOptions.map(
  (option) => option.value,
);

export function isHeroButtonLink(value: string | null | undefined) {
  return Boolean(
    value && heroButtonLinkValues.includes(value as (typeof heroButtonLinkValues)[number]),
  );
}
