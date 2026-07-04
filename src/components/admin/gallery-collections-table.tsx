import Image from "next/image";
import Link from "next/link";
import { deleteGalleryCollection } from "@/actions/gallery";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import type { GalleryCollection, GalleryImage } from "@/types";

type GalleryCollectionsTableProps = {
  collections: (GalleryCollection & { images: GalleryImage[] })[];
};

export function GalleryCollectionsTable({
  collections,
}: GalleryCollectionsTableProps) {
  if (collections.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No gallery collections yet. Create your first album for the public gallery page.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Cover</th>
              <th className="px-4 py-3 font-medium">Collection</th>
              <th className="px-4 py-3 font-medium">Photos</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr
                key={collection.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-3">
                  <div className="relative h-14 w-24 overflow-hidden rounded-lg bg-slate-100">
                    {collection.coverImage ? (
                      <Image
                        src={collection.coverImage}
                        alt={collection.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No cover
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{collection.title}</p>
                  <p className="text-xs text-slate-500">/{collection.slug}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {collection.images.length}
                </td>
                <td className="px-4 py-3 text-slate-600">{collection.order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`${websiteRoutes.gallery}/${collection.slug}`}
                      target="_blank"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`${adminRoutes.gallery}/${collection.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <form action={deleteGalleryCollection.bind(null, collection.id)}>
                      <button
                        type="submit"
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
