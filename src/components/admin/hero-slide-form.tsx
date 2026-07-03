"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import {
  createHeroSlide,
  updateHeroSlide,
  type HeroActionState,
} from "@/actions/hero";
import type { HeroSlide } from "@/types";
import {
  HERO_IMAGE_RECOMMENDATION,
  HERO_IMAGE_SPECS,
  heroButtonLinkOptions,
  isHeroButtonLink,
} from "@/lib/hero";
import { websiteRoutes } from "@/lib/routes";

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
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Field
            label="Title"
            name="title"
            defaultValue={slide?.title}
            error={state.fieldErrors?.title?.[0]}
            required
          />
          <Field
            label="Subtitle / Eyebrow"
            name="subtitle"
            defaultValue={slide?.subtitle ?? ""}
            error={state.fieldErrors?.subtitle?.[0]}
          />
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={slide?.description ?? ""}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            {state.fieldErrors?.description?.[0] ? (
              <p className="text-sm text-red-600">{state.fieldErrors.description[0]}</p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Button text"
              name="buttonText"
              defaultValue={slide?.buttonText ?? ""}
              error={state.fieldErrors?.buttonText?.[0]}
            />
            <div className="space-y-2">
              <label htmlFor="buttonLink" className="text-sm font-medium text-slate-700">
                Button link
              </label>
              <select
                id="buttonLink"
                name="buttonLink"
                defaultValue={
                  isHeroButtonLink(slide?.buttonLink)
                    ? (slide?.buttonLink ?? websiteRoutes.contact)
                    : websiteRoutes.contact
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {heroButtonLinkOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {state.fieldErrors?.buttonLink?.[0] ? (
                <p className="text-sm text-red-600">{state.fieldErrors.buttonLink[0]}</p>
              ) : null}
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={slide?.isActive ?? true}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Show this slide on the homepage
          </label>
        </div>

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
            {HERO_IMAGE_SPECS.minimum.width} × {HERO_IMAGE_SPECS.minimum.height} px.
            {HERO_IMAGE_SPECS.formats}. Max {HERO_IMAGE_SPECS.maxSizeMB}MB. Uploaded to
            Cloudinary with auto optimization.
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
      </div>

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
            ? "Create hero slide"
            : "Update hero slide"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  error,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
