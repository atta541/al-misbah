import type { WebsiteThemeTokens } from "@/theme/presets";
import { getWebsiteThemeTokens } from "@/theme/presets";

/** User-editable color fields (hex). Other tokens are derived. */
export type CustomThemeColors = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  footerBg: string;
  footerText: string;
  footerMuted: string;
};

export const CUSTOM_THEME_FIELDS: Array<{
  key: keyof CustomThemeColors;
  label: string;
  hint: string;
}> = [
  { key: "primary", label: "Primary", hint: "Buttons, links, brand" },
  { key: "accent", label: "Accent", hint: "Highlights, top bar" },
  { key: "background", label: "Background", hint: "Page background" },
  { key: "surface", label: "Surface", hint: "Cards & panels" },
  { key: "surfaceMuted", label: "Muted surface", hint: "Subtle sections" },
  { key: "text", label: "Text", hint: "Main body text" },
  { key: "textMuted", label: "Muted text", hint: "Secondary text" },
  { key: "border", label: "Border", hint: "Dividers & outlines" },
  { key: "footerBg", label: "Footer background", hint: "Footer base" },
  { key: "footerText", label: "Footer text", hint: "Footer primary text" },
  { key: "footerMuted", label: "Footer muted", hint: "Footer secondary" },
];

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

export function isHexColor(value: string): boolean {
  return HEX_RE.test(value.trim());
}

export function normalizeHex(value: string): string | null {
  const raw = value.trim();
  if (HEX_RE.test(raw)) return raw.toLowerCase();
  if (/^[0-9a-fA-F]{6}$/.test(raw)) return `#${raw.toLowerCase()}`;
  return null;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const n = normalized.slice(1);
  return {
    r: Number.parseInt(n.slice(0, 2), 16),
    g: Number.parseInt(n.slice(2, 4), 16),
    b: Number.parseInt(n.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(hex: string, target: string, amount: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  if (!a || !b) return hex;
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount,
  );
}

export function getDefaultCustomColors(): CustomThemeColors {
  const base = getWebsiteThemeTokens("slate-clarity");
  return {
    primary: base.primary,
    accent: base.accent,
    background: base.background,
    surface: base.surface,
    surfaceMuted: base.surfaceMuted,
    text: base.text,
    textMuted: base.textMuted,
    border: base.border,
    footerBg: base.footerBg,
    footerText: base.footerText,
    footerMuted: base.footerMuted,
  };
}

export function parseCustomThemeColors(value: unknown): CustomThemeColors | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const defaults = getDefaultCustomColors();
  const next = { ...defaults };

  for (const field of CUSTOM_THEME_FIELDS) {
    const raw = record[field.key];
    if (typeof raw !== "string") continue;
    const hex = normalizeHex(raw);
    if (hex) next[field.key] = hex;
  }

  return next;
}

export function buildTokensFromCustomColors(
  colors: CustomThemeColors,
): WebsiteThemeTokens {
  const primary = colors.primary;
  const accent = colors.accent;

  return {
    primary,
    primaryLight: mixHex(primary, "#ffffff", 0.18),
    primaryDark: mixHex(primary, "#000000", 0.22),
    primaryForeground: "#ffffff",
    accent,
    accentLight: mixHex(accent, "#ffffff", 0.18),
    accentDark: mixHex(accent, "#000000", 0.18),
    accentForeground: "#ffffff",
    background: colors.background,
    surface: colors.surface,
    surfaceMuted: colors.surfaceMuted,
    surfaceDark: colors.footerBg,
    text: colors.text,
    textMuted: colors.textMuted,
    textInverse: "#ffffff",
    textOnPrimary: "#ffffff",
    border: colors.border,
    borderStrong: mixHex(colors.border, "#000000", 0.12),
    ring: accent,
    headerBg: colors.surface,
    headerText: colors.text,
    footerBg: colors.footerBg,
    footerText: colors.footerText,
    footerMuted: colors.footerMuted,
    success: "#15803d",
    error: "#b91c1c",
    warning: "#c2410c",
  };
}
