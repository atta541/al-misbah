import { prisma } from "@/lib/prisma";

export type HomeVideoInput = {
  title: string;
  description?: string | null;
  highlightOne?: string | null;
  highlightTwo?: string | null;
  videoUrl: string;
  videoPublicId?: string | null;
  thumbnailUrl?: string | null;
  isActive?: boolean;
};

export const homeVideoService = {
  getActive: () =>
    prisma.homeVideo.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    }),

  getSingleton: () => prisma.homeVideo.findFirst({ orderBy: { updatedAt: "desc" } }),

  upsertSingleton: async (data: HomeVideoInput) => {
    const existing = await prisma.homeVideo.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (existing) {
      return prisma.homeVideo.update({
        where: { id: existing.id },
        data,
      });
    }

    return prisma.homeVideo.create({ data });
  },

  deleteSingleton: async () => {
    const existing = await prisma.homeVideo.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (!existing) {
      return null;
    }

    await prisma.homeVideo.delete({ where: { id: existing.id } });
    return existing;
  },
};
