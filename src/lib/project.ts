/** Homepage shows at most 6 featured projects. */
export const MAX_FEATURED_PROJECTS = 6;

export const PROJECT_IMAGE_SPECS = {
  featured: { width: 1200, height: 800, label: "1200 × 800 px (3:2)" },
  gallery: { width: 1600, height: 1200, label: "1600 × 1200 px minimum" },
  maxSizeMB: 5,
  formats: "JPG, PNG, WEBP, or AVIF",
} as const;

export const PROJECT_FEATURED_UPLOAD_HINT = `Featured: ${PROJECT_IMAGE_SPECS.featured.label}. Max ${PROJECT_IMAGE_SPECS.maxSizeMB}MB.`;
