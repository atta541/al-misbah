/**
 * Website theme metadata and preset list.
 * Color values live in `presets.ts`.
 * Active theme is stored in the database (`SiteSettings.themePreset`)
 * and can be changed from Admin → Settings.
 *
 * `website-theme.css` keeps fallback colors for first load / dev only.
 */
export const WEBSITE_THEME = {
  id: "slate-clarity",
  name: "Slate Clarity",
  description:
    "Cool slate with sky accents — clean, modern, and easy on the eyes.",
} as const;

export type WebsiteThemeId =
  | "slate-clarity"
  | "ink-copper"
  | "ocean-rose"
  | "graphite-blush"
  | "clay-horizon"
  | "midnight-linen"
  | "arctic-ember"
  | "custom";

export const WEBSITE_THEME_PRESETS: Array<{
  id: WebsiteThemeId;
  name: string;
  description: string;
}> = [
  {
    id: "slate-clarity",
    name: "Slate Clarity",
    description: "Cool slate + sky blue on crisp white",
  },
  {
    id: "ink-copper",
    name: "Ink & Copper",
    description: "Near-black ink with warm copper highlights",
  },
  {
    id: "ocean-rose",
    name: "Ocean Rose",
    description: "Deep ocean blue with soft rose accents",
  },
  {
    id: "graphite-blush",
    name: "Graphite Blush",
    description: "Charcoal graphite with dusty blush",
  },
  {
    id: "clay-horizon",
    name: "Clay Horizon",
    description: "Warm clay brown with soft horizon blue",
  },
  {
    id: "midnight-linen",
    name: "Midnight Linen",
    description: "Midnight indigo with linen sand accents",
  },
  {
    id: "arctic-ember",
    name: "Arctic Ember",
    description: "Cool charcoal with ember orange accents",
  },
  {
    id: "custom",
    name: "Custom colors",
    description: "Pick your own hex / RGB colors below",
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

export {
  buildTokensFromCustomColors,
  getDefaultCustomColors,
  parseCustomThemeColors,
  type CustomThemeColors,
} from "./custom-theme";
