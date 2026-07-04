export type ContactMessageInput = {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type { AdminLoginInput } from "./auth";

export type HeroSlideInput = {
  imageUrl: string;
  order?: number;
  isActive?: boolean;
};

export type ProjectInput = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  isFeatured?: boolean;
  isPublished?: boolean;
  order?: number;
};

export type StaticPageInput = {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
};
