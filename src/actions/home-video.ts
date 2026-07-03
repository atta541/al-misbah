"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import {
  deleteCloudinaryVideo,
  uploadHomeVideo,
} from "@/lib/cloudinary";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { homeVideoService } from "@/services/home-video.service";
import { homeVideoSchema } from "@/validations/home-video";

export type HomeVideoActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function revalidateHomeVideoPages() {
  revalidatePath(websiteRoutes.home);
  revalidatePath(adminRoutes.homeVideo);
}

function parseHomeVideoForm(formData: FormData) {
  return homeVideoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    highlightOne: formData.get("highlightOne") || undefined,
    highlightTwo: formData.get("highlightTwo") || undefined,
    isActive: formData.get("isActive") === "on",
  });
}

async function resolveVideoFromForm(
  formData: FormData,
  options: { required: boolean },
) {
  const videoFile = formData.get("video");

  if (videoFile instanceof File && videoFile.size > 0) {
    return uploadHomeVideo(videoFile);
  }

  const videoUrl = String(formData.get("videoUrl") ?? "").trim();
  const videoPublicId = String(formData.get("videoPublicId") ?? "").trim();
  const thumbnailUrl = String(formData.get("thumbnailUrl") ?? "").trim();

  if (!videoUrl) {
    if (options.required) {
      throw new Error("Introduction video file is required.");
    }

    return null;
  }

  return {
    url: videoUrl,
    publicId: videoPublicId || null,
    thumbnailUrl: thumbnailUrl || null,
    durationSeconds: 0,
  };
}

export async function saveHomeVideo(
  _prevState: HomeVideoActionState | null,
  formData: FormData,
): Promise<HomeVideoActionState> {
  await requireAdminSession();

  const existing = await homeVideoService.getSingleton();
  const parsed = parseHomeVideoForm(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const uploaded = await resolveVideoFromForm(formData, {
      required: !existing,
    });

    if (!uploaded) {
      throw new Error("Introduction video file is required.");
    }

    const videoFile = formData.get("video");
    const isNewUpload = videoFile instanceof File && videoFile.size > 0;

    if (existing?.videoPublicId && isNewUpload) {
      await deleteCloudinaryVideo(existing.videoPublicId);
    }

    await homeVideoService.upsertSingleton({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      highlightOne: parsed.data.highlightOne ?? null,
      highlightTwo: parsed.data.highlightTwo ?? null,
      videoUrl: uploaded.url,
      videoPublicId: uploaded.publicId,
      thumbnailUrl: uploaded.thumbnailUrl,
      isActive: parsed.data.isActive ?? true,
    });

    revalidateHomeVideoPages();
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to save home video.",
    };
  }
}

export async function removeHomeVideo(
  _prevState: HomeVideoActionState | null,
): Promise<HomeVideoActionState> {
  await requireAdminSession();

  try {
    const existing = await homeVideoService.deleteSingleton();

    if (existing?.videoPublicId) {
      await deleteCloudinaryVideo(existing.videoPublicId);
    }

    revalidateHomeVideoPages();
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to remove home video.",
    };
  }
}
