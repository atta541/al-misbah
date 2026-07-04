"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import {
  createSignedUploadParams,
  deleteCloudinaryImage,
  getGalleryCloudinaryFolder,
  uploadGalleryCoverImage,
} from "@/lib/cloudinary";
import type { SignedUploadParams } from "@/lib/gallery-upload-client";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { galleryService } from "@/services/gallery.service";
import { galleryCollectionSchema } from "@/validations/gallery";

export type GalleryActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function revalidateGalleryPages(slug?: string) {
  revalidatePath(websiteRoutes.gallery);
  if (slug) {
    revalidatePath(`${websiteRoutes.gallery}/${slug}`);
  }
  revalidatePath(adminRoutes.gallery);
  if (slug) {
    revalidatePath(`${adminRoutes.gallery}`, "layout");
  }
}

function parseGalleryForm(formData: FormData) {
  return galleryCollectionSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") || undefined,
    order: formData.get("order") || undefined,
  });
}

async function deleteCollectionAssets(collection: {
  coverImagePublicId: string | null;
  images: { imagePublicId: string | null }[];
}) {
  await deleteCloudinaryImage(collection.coverImagePublicId);
  await Promise.all(
    collection.images.map((image) => deleteCloudinaryImage(image.imagePublicId)),
  );
}

export async function getGalleryImageUploadSignature(
  collectionId: string,
): Promise<SignedUploadParams> {
  await requireAdminSession();

  const collection = await galleryService.getById(collectionId);
  if (!collection) {
    throw new Error("Gallery collection not found.");
  }

  return createSignedUploadParams(
    getGalleryCloudinaryFolder(collection.slug, "images"),
  );
}

export async function registerGalleryImages(
  collectionId: string,
  images: {
    imageUrl: string;
    imagePublicId: string;
    width?: number | null;
    height?: number | null;
  }[],
): Promise<{ success?: boolean; error?: string }> {
  await requireAdminSession();

  if (images.length === 0) {
    return { error: "No images to save." };
  }

  const collection = await galleryService.getById(collectionId);
  if (!collection) {
    return { error: "Gallery collection not found." };
  }

  const nextOrder = collection.images.length;

  await galleryService.addImages(
    collectionId,
    images.map((image, index) => ({
      imageUrl: image.imageUrl,
      imagePublicId: image.imagePublicId,
      width: image.width ?? null,
      height: image.height ?? null,
      order: nextOrder + index,
    })),
  );

  if (!collection.coverImage) {
    await galleryService.update(collectionId, {
      coverImage: images[0].imageUrl,
      coverImagePublicId: images[0].imagePublicId,
    });
  }

  revalidateGalleryPages(collection.slug);
  revalidatePath(`${adminRoutes.gallery}/${collectionId}/edit`);

  return { success: true };
}

export async function createGalleryCollection(
  _prevState: GalleryActionState | null,
  formData: FormData,
): Promise<GalleryActionState> {
  await requireAdminSession();

  const parsed = parseGalleryForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const slug = await galleryService.ensureUniqueSlug(
      parsed.data.slug || parsed.data.title,
    );

    let coverImage: string | null = null;
    let coverImagePublicId: string | null = null;

    const coverFile = formData.get("coverImage");
    if (coverFile instanceof File && coverFile.size > 0) {
      const uploaded = await uploadGalleryCoverImage(coverFile, slug);
      coverImage = uploaded.url;
      coverImagePublicId = uploaded.publicId;
    }

    const order =
      parsed.data.order ?? (await galleryService.getNextOrder());

    const collection = await galleryService.create({
      title: parsed.data.title,
      slug,
      description: parsed.data.description ?? null,
      coverImage,
      coverImagePublicId,
      order,
    });

    revalidateGalleryPages(slug);
    redirect(`${adminRoutes.gallery}/${collection.id}/edit`);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create gallery collection.",
    };
  }
}

export async function updateGalleryCollection(
  id: string,
  _prevState: GalleryActionState | null,
  formData: FormData,
): Promise<GalleryActionState> {
  await requireAdminSession();

  const existing = await galleryService.getById(id);
  if (!existing) {
    return { error: "Gallery collection not found." };
  }

  const parsed = parseGalleryForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const slug = await galleryService.ensureUniqueSlug(
      parsed.data.slug || parsed.data.title,
      id,
    );

    let coverImage = existing.coverImage;
    let coverImagePublicId = existing.coverImagePublicId;

    const coverFile = formData.get("coverImage");
    if (coverFile instanceof File && coverFile.size > 0) {
      const uploaded = await uploadGalleryCoverImage(coverFile, slug);
      await deleteCloudinaryImage(existing.coverImagePublicId);
      coverImage = uploaded.url;
      coverImagePublicId = uploaded.publicId;
    }

    await galleryService.update(id, {
      title: parsed.data.title,
      slug,
      description: parsed.data.description ?? null,
      coverImage,
      coverImagePublicId,
      order: parsed.data.order ?? existing.order,
    });

    if (existing.slug !== slug) {
      revalidateGalleryPages(existing.slug);
    }
    revalidateGalleryPages(slug);
    revalidatePath(`${adminRoutes.gallery}/${id}/edit`);
    redirect(`${adminRoutes.gallery}/${id}/edit`);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update gallery collection.",
    };
  }
}

export async function deleteGalleryCollection(id: string, _formData?: FormData) {
  await requireAdminSession();

  const existing = await galleryService.getById(id);
  if (!existing) return;

  await deleteCollectionAssets(existing);
  await galleryService.delete(id);
  revalidateGalleryPages(existing.slug);
}

export async function deleteGalleryImage(imageId: string, _formData?: FormData) {
  await requireAdminSession();

  const image = await galleryService.getImage(imageId);
  if (!image) return;

  await deleteCloudinaryImage(image.imagePublicId);
  await galleryService.deleteImage(imageId);

  const collection = await galleryService.getById(image.galleryId);
  if (collection && collection.images.length === 0) {
    await galleryService.update(collection.id, {
      coverImage: null,
      coverImagePublicId: null,
    });
  } else if (collection && collection.coverImage === image.imageUrl) {
    const nextCover = collection.images[0];
    if (nextCover) {
      await galleryService.update(collection.id, {
        coverImage: nextCover.imageUrl,
        coverImagePublicId: nextCover.imagePublicId,
      });
    }
  }

  revalidateGalleryPages(image.gallery.slug);
  revalidatePath(`${adminRoutes.gallery}/${image.galleryId}/edit`);
}
