import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { websiteRoutes } from "@/lib/routes";
import type { GalleryCollection, GalleryImage } from "@/types";

type GalleryCollectionCardProps = {
  collection: GalleryCollection & { images: GalleryImage[] };
};

export function GalleryCollectionCard({ collection }: GalleryCollectionCardProps) {
  const cover =
    collection.coverImage ?? collection.images[0]?.imageUrl ?? null;

  return (
    <Link
      href={`${websiteRoutes.gallery}/${collection.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-white shadow-[0_16px_40px_-28px_rgba(15,92,76,0.4)] transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_24px_50px_-24px_rgba(15,92,76,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        {cover ? (
          <Image
            src={cover}
            alt={collection.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <Images className="h-10 w-10 opacity-40" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {collection.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand">
          {collection.images.length} photo
          {collection.images.length === 1 ? "" : "s"}
        </p>
        {collection.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {collection.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
