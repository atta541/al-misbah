import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { GalleryCollectionForm } from "@/components/admin/gallery-collection-form";
import { adminRoutes } from "@/lib/routes";

export default function AdminGalleryNewPage() {
  return (
    <AdminPageShell description="Create a new photo album for the public gallery.">
      <div className="mb-5">
        <Link
          href={adminRoutes.gallery}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to gallery
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <GalleryCollectionForm mode="create" />
      </div>
    </AdminPageShell>
  );
}
