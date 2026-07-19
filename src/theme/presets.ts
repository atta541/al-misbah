import type { WebsiteThemeId } from "@/theme/index";

export type WebsiteThemeTokens = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryForeground: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  accentForeground: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceDark: string;
  text: string;
  textMuted: string;
  textInverse: string;
  textOnPrimary: string;
  border: string;
  borderStrong: string;
  ring: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerText: string;
  footerMuted: string;
  success: string;
  error: string;
  warning: string;
};

export const DEFAULT_WEBSITE_THEME_ID: Exclude<WebsiteThemeId, "custom"> =
  "slate-clarity";

export const websiteThemePresets: Record<
  Exclude<WebsiteThemeId, "custom">,
  WebsiteThemeTokens
> = {
  "slate-clarity": {
    primary: "#334155",
    primaryLight: "#475569",
    primaryDark: "#1e293b",
    primaryForeground: "#ffffff",
    accent: "#0284c7",
    accentLight: "#0ea5e9",
    accentDark: "#0369a1",
    accentForeground: "#ffffff",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    surfaceDark: "#1e293b",
    text: "#0f172a",
    textMuted: "#64748b",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    ring: "#0ea5e9",
    headerBg: "#ffffff",
    headerText: "#0f172a",
    footerBg: "#0f172a",
    footerText: "#e2e8f0",
    footerMuted: "#94a3b8",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "ink-copper": {
    primary: "#1c1917",
    primaryLight: "#292524",
    primaryDark: "#0c0a09",
    primaryForeground: "#ffffff",
    accent: "#c2783b",
    accentLight: "#d4925a",
    accentDark: "#a3622f",
    accentForeground: "#ffffff",
    background: "#fafafa",
    surface: "#ffffff",
    surfaceMuted: "#f4f4f5",
    surfaceDark: "#171717",
    text: "#18181b",
    textMuted: "#71717a",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e4e4e7",
    borderStrong: "#d4d4d8",
    ring: "#c2783b",
    headerBg: "#ffffff",
    headerText: "#18181b",
    footerBg: "#171717",
    footerText: "#e4e4e7",
    footerMuted: "#a1a1aa",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "ocean-rose": {
    primary: "#164e63",
    primaryLight: "#155e75",
    primaryDark: "#083344",
    primaryForeground: "#ffffff",
    accent: "#e11d48",
    accentLight: "#f43f5e",
    accentDark: "#be123c",
    accentForeground: "#ffffff",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#ecfeff",
    surfaceDark: "#083344",
    text: "#0f172a",
    textMuted: "#64748b",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    ring: "#e11d48",
    headerBg: "#ffffff",
    headerText: "#0f172a",
    footerBg: "#083344",
    footerText: "#cffafe",
    footerMuted: "#67e8f9",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "graphite-blush": {
    primary: "#3f3f46",
    primaryLight: "#52525b",
    primaryDark: "#27272a",
    primaryForeground: "#ffffff",
    accent: "#b76e79",
    accentLight: "#c98a93",
    accentDark: "#9a5a64",
    accentForeground: "#ffffff",
    background: "#fafafa",
    surface: "#ffffff",
    surfaceMuted: "#f4f4f5",
    surfaceDark: "#18181b",
    text: "#18181b",
    textMuted: "#71717a",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e4e4e7",
    borderStrong: "#d4d4d8",
    ring: "#b76e79",
    headerBg: "#ffffff",
    headerText: "#18181b",
    footerBg: "#18181b",
    footerText: "#f4f4f5",
    footerMuted: "#a1a1aa",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "clay-horizon": {
    primary: "#6b4f3a",
    primaryLight: "#826148",
    primaryDark: "#4a3527",
    primaryForeground: "#ffffff",
    accent: "#4a6fa5",
    accentLight: "#6b8db8",
    accentDark: "#3a5884",
    accentForeground: "#ffffff",
    background: "#f7f5f2",
    surface: "#ffffff",
    surfaceMuted: "#efebe6",
    surfaceDark: "#4a3527",
    text: "#1c1917",
    textMuted: "#78716c",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e7e5e4",
    borderStrong: "#d6d3d1",
    ring: "#4a6fa5",
    headerBg: "#ffffff",
    headerText: "#1c1917",
    footerBg: "#3d2e24",
    footerText: "#f5f5f4",
    footerMuted: "#a8a29e",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "midnight-linen": {
    primary: "#312e81",
    primaryLight: "#4338ca",
    primaryDark: "#1e1b4b",
    primaryForeground: "#ffffff",
    accent: "#c4b59a",
    accentLight: "#d6c9b3",
    accentDark: "#a8977c",
    accentForeground: "#1c1917",
    background: "#f7f7f5",
    surface: "#ffffff",
    surfaceMuted: "#f0efec",
    surfaceDark: "#1e1b4b",
    text: "#1e1b4b",
    textMuted: "#64748b",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e4e4e7",
    borderStrong: "#d4d4d8",
    ring: "#4338ca",
    headerBg: "#ffffff",
    headerText: "#1e1b4b",
    footerBg: "#1e1b4b",
    footerText: "#e0e7ff",
    footerMuted: "#a5b4fc",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
  "arctic-ember": {
    primary: "#1f2937",
    primaryLight: "#374151",
    primaryDark: "#111827",
    primaryForeground: "#ffffff",
    accent: "#ea580c",
    accentLight: "#f97316",
    accentDark: "#c2410c",
    accentForeground: "#ffffff",
    background: "#ffffff",
    surface: "#ffffff",
    surfaceMuted: "#f3f4f6",
    surfaceDark: "#111827",
    text: "#111827",
    textMuted: "#6b7280",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e5e7eb",
    borderStrong: "#d1d5db",
    ring: "#f97316",
    headerBg: "#ffffff",
    headerText: "#111827",
    footerBg: "#111827",
    footerText: "#f3f4f6",
    footerMuted: "#9ca3af",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  },
};

export function isWebsiteThemeId(value: string): value is WebsiteThemeId {
  return (
    value === "custom" ||
    Object.prototype.hasOwnProperty.call(websiteThemePresets, value)
  );
}

export function isPresetThemeId(
  value: string,
): value is Exclude<WebsiteThemeId, "custom"> {
  return Object.prototype.hasOwnProperty.call(websiteThemePresets, value);
}

export function getWebsiteThemeTokens(themeId?: string | null) {
  if (themeId && isPresetThemeId(themeId)) {
    return websiteThemePresets[themeId];
  }

  return websiteThemePresets[DEFAULT_WEBSITE_THEME_ID];
}

export function themeTokensToCssVariables(tokens: WebsiteThemeTokens) {
  return `
:root {
  --theme-primary: ${tokens.primary};
  --theme-primary-light: ${tokens.primaryLight};
  --theme-primary-dark: ${tokens.primaryDark};
  --theme-primary-foreground: ${tokens.primaryForeground};
  --theme-accent: ${tokens.accent};
  --theme-accent-light: ${tokens.accentLight};
  --theme-accent-dark: ${tokens.accentDark};
  --theme-accent-foreground: ${tokens.accentForeground};
  --theme-background: ${tokens.background};
  --theme-surface: ${tokens.surface};
  --theme-surface-muted: ${tokens.surfaceMuted};
  --theme-surface-dark: ${tokens.surfaceDark};
  --theme-text: ${tokens.text};
  --theme-text-muted: ${tokens.textMuted};
  --theme-text-inverse: ${tokens.textInverse};
  --theme-text-on-primary: ${tokens.textOnPrimary};
  --theme-border: ${tokens.border};
  --theme-border-strong: ${tokens.borderStrong};
  --theme-ring: ${tokens.ring};
  --theme-header-bg: ${tokens.headerBg};
  --theme-header-text: ${tokens.headerText};
  --theme-footer-bg: ${tokens.footerBg};
  --theme-footer-text: ${tokens.footerText};
  --theme-footer-muted: ${tokens.footerMuted};
  --theme-success: ${tokens.success};
  --theme-error: ${tokens.error};
  --theme-warning: ${tokens.warning};
}`.trim();
}
