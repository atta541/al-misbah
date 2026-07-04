import { GalleryCollectionCard } from "@/components/website/gallery-collection-card";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { galleryService } from "@/services/gallery.service";

export const revalidate = 3600;

export default async function GalleryPage() {
  const collections = await galleryService.listCollections();

  return (
    <section className={`bg-white pb-14 sm:pb-20 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Our Gallery
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Moments from the field
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Browse photo collections from our humanitarian work, community events,
            and relief activities.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center text-sm text-muted">
            Gallery albums will appear here once created from the admin panel.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <GalleryCollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
