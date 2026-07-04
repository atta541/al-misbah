import { z } from "zod";

export const galleryCollectionSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().trim().optional(),
  order: z.coerce.number().int().min(0).optional(),
});

export type GalleryCollectionFormValues = z.infer<typeof galleryCollectionSchema>;
