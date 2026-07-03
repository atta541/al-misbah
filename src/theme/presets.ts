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

export const DEFAULT_WEBSITE_THEME_ID: WebsiteThemeId = "emerald-trust";

export const websiteThemePresets: Record<WebsiteThemeId, WebsiteThemeTokens> = {
  "emerald-trust": {
    primary: "#0f5c4c",
    primaryLight: "#1a7a66",
    primaryDark: "#0a4036",
    primaryForeground: "#ffffff",
    accent: "#c9a227",
    accentLight: "#dbb94a",
    accentDark: "#a8841a",
    accentForeground: "#1c1917",
    background: "#faf8f5",
    surface: "#ffffff",
    surfaceMuted: "#f3f0ea",
    surfaceDark: "#0f5c4c",
    text: "#1c1917",
    textMuted: "#57534e",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e7e5e4",
    borderStrong: "#d6d3d1",
    ring: "#1a7a66",
    headerBg: "#ffffff",
    headerText: "#1c1917",
    footerBg: "#0a4036",
    footerText: "#e7e5e4",
    footerMuted: "#a8a29e",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#b45309",
  },
  "navy-hope": {
    primary: "#1e3a5f",
    primaryLight: "#2d5282",
    primaryDark: "#142840",
    primaryForeground: "#ffffff",
    accent: "#3b82f6",
    accentLight: "#60a5fa",
    accentDark: "#2563eb",
    accentForeground: "#ffffff",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    surfaceDark: "#142840",
    text: "#0f172a",
    textMuted: "#475569",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    ring: "#3b82f6",
    headerBg: "#ffffff",
    headerText: "#0f172a",
    footerBg: "#142840",
    footerText: "#cbd5e1",
    footerMuted: "#94a3b8",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#b45309",
  },
  "sage-community": {
    primary: "#4a6741",
    primaryLight: "#5f8254",
    primaryDark: "#364d2f",
    primaryForeground: "#ffffff",
    accent: "#d97706",
    accentLight: "#f59e0b",
    accentDark: "#b45309",
    accentForeground: "#ffffff",
    background: "#f7f6f2",
    surface: "#ffffff",
    surfaceMuted: "#eeede6",
    surfaceDark: "#364d2f",
    text: "#292524",
    textMuted: "#57534e",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#e7e5e4",
    borderStrong: "#d6d3d1",
    ring: "#5f8254",
    headerBg: "#ffffff",
    headerText: "#292524",
    footerBg: "#364d2f",
    footerText: "#e7e5e4",
    footerMuted: "#a8a29e",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#b45309",
  },
  "teal-light": {
    primary: "#0d9488",
    primaryLight: "#14b8a6",
    primaryDark: "#0f766e",
    primaryForeground: "#ffffff",
    accent: "#f59e0b",
    accentLight: "#fbbf24",
    accentDark: "#d97706",
    accentForeground: "#1c1917",
    background: "#ffffff",
    surface: "#ffffff",
    surfaceMuted: "#f0fdfa",
    surfaceDark: "#0f766e",
    text: "#134e4a",
    textMuted: "#5f6b6a",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#ccfbf1",
    borderStrong: "#99f6e4",
    ring: "#14b8a6",
    headerBg: "#ffffff",
    headerText: "#134e4a",
    footerBg: "#0f766e",
    footerText: "#ccfbf1",
    footerMuted: "#99f6e4",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#b45309",
  },
  "burgundy-dignity": {
    primary: "#7f1d1d",
    primaryLight: "#991b1b",
    primaryDark: "#5f1515",
    primaryForeground: "#ffffff",
    accent: "#ca8a04",
    accentLight: "#eab308",
    accentDark: "#a16207",
    accentForeground: "#1c1917",
    background: "#fffbeb",
    surface: "#ffffff",
    surfaceMuted: "#fef3c7",
    surfaceDark: "#5f1515",
    text: "#292524",
    textMuted: "#57534e",
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: "#fde68a",
    borderStrong: "#fcd34d",
    ring: "#991b1b",
    headerBg: "#ffffff",
    headerText: "#292524",
    footerBg: "#5f1515",
    footerText: "#fde68a",
    footerMuted: "#d6d3d1",
    success: "#15803d",
    error: "#b91c1c",
    warning: "#b45309",
  },
};

export function isWebsiteThemeId(value: string): value is WebsiteThemeId {
  return value in websiteThemePresets;
}

export function getWebsiteThemeTokens(themeId?: string | null) {
  if (themeId && isWebsiteThemeId(themeId)) {
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
