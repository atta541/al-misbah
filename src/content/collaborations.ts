export type CollaborationPartner = {
  id: string;
  name: string;
  /** Optional logo under /public — falls back to the partner name */
  logoUrl?: string;
};

export const collaborationsSection = {
  eyebrow: "Our collaborations",
  title: "Organizations we work alongside",
} as const;

/**
 * Landing-page collaboration logos.
 * Drop images in /public/collaborations and set logoUrl, or keep name-only.
 */
export const collaborationPartners: CollaborationPartner[] = [
  { id: "partner-1", name: "Meezan Bank" },
  { id: "partner-2", name: "Community Relief Network" },
  { id: "partner-3", name: "Health Partners Alliance" },
  { id: "partner-4", name: "Education Trust Collective" },
  { id: "partner-5", name: "Clean Water Initiative" },
  { id: "partner-6", name: "Local Welfare Forum" },
  { id: "partner-7", name: "Youth Development Circle" },
  { id: "partner-8", name: "Food Security Coalition" },
];
