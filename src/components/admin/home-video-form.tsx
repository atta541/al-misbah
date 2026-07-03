"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  removeHomeVideo,
  saveHomeVideo,
  type HomeVideoActionState,
} from "@/actions/home-video";
import {
  HOME_VIDEO_SPECS,
  HOME_VIDEO_UPLOAD_HINT,
} from "@/lib/home-video";
import type { HomeVideo } from "@/types";

type HomeVideoFormProps = {
  video: HomeVideo | null;
};

const initialState: HomeVideoActionState = {};

async function validateVideoDuration(file: File): Promise<string | null> {
  if (file.size > HOME_VIDEO_SPECS.maxSizeBytes) {
    return `Video must be ${HOME_VIDEO_SPECS.maxSizeMB}MB or smaller.`;
  }

  if (!HOME_VIDEO_SPECS.allowedMimeTypes.includes(
    file.type as (typeof HOME_VIDEO_SPECS.allowedMimeTypes)[number],
  )) {
    return "Only MP4 or WebM videos are allowed.";
  }

  return new Promise((resolve) => {
    const element = document.createElement("video");
    element.preload = "metadata";

    element.onloadedmetadata = () => {
      URL.revokeObjectURL(element.src);

      if (element.duration > HOME_VIDEO_SPECS.maxDurationSeconds) {
        resolve(`Video must be ${HOME_VIDEO_SPECS.maxDurationLabel} or shorter.`);
        return;
      }

      resolve(null);
    };

    element.onerror = () => {
      URL.revokeObjectURL(element.src);
      resolve(null);
    };

    element.src = URL.createObjectURL(file);
  });
}

export function HomeVideoForm({ video }: HomeVideoFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    saveHomeVideo,
    initialState,
  );
  const [deleteState, deleteAction, isDeleting] = useActionState(
    removeHomeVideo,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    video?.videoUrl ?? null,
  );
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (state.success || deleteState.success) {
      setClientError(null);
      router.refresh();
    }
  }, [state.success, deleteState.success, router]);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Field
              label="Title"
              name="title"
              defaultValue={video?.title}
              error={state.fieldErrors?.title?.[0]}
              required
            />
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={video?.description ?? ""}
                placeholder="Short introduction shown beside the video on the homepage."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              {state.fieldErrors?.description?.[0] ? (
                <p className="text-sm text-red-600">
                  {state.fieldErrors.description[0]}
                </p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Highlight badge 1"
                name="highlightOne"
                defaultValue={video?.highlightOne ?? ""}
                placeholder="e.g. 15 Years"
                error={state.fieldErrors?.highlightOne?.[0]}
              />
              <Field
                label="Highlight badge 2"
                name="highlightTwo"
                defaultValue={video?.highlightTwo ?? ""}
                placeholder="e.g. UN SDGs 2, 3, 4 & 6"
                error={state.fieldErrors?.highlightTwo?.[0]}
              />
            </div>
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={video?.isActive ?? true}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Show this video on the homepage
            </label>
          </div>

          <div className="space-y-3">
            <label htmlFor="video" className="text-sm font-medium text-slate-700">
              Video file {video ? "(replace optional)" : "*"}
            </label>
            <input
              id="video"
              name="video"
              type="file"
              accept={HOME_VIDEO_SPECS.allowedMimeTypes.join(",")}
              className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                setClientError(null);

                if (!file) {
                  setPreviewUrl(video?.videoUrl ?? null);
                  return;
                }

                const validationError = await validateVideoDuration(file);
                if (validationError) {
                  setClientError(validationError);
                  event.target.value = "";
                  setPreviewUrl(video?.videoUrl ?? null);
                  return;
                }

                setPreviewUrl(URL.createObjectURL(file));
              }}
              required={!video}
            />
            {video ? (
              <>
                <input type="hidden" name="videoUrl" value={video.videoUrl} />
                <input
                  type="hidden"
                  name="videoPublicId"
                  value={video.videoPublicId ?? ""}
                />
                <input
                  type="hidden"
                  name="thumbnailUrl"
                  value={video.thumbnailUrl ?? ""}
                />
              </>
            ) : null}
            <p className="text-xs text-slate-500">{HOME_VIDEO_UPLOAD_HINT}</p>
            {previewUrl ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
                <video
                  src={previewUrl}
                  controls
                  preload="metadata"
                  poster={video?.thumbnailUrl ?? undefined}
                  className="aspect-video w-full object-contain"
                />
              </div>
            ) : null}
          </div>
        </div>

        {clientError || state.error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {clientError ?? state.error}
          </p>
        ) : null}

        {state.success ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Homepage video saved successfully.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending || Boolean(clientError)}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : video ? "Update video" : "Save video"}
        </button>
      </form>

      {video ? (
        <form action={deleteAction} className="border-t border-slate-200 pt-6">
          {deleteState.error ? (
            <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {deleteState.error}
            </p>
          ) : null}
          {deleteState.success ? (
            <p className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Homepage video removed.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isDeleting}
            className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
          >
            {isDeleting ? "Removing..." : "Remove video from homepage"}
          </button>
        </form>
      ) : null}
    </div>
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
