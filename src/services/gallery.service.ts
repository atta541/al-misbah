import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

const collectionInclude = {
  images: { orderBy: { order: "asc" as const } },
};

export type GalleryCollectionInput = {
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  coverImagePublicId?: string | null;
  order?: number;
};

export type GalleryImageInput = {
  imageUrl: string;
  imagePublicId?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  order?: number;
};

export const galleryService = {
  listCollections: () =>
    prisma.galleryCollection.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: collectionInclude,
    }),

  listPublishedSlugs: () =>
    prisma.galleryCollection.findMany({
      select: { slug: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),

  getBySlug: (slug: string) =>
    prisma.galleryCollection.findUnique({
      where: { slug },
      include: collectionInclude,
    }),

  getById: (id: string) =>
    prisma.galleryCollection.findUnique({
      where: { id },
      include: collectionInclude,
    }),

  getNextOrder: async () => {
    const last = await prisma.galleryCollection.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    return (last?.order ?? -1) + 1;
  },

  ensureUniqueSlug: async (title: string, excludeId?: string) => {
    const base = slugify(title) || "gallery";
    let candidate = base;
    let counter = 2;

    while (true) {
      const existing = await prisma.galleryCollection.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      if (!existing || existing.id === excludeId) {
        return candidate;
      }

      candidate = `${base}-${counter}`;
      counter += 1;
    }
  },

  create: (
    data: GalleryCollectionInput,
    images: GalleryImageInput[] = [],
  ) =>
    prisma.galleryCollection.create({
      data: {
        ...data,
        images: images.length ? { create: images } : undefined,
      },
      include: collectionInclude,
    }),

  update: (id: string, data: Partial<GalleryCollectionInput>) =>
    prisma.galleryCollection.update({
      where: { id },
      data,
      include: collectionInclude,
    }),

  addImages: (galleryId: string, images: GalleryImageInput[]) =>
    prisma.galleryImage.createMany({
      data: images.map((image, index) => ({
        galleryId,
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId ?? null,
        caption: image.caption ?? null,
        width: image.width ?? null,
        height: image.height ?? null,
        order: image.order ?? index,
      })),
    }),

  getImage: (id: string) =>
    prisma.galleryImage.findUnique({
      where: { id },
      include: { gallery: true },
    }),

  deleteImage: (id: string) => prisma.galleryImage.delete({ where: { id } }),

  delete: (id: string) => prisma.galleryCollection.delete({ where: { id } }),
};
