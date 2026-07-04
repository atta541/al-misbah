"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import {
  deleteCloudinaryImage,
  uploadHeroImage,
} from "@/lib/cloudinary";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { heroService } from "@/services/hero.service";
import { heroSlideSchema } from "@/validations/hero";

export type HeroActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function revalidateHeroPages() {
  revalidatePath(websiteRoutes.home);
  revalidatePath(adminRoutes.hero);
}

function parseHeroForm(formData: FormData) {
  return heroSlideSchema.safeParse({
    isActive: formData.get("isActive") === "on",
  });
}

async function resolveImageFromForm(formData: FormData) {
  const imageFile = formData.get("image");

  if (imageFile instanceof File && imageFile.size > 0) {
    return uploadHeroImage(imageFile);
  }

  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const imagePublicId = String(formData.get("imagePublicId") ?? "").trim();

  if (!imageUrl) {
    throw new Error("Hero image is required.");
  }

  return {
    url: imageUrl,
    publicId: imagePublicId || null,
  };
}

export async function createHeroSlide(
  _prevState: HeroActionState | null,
  formData: FormData,
): Promise<HeroActionState> {
  await requireAdminSession();

  const parsed = parseHeroForm(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const image = await resolveImageFromForm(formData);
    const order = await heroService.getNextOrder();

    await heroService.create({
      imageUrl: image.url,
      imagePublicId: image.publicId,
      order,
      isActive: parsed.data.isActive ?? true,
    });

    revalidateHeroPages();
    redirect(adminRoutes.hero);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to create hero slide.",
    };
  }
}

export async function updateHeroSlide(
  id: string,
  _prevState: HeroActionState | null,
  formData: FormData,
): Promise<HeroActionState> {
  await requireAdminSession();

  const existing = await heroService.getById(id);

  if (!existing) {
    return { error: "Hero slide not found." };
  }

  const parsed = parseHeroForm(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const imageFile = formData.get("image");
    let imageUrl = existing.imageUrl;
    let imagePublicId = existing.imagePublicId;

    if (imageFile instanceof File && imageFile.size > 0) {
      const uploaded = await uploadHeroImage(imageFile);
      await deleteCloudinaryImage(existing.imagePublicId);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    await heroService.update(id, {
      imageUrl,
      imagePublicId,
      isActive: parsed.data.isActive ?? true,
    });

    revalidateHeroPages();
    redirect(adminRoutes.hero);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update hero slide.",
    };
  }
}

export async function deleteHeroSlide(id: string, _formData?: FormData) {
  await requireAdminSession();

  const existing = await heroService.getById(id);

  if (!existing) {
    return;
  }

  await deleteCloudinaryImage(existing.imagePublicId);
  await heroService.delete(id);
  revalidateHeroPages();
}

export async function toggleHeroSlideActive(
  id: string,
  isActive: boolean,
  _formData?: FormData,
) {
  await requireAdminSession();

  await heroService.toggleActive(id, isActive);
  revalidateHeroPages();
}
