import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { HomeVideoForm } from "@/components/admin/home-video-form";
import { adminNavItems } from "@/components/admin/nav-config";
import { HOME_VIDEO_UPLOAD_HINT } from "@/lib/home-video";
import { adminRoutes } from "@/lib/routes";
import { homeVideoService } from "@/services/home-video.service";

const page = adminNavItems.find((item) => item.href === adminRoutes.homeVideo)!;

export default async function AdminHomeVideoPage() {
  const video = await homeVideoService.getSingleton();

  return (
    <AdminPageShell description={page.description}>
      <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Upload one introduction video for the homepage. {HOME_VIDEO_UPLOAD_HINT}{" "}
        The file goes straight to Cloudinary from your browser (faster and more
        reliable in production). Replacing or removing deletes the previous file.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <HomeVideoForm video={video} />
      </div>
    </AdminPageShell>
  );
}
