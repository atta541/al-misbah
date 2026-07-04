import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { GalleryCollectionsTable } from "@/components/admin/gallery-collections-table";
import { adminNavItems } from "@/components/admin/nav-config";
import { adminRoutes } from "@/lib/routes";
import { galleryService } from "@/services/gallery.service";

const page = adminNavItems.find((item) => item.href === adminRoutes.gallery)!;

export default async function AdminGalleryPage() {
  const collections = await galleryService.listCollections();

  return (
    <AdminPageShell description={page.description}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {collections.length} collection{collections.length === 1 ? "" : "s"}
        </p>
        <Link
          href={`${adminRoutes.gallery}/new`}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Add collection
        </Link>
      </div>
      <GalleryCollectionsTable collections={collections} />
    </AdminPageShell>
  );
}
