import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { HeroSlidesTable } from "@/components/admin/hero-slides-table";
import { adminNavItems } from "@/components/admin/nav-config";
import { adminRoutes } from "@/lib/routes";
import { HERO_IMAGE_RECOMMENDATION } from "@/lib/hero";
import { heroService } from "@/services/hero.service";

const page = adminNavItems.find((item) => item.href === adminRoutes.hero)!;

export default async function AdminHeroPage() {
  const slides = await heroService.listAll();

  return (
    <AdminPageShell description={page.description}>
      <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Recommended hero image size: <strong>{HERO_IMAGE_RECOMMENDATION}</strong> (full-width
        cover). Minimum 1280 × 720 px.
      </p>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {slides.length} slide{slides.length === 1 ? "" : "s"} configured
        </p>
        <Link
          href={`${adminRoutes.hero}/new`}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Add hero slide
        </Link>
      </div>
      <HeroSlidesTable slides={slides} />
    </AdminPageShell>
  );
}
