import { prisma } from "@/lib/prisma";

export type HeroSlideInput = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl: string;
  imagePublicId?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  order?: number;
  isActive?: boolean;
};

export const heroService = {
  listActive: () =>
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),

  listAll: () => prisma.heroSlide.findMany({ orderBy: { order: "asc" } }),

  getById: (id: string) => prisma.heroSlide.findUnique({ where: { id } }),

  getNextOrder: async () => {
    const last = await prisma.heroSlide.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    return (last?.order ?? -1) + 1;
  },

  create: (data: HeroSlideInput) => prisma.heroSlide.create({ data }),

  update: (id: string, data: Partial<HeroSlideInput>) =>
    prisma.heroSlide.update({ where: { id }, data }),

  delete: (id: string) => prisma.heroSlide.delete({ where: { id } }),

  toggleActive: (id: string, isActive: boolean) =>
    prisma.heroSlide.update({ where: { id }, data: { isActive } }),
};
