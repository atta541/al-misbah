import { GalleryPageContent } from "@/components/website/gallery-page-content";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { createPageMetadata } from "@/lib/seo";
import { galleryService } from "@/services/gallery.service";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Photo collections from Al-Misbah Institute fieldwork — water projects, education programs, relief distributions, and community events across Pakistan.",
  path: "/gallery",
});

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
