import Image from "next/image";
import Link from "next/link";
import { deleteHeroSlide, toggleHeroSlideActive } from "@/actions/hero";
import { adminRoutes } from "@/lib/routes";
import type { HeroSlide } from "@/types";

type HeroSlidesTableProps = {
  slides: HeroSlide[];
};

export function HeroSlidesTable({ slides }: HeroSlidesTableProps) {
  if (slides.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No hero slides yet. Create your first slide to power the homepage carousel.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Preview</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide) => (
              <tr key={slide.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-14 w-24 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{slide.title}</p>
                  <p className="text-xs text-slate-500">{slide.subtitle}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{slide.order}</td>
                <td className="px-4 py-3">
                  <form action={toggleHeroSlideActive.bind(null, slide.id, !slide.isActive)}>
                    <button
                      type="submit"
                      className={[
                        "rounded-full px-3 py-1 text-xs font-medium",
                        slide.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {slide.isActive ? "Active" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`${adminRoutes.hero}/${slide.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <form action={deleteHeroSlide.bind(null, slide.id)}>
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
