import type { MetadataRoute } from "next";
import { websiteRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";
import { galleryService } from "@/services/gallery.service";
import { projectService } from "@/services/project.service";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, collections] = await Promise.all([
    projectService.listPublishedSlugs(),
    galleryService.listPublishedSlugs(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(websiteRoutes.home),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(websiteRoutes.about),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(websiteRoutes.projects),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(websiteRoutes.gallery),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(websiteRoutes.donate),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(websiteRoutes.contact),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl(websiteRoutes.privacyPolicy),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl(websiteRoutes.terms),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`${websiteRoutes.projects}/${project.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const galleryPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: absoluteUrl(`${websiteRoutes.gallery}/${collection.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...galleryPages];
}
