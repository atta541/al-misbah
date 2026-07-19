"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import {
  deleteCloudinaryImage,
  uploadProjectFeaturedImage,
  uploadProjectGalleryImage,
} from "@/lib/cloudinary";
import { MAX_FEATURED_PROJECTS } from "@/lib/project";
import { sanitizeRichText } from "@/lib/sanitize-html";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";
import {
  projectNestedSchema,
  projectSchema,
} from "@/validations/project";

export type ProjectActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function parseOptionalDate(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidateProjectPages(slug?: string) {
  revalidatePath(websiteRoutes.home);
  revalidatePath(websiteRoutes.projects);
  revalidatePath("/", "layout");
  if (slug) {
    revalidatePath(`${websiteRoutes.projects}/${slug}`);
  }
  revalidatePath(adminRoutes.projects);
}

async function assertFeaturedLimit(isFeatured: boolean, excludeId?: string) {
  if (!isFeatured) return;

  const count = await projectService.countFeatured(excludeId);
  if (count >= MAX_FEATURED_PROJECTS) {
    throw new Error(
      `Only ${MAX_FEATURED_PROJECTS} projects can be featured on the homepage.`,
    );
  }
}

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    currency: formData.get("currency") || "PKR",
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
    order: formData.get("order") || undefined,
  });
}

function parseNestedForm(formData: FormData) {
  const raw = String(formData.get("nestedData") ?? "").trim();
  if (!raw) {
    return projectNestedSchema.safeParse({
      categories: [],
      beneficiaries: [],
      faqs: [],
    });
  }

  try {
    return projectNestedSchema.safeParse(JSON.parse(raw));
  } catch {
    return {
      success: false as const,
      error: { flatten: () => ({ fieldErrors: {} }) },
    };
  }
}

function getGalleryFiles(formData: FormData) {
  return formData
    .getAll("gallery")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

async function deleteProjectAssets(project: {
  featuredImagePublicId: string | null;
  images: { imagePublicId: string | null }[];
}) {
  await deleteCloudinaryImage(project.featuredImagePublicId);

  await Promise.all(
    project.images.map((image) => deleteCloudinaryImage(image.imagePublicId)),
  );
}

export async function createProject(
  _prevState: ProjectActionState | null,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdminSession();

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const nestedParsed = parseNestedForm(formData);
  if (!nestedParsed.success) {
    return { error: "Invalid categories, beneficiaries, or FAQ data." };
  }

  try {
    const featuredFile = formData.get("featuredImage");
    if (!(featuredFile instanceof File) || featuredFile.size === 0) {
      return { error: "Featured image is required." };
    }

    const slug = await projectService.ensureUniqueSlug(
      parsed.data.slug || parsed.data.title,
    );

    await assertFeaturedLimit(parsed.data.isFeatured ?? false);

    const featured = await uploadProjectFeaturedImage(featuredFile, slug);
    const galleryFiles = getGalleryFiles(formData);
    const galleryUploads = await Promise.all(
      galleryFiles.map((file) => uploadProjectGalleryImage(file, slug)),
    );

    const order =
      parsed.data.order ?? (await projectService.getNextOrder());

    await projectService.create(
      {
        title: parsed.data.title,
        slug,
        shortDescription: parsed.data.shortDescription,
        description: sanitizeRichText(parsed.data.description),
        featuredImage: featured.url,
        featuredImagePublicId: featured.publicId,
        currency: parsed.data.currency ?? "PKR",
        location: parsed.data.location ?? null,
        startDate: parseOptionalDate(formData.get("startDate")),
        endDate: parseOptionalDate(formData.get("endDate")),
        isFeatured: parsed.data.isFeatured ?? false,
        isPublished: parsed.data.isPublished ?? true,
        order,
      },
      galleryUploads.map((image, index) => ({
        imageUrl: image.url,
        imagePublicId: image.publicId,
        order: index,
      })),
      nestedParsed.data,
    );

    revalidateProjectPages(slug);
    redirect(adminRoutes.projects);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to create project.",
    };
  }
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState | null,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdminSession();

  const existing = await projectService.getById(id);
  if (!existing) {
    return { error: "Project not found." };
  }

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const nestedParsed = parseNestedForm(formData);
  if (!nestedParsed.success) {
    return { error: "Invalid categories, beneficiaries, or FAQ data." };
  }

  try {
    const slug = await projectService.ensureUniqueSlug(
      parsed.data.slug || parsed.data.title,
      id,
    );

    await assertFeaturedLimit(parsed.data.isFeatured ?? false, id);

    let featuredImage = existing.featuredImage;
    let featuredImagePublicId = existing.featuredImagePublicId;

    const featuredFile = formData.get("featuredImage");
    if (featuredFile instanceof File && featuredFile.size > 0) {
      const uploaded = await uploadProjectFeaturedImage(featuredFile, slug);
      await deleteCloudinaryImage(existing.featuredImagePublicId);
      featuredImage = uploaded.url;
      featuredImagePublicId = uploaded.publicId;
    }

    const galleryFiles = getGalleryFiles(formData);
    if (galleryFiles.length > 0) {
      const galleryUploads = await Promise.all(
        galleryFiles.map((file) => uploadProjectGalleryImage(file, slug)),
      );

      const nextOrder = existing.images.length;
      await projectService.addGalleryImages(
        id,
        galleryUploads.map((image, index) => ({
          imageUrl: image.url,
          imagePublicId: image.publicId,
          order: nextOrder + index,
        })),
      );
    }

    await projectService.update(id, {
      title: parsed.data.title,
      slug,
      shortDescription: parsed.data.shortDescription,
      description: sanitizeRichText(parsed.data.description),
      featuredImage,
      featuredImagePublicId,
      currency: parsed.data.currency ?? "PKR",
      location: parsed.data.location ?? null,
      startDate: parseOptionalDate(formData.get("startDate")),
      endDate: parseOptionalDate(formData.get("endDate")),
      isFeatured: parsed.data.isFeatured ?? false,
      isPublished: parsed.data.isPublished ?? true,
      order: parsed.data.order ?? existing.order,
    });

    await projectService.syncNested(id, nestedParsed.data);

    if (existing.slug !== slug) {
      revalidateProjectPages(existing.slug);
    }
    revalidateProjectPages(slug);
    redirect(adminRoutes.projects);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update project.",
    };
  }
}

export async function deleteProject(id: string, _formData?: FormData) {
  await requireAdminSession();

  const existing = await projectService.getById(id);
  if (!existing) return;

  await deleteProjectAssets(existing);
  await projectService.delete(id);
  revalidateProjectPages(existing.slug);
}

export async function deleteProjectGalleryImage(
  imageId: string,
  _formData?: FormData,
) {
  await requireAdminSession();

  const image = await projectService.getGalleryImage(imageId);
  if (!image) return;

  await deleteCloudinaryImage(image.imagePublicId);
  await projectService.deleteGalleryImage(imageId);
  revalidateProjectPages(image.project.slug);
}

export async function toggleProjectFeatured(
  id: string,
  isFeatured: boolean,
  _formData?: FormData,
) {
  await requireAdminSession();

  await assertFeaturedLimit(isFeatured, id);
  const project = await projectService.toggleFeatured(id, isFeatured);
  revalidateProjectPages(project.slug);
}

export async function toggleProjectPublished(
  id: string,
  isPublished: boolean,
  _formData?: FormData,
) {
  await requireAdminSession();

  const project = await projectService.togglePublished(id, isPublished);
  revalidateProjectPages(project.slug);
}

export async function suggestProjectSlug(title: string) {
  await requireAdminSession();
  return projectService.ensureUniqueSlug(title);
}
