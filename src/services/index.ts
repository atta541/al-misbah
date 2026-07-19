import { prisma } from "@/lib/prisma";

export { galleryService } from "@/services/gallery.service";
export { heroService } from "@/services/hero.service";
export { homeVideoService } from "@/services/home-video.service";
export { projectService } from "@/services/project.service";

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
        themePreset: "slate-clarity",
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

  updateTheme: async (
    themePreset: string,
    themeCustom?: Record<string, string> | null,
  ) => {
    const existing = await prisma.siteSettings.findFirst();
    const data = {
      themePreset,
      ...(themeCustom !== undefined
        ? { themeCustom: themeCustom ?? undefined }
        : {}),
    };

    if (existing) {
      return prisma.siteSettings.update({
        where: { id: existing.id },
        data,
      });
    }

    return prisma.siteSettings.create({
      data: {
        websiteName: "Al-Misbah Center",
        ...data,
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
