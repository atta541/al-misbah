import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { adminRoutes } from "@/lib/routes";
import { heroService } from "@/services/hero.service";

type AdminHeroEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminHeroEditPage({ params }: AdminHeroEditPageProps) {
  const { id } = await params;
  const slide = await heroService.getById(id);

  if (!slide) {
    notFound();
  }

  return (
    <AdminPageShell description="Replace the homepage hero image or change visibility.">
      <div className="mb-5">
        <Link
          href={adminRoutes.hero}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to hero slides
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <HeroSlideForm mode="edit" slide={slide} />
      </div>
    </AdminPageShell>
  );
}
