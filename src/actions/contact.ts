"use server";

import { revalidatePath } from "next/cache";
import { contactMessageService } from "@/services";
import type { ContactMessageInput } from "@/validations";
import { websiteRoutes } from "@/lib/routes";

export async function submitContactMessage(input: ContactMessageInput) {
  if (!input.fullName.trim() || !input.email.trim() || !input.message.trim()) {
    return { success: false, error: "Please fill in all required fields." };
  }

  await contactMessageService.create({
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim(),
    subject: input.subject?.trim(),
    message: input.message.trim(),
  });

  revalidatePath(websiteRoutes.contact);

  return { success: true };
}
