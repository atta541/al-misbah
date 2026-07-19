import { GalleryPageContent } from "@/components/website/gallery-page-content";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { galleryService } from "@/services/gallery.service";

export const revalidate = 3600;

export default async function GalleryPage() {
  const collections = await galleryService.listCollections();

  return (
    <section className={`bg-white pb-14 sm:pb-20 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GalleryPageContent collections={collections} />
      </div>
    </section>
  );
}
