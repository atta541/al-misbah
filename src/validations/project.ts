import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters."),
  description: z.string().trim().min(1, "Description is required."),
  currency: z.string().trim().min(3).max(3).optional(),
  location: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  order: z.coerce.number().int().min(0).optional(),
});

export const projectCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Category name is required."),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be greater than zero."),
  priceTo: z.coerce.number().positive().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const projectBeneficiarySchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Beneficiary title is required."),
  description: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

export const projectFaqSchema = z.object({
  id: z.string().optional(),
  question: z.string().trim().min(1, "Question is required."),
  answer: z.string().trim().min(1, "Answer is required."),
  isActive: z.boolean().optional(),
});

export const projectNestedSchema = z.object({
  categories: z.array(projectCategorySchema).default([]),
  beneficiaries: z.array(projectBeneficiarySchema).default([]),
  faqs: z.array(projectFaqSchema).default([]),
});

export const projectDonationSchema = z.object({
  projectId: z.string().min(1),
  categoryId: z.string().min(1),
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z.string().trim().optional(),
  amount: z.coerce.number().positive().optional(),
  message: z.string().trim().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type ProjectNestedFormValues = z.infer<typeof projectNestedSchema>;
export type ProjectDonationFormValues = z.infer<typeof projectDonationSchema>;
