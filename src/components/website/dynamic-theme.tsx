import {
  buildTokensFromCustomColors,
  parseCustomThemeColors,
} from "@/theme/custom-theme";
import {
  getWebsiteThemeTokens,
  themeTokensToCssVariables,
} from "@/theme/presets";

type DynamicWebsiteThemeProps = {
  themePreset?: string | null;
  themeCustom?: unknown;
};

export function DynamicWebsiteTheme({
  themePreset,
  themeCustom,
}: DynamicWebsiteThemeProps) {
  const customColors =
    themePreset === "custom" ? parseCustomThemeColors(themeCustom) : null;
  const tokens = customColors
    ? buildTokensFromCustomColors(customColors)
    : getWebsiteThemeTokens(themePreset);
  const css = themeTokensToCssVariables(tokens);

  return <style id="website-theme">{css}</style>;
}
