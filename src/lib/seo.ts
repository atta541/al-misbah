import type { Metadata } from "next";

/** Canonical production site URL (no trailing slash). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.almisbahinstitute.com";

export const SITE_NAME = "Al-Misbah Institute";
export const SITE_NAME_SHORT = "Al-Misbah";

export const SITE_TAGLINE =
  "Humanitarian aid, clean water, and community development across Pakistan";

export const SITE_DESCRIPTION =
  "Al-Misbah Institute delivers clean water, education, and emergency relief across Pakistan. Sponsor transparent projects — from hand pumps to Quran Hifz schools — and see lasting impact for families in need.";

export const SITE_KEYWORDS = [
  "Al-Misbah Institute",
  "Al-Misbah Center",
  "NGO Pakistan",
  "donate Pakistan",
  "hand pump installation",
  "clean drinking water",
  "Quran Hifz school",
  "humanitarian aid",
  "Sadaqah Jariyah",
  "charity Pakistan",
  "flood relief",
  "community development",
] as const;

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOpenGraphImage = {
  url: absoluteUrl("/og-image.png"),
  width: 1254,
  height: 1254,
  alt: `${SITE_NAME} logo`,
} as const;

export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | ${SITE_TAGLINE}`;
  const pageDescription = description ?? SITE_DESCRIPTION;
  const url = absoluteUrl(path);
  const ogImage = image
    ? { url: absoluteUrl(image), alt: title ?? SITE_NAME }
    : defaultOpenGraphImage;

  return {
    title: title ? { absolute: pageTitle } : undefined,
    description: pageDescription,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_NAME,
      locale: "en_PK",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [typeof ogImage.url === "string" ? ogImage.url : absoluteUrl("/og-image.png")],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

/** Organization JSON-LD for Google & AI crawlers. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    alternateName: ["Al-Misbah Center", "Al Misbah Institute"],
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl("/og-image.png"),
    description: SITE_DESCRIPTION,
    email: "info@almisbah.org",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    foundingDate: "2025",
    sameAs: [],
    knowsAbout: [
      "Humanitarian aid",
      "Clean water access",
      "Islamic education",
      "Community development",
      "Emergency flood relief",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "NGO",
      name: SITE_NAME,
      logo: absoluteUrl("/icon.png"),
    },
    inLanguage: "en",
  };
}
