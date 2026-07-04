import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { GalleryCollectionForm } from "@/components/admin/gallery-collection-form";
import { adminRoutes } from "@/lib/routes";
import { galleryService } from "@/services/gallery.service";

type AdminGalleryEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminGalleryEditPage({
  params,
}: AdminGalleryEditPageProps) {
  const { id } = await params;
  const collection = await galleryService.getById(id);

  if (!collection) {
    notFound();
  }

  return (
    <AdminPageShell description="Update collection details and manage gallery photos.">
      <div className="mb-5">
        <Link
          href={adminRoutes.gallery}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to gallery
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <GalleryCollectionForm mode="edit" collection={collection} />
      </div>
    </AdminPageShell>
  );
}
