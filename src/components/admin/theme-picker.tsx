"use client";

import { useActionState, useEffect, useState } from "react";
import { updateWebsiteTheme, type ThemeUpdateState } from "@/actions/settings";
import type { WebsiteThemeId } from "@/theme";
import { WEBSITE_THEME_PRESETS, websiteThemePresets } from "@/theme";

type ThemePickerProps = {
  activeThemeId: WebsiteThemeId;
};

export function ThemePicker({ activeThemeId }: ThemePickerProps) {
  const [selectedId, setSelectedId] = useState<WebsiteThemeId>(activeThemeId);
  const [state, formAction, isPending] = useActionState<
    ThemeUpdateState | null,
    FormData
  >(updateWebsiteTheme, null);

  useEffect(() => {
    setSelectedId(activeThemeId);
  }, [activeThemeId]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {WEBSITE_THEME_PRESETS.map((preset) => {
          const tokens = websiteThemePresets[preset.id];
          const isSelected = preset.id === selectedId;
          const isSaved = preset.id === activeThemeId;

          return (
            <label
              key={preset.id}
              className={[
                "block cursor-pointer rounded-2xl border p-4 transition",
                isSelected
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              ].join(" ")}
            >
              <input
                type="radio"
                name="themePreset"
                value={preset.id}
                checked={isSelected}
                onChange={() => setSelectedId(preset.id)}
                className="sr-only"
              />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{preset.name}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {preset.description}
                  </p>
                </div>
                {isSaved ? (
                  <span className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-white">
                    Live
                  </span>
                ) : null}
              </div>

              <div className="mt-4 flex gap-2">
                {[tokens.primary, tokens.accent, tokens.background, tokens.footerBg].map(
                  (color) => (
                    <span
                      key={color}
                      className="h-8 flex-1 rounded-lg border border-black/5"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ),
                )}
              </div>

              {isSelected && !isSaved ? (
                <p className="mt-3 text-xs font-medium text-emerald-700">
                  Selected — click Save to apply
                </p>
              ) : null}
            </label>
          );
        })}
      </div>

      {state?.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {state?.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Theme updated. Open the public website to preview the new colors.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending || selectedId === activeThemeId}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving theme..." : "Save website theme"}
      </button>
    </form>
  );
}
