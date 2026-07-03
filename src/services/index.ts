import { prisma } from "@/lib/prisma";

export const heroService = {
  listActive: () =>
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
  listAll: () => prisma.heroSlide.findMany({ orderBy: { order: "asc" } }),
};

export const homeVideoService = {
  getActive: () => prisma.homeVideo.findFirst({ where: { isActive: true } }),
};

export const projectService = {
  listPublished: () =>
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: { images: { orderBy: { order: "asc" } } },
    }),
  getBySlug: (slug: string) =>
    prisma.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: "asc" } } },
    }),
};

export const galleryService = {
  listCollections: () =>
    prisma.galleryCollection.findMany({
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" } } },
    }),
};

export const staticPageService = {
  getBySlug: (slug: string) => prisma.staticPage.findUnique({ where: { slug } }),
  listPublished: () =>
    prisma.staticPage.findMany({
      where: { isPublished: true },
      orderBy: { title: "asc" },
    }),
};

export const siteSettingsService = {
  get: () => prisma.siteSettings.findFirst(),

  getOrCreate: async () => {
    const existing = await prisma.siteSettings.findFirst();

    if (existing) {
      return existing;
    }

    return prisma.siteSettings.create({
      data: {
        websiteName: "Al-Misbah Center",
        themePreset: "emerald-trust",
      },
    });
  },

  updateThemePreset: async (themePreset: string) => {
    const existing = await prisma.siteSettings.findFirst();

    if (existing) {
      return prisma.siteSettings.update({
        where: { id: existing.id },
        data: { themePreset },
      });
    }

    return prisma.siteSettings.create({
      data: {
        websiteName: "Al-Misbah Center",
        themePreset,
      },
    });
  },
};

export const contactMessageService = {
  create: (data: {
    fullName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => prisma.contactMessage.create({ data }),
  list: () =>
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
};

export const adminService = {
  findByEmail: (email: string) => prisma.admin.findUnique({ where: { email } }),
};
