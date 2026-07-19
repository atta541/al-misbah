import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ThemePicker } from "@/components/admin/theme-picker";
import { adminNavItems } from "@/components/admin/nav-config";
import { siteSettingsService } from "@/services";
import {
  DEFAULT_WEBSITE_THEME_ID,
  isWebsiteThemeId,
  type WebsiteThemeId,
} from "@/theme";

const page = adminNavItems.find((item) => item.href === "/admin/settings")!;

export default async function AdminSettingsPage() {
  const settings = await siteSettingsService.getOrCreate();
  const activeThemeId: WebsiteThemeId = isWebsiteThemeId(settings.themePreset)
    ? settings.themePreset
    : DEFAULT_WEBSITE_THEME_ID;

  return (
    <AdminPageShell description={page.description}>
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Website Theme</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose a color scheme for the public website. Changes apply
            instantly to all visitor pages after saving.
          </p>
          <div className="mt-6">
            <ThemePicker
              activeThemeId={activeThemeId}
              initialCustomColors={settings.themeCustom}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          General site settings (logo, contact info, social links) coming next.
        </section>
      </div>
    </AdminPageShell>
  );
}
