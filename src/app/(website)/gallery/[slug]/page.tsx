import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GalleryMasonry } from "@/components/website/gallery-masonry";
import { websiteRoutes } from "@/lib/routes";
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

  const cover =
    collection.coverImage ?? collection.images[0]?.imageUrl ?? null;

  return (
    <article className="bg-white pb-16 sm:pb-24">
      <div className="relative min-h-[14rem] overflow-hidden bg-brand-dark sm:min-h-[18rem]">
        {cover ? (
          <Image
            src={cover}
            alt={collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-brand-dark/30" />
        <div className="relative mx-auto flex min-h-[14rem] max-w-7xl flex-col justify-end px-4 pb-8 sm:min-h-[18rem] sm:px-6 lg:px-8">
          <Link
            href={websiteRoutes.gallery}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            All collections
          </Link>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {collection.title}
          </h1>
          {collection.description ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
              {collection.description}
            </p>
          ) : null}
          <p className="mt-3 text-sm text-white/70">
            {collection.images.length} photo
            {collection.images.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <GalleryMasonry
          images={collection.images}
          collectionTitle={collection.title}
        />
      </div>
    </article>
  );
}
