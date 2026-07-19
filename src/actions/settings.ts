"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { adminRoutes, websiteRoutes } from "@/lib/routes";
import { siteSettingsService } from "@/services";
import { isWebsiteThemeId } from "@/theme";
import {
  CUSTOM_THEME_FIELDS,
  normalizeHex,
  type CustomThemeColors,
} from "@/theme/custom-theme";

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

  if (themePreset === "custom") {
    const colors = {} as CustomThemeColors;
    const missing: string[] = [];

    for (const field of CUSTOM_THEME_FIELDS) {
      const hex = normalizeHex(String(formData.get(`custom_${field.key}`) ?? ""));
      if (!hex) {
        missing.push(field.label);
        continue;
      }
      colors[field.key] = hex;
    }

    if (missing.length > 0) {
      return {
        error: `Invalid color for: ${missing.join(", ")}. Use hex like #334155.`,
      };
    }

    await siteSettingsService.updateTheme("custom", colors);
  } else {
    await siteSettingsService.updateTheme(themePreset);
  }

  revalidatePath(websiteRoutes.home, "layout");
  revalidatePath(adminRoutes.settings);

  return { success: true };
}
