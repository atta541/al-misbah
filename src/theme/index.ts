/**
 * Website theme metadata and preset list.
 * Color values live in `presets.ts`.
 * Active theme is stored in the database (`SiteSettings.themePreset`)
 * and can be changed from Admin → Settings.
 *
 * `website-theme.css` keeps fallback colors for first load / dev only.
 */
export const WEBSITE_THEME = {
  id: "emerald-trust",
  name: "Emerald Trust",
  description:
    "Deep green with warm gold accents — trustworthy, calm, and suited for NGO work.",
} as const;

export type WebsiteThemeId =
  | "emerald-trust"
  | "navy-hope"
  | "sage-community"
  | "teal-light"
  | "burgundy-dignity";

export const WEBSITE_THEME_PRESETS: Array<{
  id: WebsiteThemeId;
  name: string;
  description: string;
}> = [
  {
    id: "emerald-trust",
    name: "Emerald Trust",
    description: "Deep green + gold on warm cream",
  },
  {
    id: "navy-hope",
    name: "Navy Hope",
    description: "Navy blue + bright blue accent",
  },
  {
    id: "sage-community",
    name: "Sage Community",
    description: "Earthy sage green + amber accent",
  },
  {
    id: "teal-light",
    name: "Teal Light",
    description: "Fresh teal + amber on white",
  },
  {
    id: "burgundy-dignity",
    name: "Burgundy Dignity",
    description: "Burgundy + gold on cream",
  },
];

export {
  DEFAULT_WEBSITE_THEME_ID,
  getWebsiteThemeTokens,
  isWebsiteThemeId,
  themeTokensToCssVariables,
  websiteThemePresets,
  type WebsiteThemeTokens,
} from "./presets";
