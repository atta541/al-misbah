export type NavbarSettings = {
  websiteName: string;
  tagline?: string | null;
  logoUrl?: string | null;
  email?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
};

export type NavProject = {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  shortDescription: string;
};
