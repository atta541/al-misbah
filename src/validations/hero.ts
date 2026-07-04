import { z } from "zod";

export const heroSlideSchema = z.object({
  isActive: z.boolean().optional(),
});

export type HeroSlideFormValues = z.infer<typeof heroSlideSchema>;
