import { notFound } from "next/navigation";
import { GalleryCollectionContent } from "@/components/website/gallery-collection-content";
import { galleryService } from "@/services/gallery.service";

export const revalidate = 3600;

type GalleryCollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const collections = await galleryService.listPublishedSlugs();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: GalleryCollectionPageProps) {
  const { slug } = await params;
  const collection = await galleryService.getBySlug(slug);

  if (!collection) {
    return { title: "Gallery not found" };
  }

  return {
    title: `${collection.title} | Gallery | Al-Misbah Center`,
    description:
      collection.description ??
      `Photo collection: ${collection.title} at Al-Misbah Center.`,
  };
}

export default async function GalleryCollectionPage({
  params,
}: GalleryCollectionPageProps) {
  const { slug } = await params;
  const collection = await galleryService.getBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <GalleryCollectionContent
      title={collection.title}
      description={collection.description}
      images={collection.images}
    />
  );
}
