"use server";

import { projectService } from "@/services/project.service";
import { projectDonationSchema } from "@/validations/project";
import { decimalToNumber } from "@/lib/currency";

export type ProjectDonationActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitProjectDonation(
  input: unknown,
): Promise<ProjectDonationActionState> {
  const parsed = projectDonationSchema.safeParse(input);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const category = await projectService.getCategoryForDonation(
    parsed.data.categoryId,
    parsed.data.projectId,
  );

  if (!category) {
    return { error: "Selected donation option is no longer available." };
  }

  const minPrice = decimalToNumber(category.price);
  const maxPrice = decimalToNumber(category.priceTo ?? category.price);
  const hasRange =
    category.priceTo != null &&
    maxPrice != null &&
    minPrice != null &&
    maxPrice > minPrice;

  if (hasRange && !parsed.data.amount) {
    return { fieldErrors: { amount: ["Enter your donation amount."] } };
  }

  if (parsed.data.amount && minPrice != null && maxPrice != null) {
    if (parsed.data.amount < minPrice || parsed.data.amount > maxPrice) {
      return {
        fieldErrors: {
          amount: [`Amount must be between the category price range.`],
        },
      };
    }
  }

  await projectService.createDonation({
    projectId: parsed.data.projectId,
    categoryId: parsed.data.categoryId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    amount: parsed.data.amount ?? minPrice ?? null,
    message: parsed.data.message ?? null,
  });

  return { success: true };
}
