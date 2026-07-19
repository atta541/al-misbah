import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { MAX_FEATURED_PROJECTS } from "@/lib/project";

const activeOnly = { isActive: true };

const projectInclude = {
  categories: { orderBy: { order: "asc" as const } },
  beneficiaries: { orderBy: { order: "asc" as const } },
  faqs: { orderBy: { order: "asc" as const } },
  images: { orderBy: { order: "asc" as const } },
};

const publishedProjectInclude = {
  categories: { where: activeOnly, orderBy: { order: "asc" as const } },
  beneficiaries: { where: activeOnly, orderBy: { order: "asc" as const } },
  faqs: { where: activeOnly, orderBy: { order: "asc" as const } },
  images: { orderBy: { order: "asc" as const } },
};

export type ProjectInput = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  featuredImagePublicId?: string | null;
  currency?: string;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  order?: number;
};

export type ProjectGalleryImageInput = {
  imageUrl: string;
  imagePublicId?: string | null;
  caption?: string | null;
  order?: number;
};

export type ProjectCategoryInput = {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  priceTo?: number | null;
  isActive?: boolean;
};

export type ProjectBeneficiaryInput = {
  id?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  isActive?: boolean;
};

export type ProjectFaqInput = {
  id?: string;
  question: string;
  answer: string;
  isActive?: boolean;
};

export type ProjectDonationInput = {
  projectId: string;
  categoryId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  quantity?: number;
  amount?: number | null;
  message?: string | null;
};

async function syncCategories(projectId: string, items: ProjectCategoryInput[]) {
  const existing = await prisma.projectCategory.findMany({
    where: { projectId },
    select: { id: true },
  });
  const incomingIds = new Set(items.filter((item) => item.id).map((item) => item.id!));

  for (const row of existing) {
    if (incomingIds.has(row.id)) continue;

    const donationCount = await prisma.projectDonation.count({
      where: { categoryId: row.id },
    });

    if (donationCount > 0) {
      throw new Error(
        "Cannot remove a donation category that already has submissions.",
      );
    }

    await prisma.projectCategory.delete({ where: { id: row.id } });
  }

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const data = {
      name: item.name,
      description: item.description ?? null,
      price: item.price,
      priceTo: item.priceTo ?? null,
      order: index,
      isActive: item.isActive ?? true,
    };

    if (item.id) {
      await prisma.projectCategory.update({
        where: { id: item.id },
        data,
      });
    } else {
      await prisma.projectCategory.create({
        data: { ...data, projectId },
      });
    }
  }
}

async function syncBeneficiaries(
  projectId: string,
  items: ProjectBeneficiaryInput[],
) {
  const existing = await prisma.projectBeneficiary.findMany({
    where: { projectId },
    select: { id: true },
  });
  const incomingIds = new Set(items.filter((item) => item.id).map((item) => item.id!));

  for (const row of existing) {
    if (!incomingIds.has(row.id)) {
      await prisma.projectBeneficiary.delete({ where: { id: row.id } });
    }
  }

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const data = {
      title: item.title,
      description: item.description ?? null,
      icon: item.icon ?? null,
      order: index,
      isActive: item.isActive ?? true,
    };

    if (item.id) {
      await prisma.projectBeneficiary.update({
        where: { id: item.id },
        data,
      });
    } else {
      await prisma.projectBeneficiary.create({
        data: { ...data, projectId },
      });
    }
  }
}

async function syncFaqs(projectId: string, items: ProjectFaqInput[]) {
  const existing = await prisma.projectFaq.findMany({
    where: { projectId },
    select: { id: true },
  });
  const incomingIds = new Set(items.filter((item) => item.id).map((item) => item.id!));

  for (const row of existing) {
    if (!incomingIds.has(row.id)) {
      await prisma.projectFaq.delete({ where: { id: row.id } });
    }
  }

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const data = {
      question: item.question,
      answer: item.answer,
      order: index,
      isActive: item.isActive ?? true,
    };

    if (item.id) {
      await prisma.projectFaq.update({
        where: { id: item.id },
        data,
      });
    } else {
      await prisma.projectFaq.create({
        data: { ...data, projectId },
      });
    }
  }
}

