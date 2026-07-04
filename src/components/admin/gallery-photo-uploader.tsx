"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  deleteGalleryImage,
  getGalleryImageUploadSignature,
  registerGalleryImages,
} from "@/actions/gallery";
import { uploadImagesDirectToCloudinary } from "@/lib/gallery-upload-client";
import type { GalleryImage } from "@/types";

type GalleryPhotoUploaderProps = {
  collectionId: string;
  images: GalleryImage[];
};

export function GalleryPhotoUploader({
  collectionId,
  images,
}: GalleryPhotoUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleFilesSelected(fileList: FileList | null) {
    if (!fileList?.length || isUploading) return;

    const files = Array.from(fileList);
    setError(null);
    setSuccess(null);
    setIsUploading(true);
    setProgress({ done: 0, total: files.length });

    try {
      const uploads = await uploadImagesDirectToCloudinary(
        files,
        () => getGalleryImageUploadSignature(collectionId),
        (done, total) => setProgress({ done, total }),
      );

      const result = await registerGalleryImages(
        collectionId,
        uploads.map((upload) => ({
          imageUrl: upload.secure_url,
          imagePublicId: upload.public_id,
          width: upload.width,
          height: upload.height,
        })),
      );

      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess(
        `${files.length} photo${files.length === 1 ? "" : "s"} uploaded successfully.`,
      );
      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload photos.",
      );
    } finally {
      setIsUploading(false);
      setProgress({ done: 0, total: 0 });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label htmlFor="gallery-direct" className="text-sm font-medium text-slate-700">
          Add gallery photos
        </label>
        <input
          ref={inputRef}
          id="gallery-direct"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          disabled={isUploading}
          className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 disabled:opacity-60"
          onChange={(event) => void handleFilesSelected(event.target.files)}
        />
        <p className="text-xs text-slate-500">
          Photos upload directly to Cloudinary from your browser — much faster
          than saving through the server.
        </p>
      </div>

      {isUploading ? (
        <div className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-4">
          <p className="text-sm font-medium text-slate-800">
            Uploading {progress.done} of {progress.total} photos…
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{
                width:
                  progress.total > 0
                    ? `${Math.round((progress.done / progress.total) * 100)}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </p>
      ) : null}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={image.imageUrl}
                  alt={image.caption ?? "Gallery image"}
                  fill
                  sizes="(max-width: 1024px) 50vw, 200px"
                  className="object-cover"
                />
              </div>
              <form
                action={deleteGalleryImage.bind(null, image.id)}
                className="border-t border-slate-100 p-2"
              >
                <button
                  type="submit"
                  className="w-full rounded-lg border border-red-200 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
          No photos in this collection yet.
        </p>
      )}
    </div>
  );
}
