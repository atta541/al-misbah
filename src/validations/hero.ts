import { z } from "zod";
import { heroButtonLinkValues } from "@/lib/hero";

export const heroSlideSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  subtitle: z.string().trim().optional(),
  description: z.string().trim().optional(),
  buttonText: z.string().trim().optional(),
  buttonLink: z
    .enum(heroButtonLinkValues as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().optional(),
});

export type HeroSlideFormValues = z.infer<typeof heroSlideSchema>;
