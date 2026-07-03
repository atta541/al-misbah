import {
  getWebsiteThemeTokens,
  themeTokensToCssVariables,
} from "@/theme/presets";

type DynamicWebsiteThemeProps = {
  themePreset?: string | null;
};

export function DynamicWebsiteTheme({ themePreset }: DynamicWebsiteThemeProps) {
  const tokens = getWebsiteThemeTokens(themePreset);
  const css = themeTokensToCssVariables(tokens);

  return <style id="website-theme">{css}</style>;
}
