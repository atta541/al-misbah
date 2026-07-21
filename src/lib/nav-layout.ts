/** Shared navbar + hero layout tokens (also defined as CSS vars on `.website`). */

export const NAV_TOP_BAR_HEIGHT = "6.5rem";
export const NAV_MAIN_HEIGHT = "5.5rem";

export const NAV_TOP_BAR_SPACER_CLASS = "h-[var(--nav-top-bar-height)] shrink-0";

export const NAV_MAIN_POSITION_CLASS =
  "absolute inset-x-0 top-[var(--nav-main-top)] px-3 sm:px-5 lg:px-6";

export const HERO_CONTENT_OFFSET_CLASS = "pt-[var(--hero-content-top)]";

/**
 * Mobile: aspect-ratio matches designed hero frames (1920×900 ≈ 32/15)
 * so object-cover fills edge-to-edge without letterboxing.
 * Desktop: near full viewport height.
 */
export const HERO_MIN_HEIGHT_CLASS =
  "aspect-[32/15] min-h-[14rem] sm:aspect-auto sm:min-h-[calc(100svh-var(--nav-top-bar-height))]";

/** Top padding so page text clears the overlapping main navbar. */
export const PAGE_CONTENT_OFFSET_CLASS =
  "pt-[calc(var(--nav-main-overlap)+1.5rem)]";
