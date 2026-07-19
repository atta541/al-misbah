"use server";

import { revalidatePath } from "next/cache";
import { decimalToNumber } from "@/lib/currency";
import { adminRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";
import {
  checkoutLeadSchema,
  updateLeadStatusSchema,
} from "@/validations/checkout";

export type CheckoutActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitCheckoutLead(
  input: unknown,
): Promise<CheckoutActionState> {
  const parsed = checkoutLeadSchema.safeParse(input);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const category = await projectService.getCategoryForDonation(
    parsed.data.categoryId,
    parsed.data.projectId,
  );

  if (!category) {
    return { error: "Selected option is no longer available." };
  }

  const minPrice = decimalToNumber(category.price);
  const maxPrice = decimalToNumber(category.priceTo ?? category.price);
  const hasRange =
    category.priceTo != null &&
    maxPrice != null &&
    minPrice != null &&
    maxPrice > minPrice;

  const quantity = parsed.data.quantity;

  let amount: number | null = null;

  if (hasRange) {
    if (!parsed.data.amount) {
      return { fieldErrors: { amount: ["Enter your contribution amount."] } };
    }
    if (
      minPrice != null &&
      maxPrice != null &&
      (parsed.data.amount < minPrice || parsed.data.amount > maxPrice)
    ) {
      return {
        fieldErrors: {
          amount: ["Amount must be within the option price range."],
        },
      };
    }
    amount = parsed.data.amount;
  } else if (minPrice != null) {
    amount = minPrice * quantity;
  }

  await projectService.createDonation({
    projectId: parsed.data.projectId,
    categoryId: parsed.data.categoryId,
    fullName: parsed.data.fullName,
    email: parsed.data.email || "",
    phone: parsed.data.phone,
    quantity,
    amount,
    message: parsed.data.message ?? null,
  });

  revalidatePath(adminRoutes.leads);

  return { success: true };
}

export async function updateCheckoutLeadStatus(
  input: unknown,
): Promise<CheckoutActionState> {
  const parsed = updateLeadStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid status update." };
  }

  await projectService.updateLeadStatus(parsed.data.id, parsed.data.status);
  revalidatePath(adminRoutes.leads);

  return { success: true };
}
