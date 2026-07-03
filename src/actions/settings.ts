"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { siteSettingsService } from "@/services";
import { isWebsiteThemeId } from "@/theme";

export type ThemeUpdateState = {
  success?: boolean;
  error?: string;
};

export async function updateWebsiteTheme(
  _prevState: ThemeUpdateState | null,
  formData: FormData,
): Promise<ThemeUpdateState> {
  const session = await getSession();

  if (!session) {
    redirect(adminRoutes.login);
  }

  const themePreset = String(formData.get("themePreset") ?? "");

  if (!isWebsiteThemeId(themePreset)) {
    return { error: "Please select a valid theme." };
  }

  await siteSettingsService.updateThemePreset(themePreset);

  revalidatePath(websiteRoutes.home, "layout");
  revalidatePath(adminRoutes.settings);

  return { success: true };
}
