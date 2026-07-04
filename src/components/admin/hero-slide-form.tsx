"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import {
  createHeroSlide,
  updateHeroSlide,
  type HeroActionState,
} from "@/actions/hero";
import type { HeroSlide } from "@/types";
import { HERO_IMAGE_RECOMMENDATION, HERO_IMAGE_SPECS } from "@/lib/hero";

type HeroSlideFormProps = {
  mode: "create" | "edit";
  slide?: HeroSlide;
};

const initialState: HeroActionState = {};

export function HeroSlideForm({ mode, slide }: HeroSlideFormProps) {
  const action =
    mode === "create"
      ? createHeroSlide
      : updateHeroSlide.bind(null, slide!.id);

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    slide?.imageUrl ?? null,
  );

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-3">
        <label htmlFor="image" className="text-sm font-medium text-slate-700">
          Hero image {mode === "create" ? "*" : "(replace optional)"}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setPreviewUrl(URL.createObjectURL(file));
            }
          }}
          required={mode === "create"}
        />
        {mode === "edit" ? (
          <>
            <input type="hidden" name="imageUrl" value={slide?.imageUrl ?? ""} />
            <input
              type="hidden"
              name="imagePublicId"
              value={slide?.imagePublicId ?? ""}
            />
          </>
        ) : null}
        <p className="text-xs text-slate-500">
          Recommended size: <strong>{HERO_IMAGE_RECOMMENDATION}</strong>. Minimum{" "}
          {HERO_IMAGE_SPECS.minimum.width} × {HERO_IMAGE_SPECS.minimum.height} px.{" "}
          {HERO_IMAGE_SPECS.formats}. Max {HERO_IMAGE_SPECS.maxSizeMB}MB.
        </p>
        <p className="text-xs text-slate-500">{HERO_IMAGE_SPECS.safeZone}</p>
        {previewUrl ? (
          <div className="relative aspect-[32/15] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={previewUrl}
              alt="Hero preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={slide?.isActive ?? true}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        Show this image on the homepage
      </label>

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {isPending
          ? "Saving..."
          : mode === "create"
            ? "Add hero image"
            : "Update hero image"}
      </button>
    </form>
  );
}
