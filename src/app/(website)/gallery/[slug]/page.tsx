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

  const description =
    collection.description ??
    `Photo collection: ${collection.title} from Al-Misbah Institute fieldwork.`;
  const cover =
    collection.coverImage ?? collection.images[0]?.imageUrl ?? undefined;

  return {
    title: collection.title,
    description,
    openGraph: {
      title: collection.title,
      description,
      type: "website",
      ...(cover
        ? {
            images: [{ url: cover, alt: collection.title }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: collection.title,
      description,
      ...(cover ? { images: [cover] } : {}),
    },
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
