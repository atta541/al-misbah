import { z } from "zod";

export const CHECKOUT_LEAD_STATUSES = [
  "pending",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type CheckoutLeadStatusValue = (typeof CHECKOUT_LEAD_STATUSES)[number];

export const CHECKOUT_LEAD_STATUS_LABELS: Record<
  CheckoutLeadStatusValue,
  string
> = {
  pending: "Pending",
  contacted: "Contacted",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const checkoutLeadSchema = z.object({
  projectId: z.string().min(1),
  categoryId: z.string().min(1),
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z
    .string()
    .trim()
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Enter a valid email.",
    }),
  phone: z
    .string()
    .trim()
    .min(8, "WhatsApp number is required.")
    .max(30, "WhatsApp number is too long."),
  quantity: z.coerce.number().int().min(1).max(99).default(1),
  amount: z.coerce.number().positive().optional(),
  message: z.string().trim().max(2000).optional(),
});

export const updateLeadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(CHECKOUT_LEAD_STATUSES),
});

export type CheckoutLeadFormValues = z.infer<typeof checkoutLeadSchema>;