export const projectService = {
  listFeatured: (limit = MAX_FEATURED_PROJECTS) =>
    prisma.project.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
      include: publishedProjectInclude,
    }),

  listPublished: () =>
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: publishedProjectInclude,
    }),

  listForNav: () =>
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        shortDescription: true,
      },
    }),

  listPublishedSlugs: () =>
    prisma.project.findMany({
      where: { isPublished: true },
      select: { slug: true },
    }),

  listAll: () =>
    prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: projectInclude,
    }),

  getBySlug: (slug: string) =>
    prisma.project.findFirst({
      where: { slug, isPublished: true },
      include: publishedProjectInclude,
    }),

  getBySlugAdmin: (slug: string) =>
    prisma.project.findUnique({
      where: { slug },
      include: projectInclude,
    }),

  getById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: projectInclude,
    }),

  countFeatured: (excludeId?: string) =>
    prisma.project.count({
      where: {
        isFeatured: true,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    }),

  getNextOrder: async () => {
    const last = await prisma.project.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    return (last?.order ?? -1) + 1;
  },

  ensureUniqueSlug: async (title: string, excludeId?: string) => {
    const base = slugify(title) || "project";
    let candidate = base;
    let counter = 2;

    while (true) {
      const existing = await prisma.project.findUnique({
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

  create: async (
    data: ProjectInput,
    galleryImages: ProjectGalleryImageInput[] = [],
    nested?: {
      categories?: ProjectCategoryInput[];
      beneficiaries?: ProjectBeneficiaryInput[];
      faqs?: ProjectFaqInput[];
    },
  ) => {
    const project = await prisma.project.create({
      data: {
        ...data,
        images: galleryImages.length ? { create: galleryImages } : undefined,
      },
    });

    if (nested?.categories?.length) {
      await syncCategories(project.id, nested.categories);
    }
    if (nested?.beneficiaries?.length) {
      await syncBeneficiaries(project.id, nested.beneficiaries);
    }
    if (nested?.faqs?.length) {
      await syncFaqs(project.id, nested.faqs);
    }

    return prisma.project.findUniqueOrThrow({
      where: { id: project.id },
      include: projectInclude,
    });
  },

  update: (id: string, data: Partial<ProjectInput>) =>
    prisma.project.update({
      where: { id },
      data,
      include: projectInclude,
    }),

  syncNested: async (
    projectId: string,
    nested: {
      categories?: ProjectCategoryInput[];
      beneficiaries?: ProjectBeneficiaryInput[];
      faqs?: ProjectFaqInput[];
    },
  ) => {
    if (nested.categories) {
      await syncCategories(projectId, nested.categories);
    }
    if (nested.beneficiaries) {
      await syncBeneficiaries(projectId, nested.beneficiaries);
    }
    if (nested.faqs) {
      await syncFaqs(projectId, nested.faqs);
    }

    return projectService.getById(projectId);
  },

  addGalleryImages: (projectId: string, images: ProjectGalleryImageInput[]) =>
    prisma.projectImage.createMany({
      data: images.map((image, index) => ({
        projectId,
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId ?? null,
        caption: image.caption ?? null,
        order: image.order ?? index,
      })),
    }),

  getGalleryImage: (id: string) =>
    prisma.projectImage.findUnique({
      where: { id },
      include: { project: true },
    }),

  deleteGalleryImage: (id: string) =>
    prisma.projectImage.delete({ where: { id } }),

  delete: (id: string) => prisma.project.delete({ where: { id } }),

  toggleFeatured: (id: string, isFeatured: boolean) =>
    prisma.project.update({ where: { id }, data: { isFeatured } }),

  togglePublished: (id: string, isPublished: boolean) =>
    prisma.project.update({ where: { id }, data: { isPublished } }),

  createDonation: (data: ProjectDonationInput) =>
    prisma.projectDonation.create({
      data: {
        projectId: data.projectId,
        categoryId: data.categoryId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        quantity: data.quantity ?? 1,
        amount: data.amount ?? null,
        message: data.message ?? null,
      },
    }),

  getCategoryForDonation: (categoryId: string, projectId: string) =>
    prisma.projectCategory.findFirst({
      where: {
        id: categoryId,
        projectId,
        isActive: true,
        project: { isPublished: true },
      },
    }),

  listLeads: (filters?: {
    status?: string;
    projectId?: string;
    q?: string;
  }) => {
    const q = filters?.q?.trim();

    return prisma.projectDonation.findMany({
      where: {
        ...(filters?.status
          ? { status: filters.status as never }
          : undefined),
        ...(filters?.projectId ? { projectId: filters.projectId } : undefined),
        ...(q
          ? {
              OR: [
                { fullName: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { phone: { contains: q, mode: "insensitive" } },
              ],
            }
          : undefined),
      },
      orderBy: { createdAt: "desc" },
      include: {
        project: { select: { id: true, title: true, slug: true } },
        category: { select: { id: true, name: true } },
      },
    });
  },

  getLeadById: (id: string) =>
    prisma.projectDonation.findUnique({
      where: { id },
      include: {
        project: { select: { id: true, title: true, slug: true } },
        category: { select: { id: true, name: true, price: true, priceTo: true } },
      },
    }),

  updateLeadStatus: (id: string, status: string) =>
    prisma.projectDonation.update({
      where: { id },
      data: { status: status as never },
    }),

  countLeadsByStatus: (status: string) =>
    prisma.projectDonation.count({
      where: { status: status as never },
    }),
};
