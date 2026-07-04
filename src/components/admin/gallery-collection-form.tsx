"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { GalleryPhotoUploader } from "@/components/admin/gallery-photo-uploader";
import {
  createGalleryCollection,
  updateGalleryCollection,
  type GalleryActionState,
} from "@/actions/gallery";
import { slugify } from "@/lib/slug";
import type { GalleryCollection, GalleryImage } from "@/types";

type GalleryCollectionFormProps = {
  mode: "create" | "edit";
  collection?: GalleryCollection & { images: GalleryImage[] };
};

const initialState: GalleryActionState = {};

export function GalleryCollectionForm({
  mode,
  collection,
}: GalleryCollectionFormProps) {
  const action =
    mode === "create"
      ? createGalleryCollection
      : updateGalleryCollection.bind(null, collection!.id);

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [slug, setSlug] = useState(collection?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(collection?.slug));

  useEffect(() => {
    if (!slugTouched && state.fieldErrors?.slug) {
      setSlugTouched(true);
    }
  }, [slugTouched, state.fieldErrors?.slug]);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Field
              label="Title"
              name="title"
              defaultValue={collection?.title}
              error={state.fieldErrors?.title?.[0]}
              required
              onChange={(value) => {
                if (!slugTouched) {
                  setSlug(slugify(value));
                }
              }}
            />
            <Field
              label="Slug"
              name="slug"
              value={slug}
              error={state.fieldErrors?.slug?.[0]}
              required
              hint="Auto-generated from title, e.g. ramadan-2026"
              onChange={(value) => {
                setSlugTouched(true);
                setSlug(slugify(value));
              }}
            />
            <Field
              label="Description"
              name="description"
              defaultValue={collection?.description ?? ""}
              error={state.fieldErrors?.description?.[0]}
              multiline
              rows={4}
              hint="Short intro shown on the gallery page."
            />
            <Field
              label="Display order"
              name="order"
              type="number"
              defaultValue={String(collection?.order ?? 0)}
              error={state.fieldErrors?.order?.[0]}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="coverImage" className="text-sm font-medium text-slate-700">
                Cover image {mode === "create" ? "(optional)" : "(replace optional)"}
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
              />
              <p className="text-xs text-slate-500">
                Used on collection cards. If empty, the first uploaded photo is used.
              </p>
              {collection?.coverImage ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src={collection.coverImage}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            {mode === "create" ? (
              <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-900">
                <p className="font-medium">Fast save</p>
                <p className="mt-1 text-sky-800">
                  Create the collection first, then add gallery photos on the next
                  screen. Photos upload directly to Cloudinary for maximum speed.
                </p>
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
              ? "Create collection"
              : "Save details"}
        </button>
      </form>

      {mode === "edit" && collection ? (
        <div className="border-t border-slate-200 pt-8">
          <GalleryPhotoUploader
            collectionId={collection.id}
            images={collection.images}
          />
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  value,
  type = "text",
  rows,
  multiline,
  hint,
  error,
  required,
  onChange,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  rows?: number;
  multiline?: boolean;
  hint?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const sharedClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows ?? 4}
          defaultValue={defaultValue}
          required={required}
          className={sharedClass}
          onChange={(event) => onChange?.(event.target.value)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value === undefined ? defaultValue : undefined}
          value={value}
          required={required}
          className={sharedClass}
          onChange={(event) => onChange?.(event.target.value)}
        />
      )}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
