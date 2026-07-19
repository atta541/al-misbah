"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { updateWebsiteTheme, type ThemeUpdateState } from "@/actions/settings";
import type { WebsiteThemeId } from "@/theme";
import { WEBSITE_THEME_PRESETS, websiteThemePresets } from "@/theme";
import {
  CUSTOM_THEME_FIELDS,
  getDefaultCustomColors,
  hexToRgb,
  normalizeHex,
  parseCustomThemeColors,
  rgbToHex,
  type CustomThemeColors,
} from "@/theme/custom-theme";

type ThemePickerProps = {
  activeThemeId: WebsiteThemeId;
  initialCustomColors?: unknown;
};

function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const rgb = hexToRgb(value) ?? { r: 0, g: 0, b: 0 };

  function setRgb(part: "r" | "g" | "b", next: number) {
    const clamped = Number.isFinite(next) ? next : 0;
    onChange(
      rgbToHex(
        part === "r" ? clamped : rgb.r,
        part === "g" ? clamped : rgb.g,
        part === "b" ? clamped : rgb.b,
      ),
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{hint}</p>
        </div>
        <input
          type="color"
          value={normalizeHex(value) ?? "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 cursor-pointer rounded-md border border-slate-200 bg-white p-1"
          aria-label={`${label} color picker`}
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_repeat(3,minmax(0,4.5rem))]">
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Hex
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              const next = event.target.value;
              onChange(next.startsWith("#") ? next : `#${next}`);
            }}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-sm outline-none focus:border-emerald-500"
            placeholder="#334155"
          />
        </label>
        {(["r", "g", "b"] as const).map((channel) => (
          <label key={channel} className="block">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              {channel.toUpperCase()}
            </span>
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[channel]}
              onChange={(event) => setRgb(channel, Number(event.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-mono text-sm outline-none focus:border-emerald-500"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function ThemePicker({
  activeThemeId,
  initialCustomColors,
}: ThemePickerProps) {
  const defaults = useMemo(() => getDefaultCustomColors(), []);
  const parsedCustom = useMemo(
    () => parseCustomThemeColors(initialCustomColors) ?? defaults,
    [initialCustomColors, defaults],
  );

  const [selectedId, setSelectedId] = useState<WebsiteThemeId>(activeThemeId);
  const [customColors, setCustomColors] =
    useState<CustomThemeColors>(parsedCustom);
  const [state, formAction, isPending] = useActionState<
    ThemeUpdateState | null,
    FormData
  >(updateWebsiteTheme, null);

  useEffect(() => {
    setSelectedId(activeThemeId);
  }, [activeThemeId]);

  useEffect(() => {
    setCustomColors(parsedCustom);
  }, [parsedCustom]);

  const canSave =
    selectedId !== activeThemeId ||
    (selectedId === "custom" &&
      CUSTOM_THEME_FIELDS.some(
        (field) => customColors[field.key] !== parsedCustom[field.key],
      ));

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {WEBSITE_THEME_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedId;
          const isSaved = preset.id === activeThemeId;
          const tokens =
            preset.id === "custom"
              ? null
              : websiteThemePresets[preset.id];

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
                {tokens ? (
                  [
                    tokens.primary,
                    tokens.accent,
                    tokens.background,
                    tokens.footerBg,
                  ].map((color) => (
                    <span
                      key={color}
                      className="h-8 flex-1 rounded-lg border border-black/5"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))
                ) : (
                  [
                    customColors.primary,
                    customColors.accent,
                    customColors.background,
                    customColors.footerBg,
                  ].map((color, index) => (
                    <span
                      key={`${color}-${index}`}
                      className="h-8 flex-1 rounded-lg border border-black/5"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))
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

      {selectedId === "custom" ? (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Custom colors
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Use the color picker, hex code, or RGB values. Related shades
              (lighter/darker) are generated automatically.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {CUSTOM_THEME_FIELDS.map((field) => (
              <div key={field.key}>
                <input
                  type="hidden"
                  name={`custom_${field.key}`}
                  value={customColors[field.key]}
                />
                <ColorField
                  label={field.label}
                  hint={field.hint}
                  value={customColors[field.key]}
                  onChange={(hex) =>
                    setCustomColors((current) => ({
                      ...current,
                      [field.key]: hex,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

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
        disabled={isPending || !canSave}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving theme..." : "Save website theme"}
      </button>
    </form>
  );
}
