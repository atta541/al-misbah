import { z } from "zod";

export const homeVideoSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  description: z.string().trim().optional(),
  highlightOne: z.string().trim().optional(),
  highlightTwo: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

export type HomeVideoFormValues = z.infer<typeof homeVideoSchema>;
