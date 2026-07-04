import Link from "next/link";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { adminRoutes } from "@/lib/routes";

export default function AdminHeroNewPage() {
  return (
    <AdminPageShell description="Upload a homepage hero image.">
      <div className="mb-5">
        <Link
          href={adminRoutes.hero}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Back to hero slides
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <HeroSlideForm mode="create" />
      </div>
    </AdminPageShell>
  );
}
