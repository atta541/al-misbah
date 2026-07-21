import { v2 as cloudinary } from "cloudinary";
import { HOME_VIDEO_SPECS } from "@/lib/home-video";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const ALLOWED_VIDEO_TYPES = new Set<string>(HOME_VIDEO_SPECS.allowedMimeTypes);

function getHeroFolder() {
  return process.env.CLOUDINARY_FOLDER ?? "almisbah/hero";
}

function getHomeVideoFolder() {
  return process.env.CLOUDINARY_VIDEO_FOLDER ?? "almisbah/home-video";
}

export function getHomeVideoCloudinaryFolder() {
  return getHomeVideoFolder();
}

function ensureCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export type UploadedImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
};

export type UploadedVideo = {
  url: string;
  publicId: string;
  thumbnailUrl: string;
  durationSeconds: number;
};

function buildVideoThumbnailUrl(publicId: string) {
  ensureCloudinaryConfig();

  return cloudinary.url(publicId, {
    resource_type: "video",
    format: "jpg",
    secure: true,
    transformation: [
      { width: 1280, height: 720, crop: "fill", gravity: "auto" },
    ],
  });
}

function getProjectBaseFolder() {
  return process.env.CLOUDINARY_PROJECT_FOLDER ?? "almisbah/projects";
}

function getGalleryBaseFolder() {
  return process.env.CLOUDINARY_GALLERY_FOLDER ?? "almisbah/gallery";
}

export function getGalleryCloudinaryFolder(slug: string, type: "cover" | "images") {
  return `${getGalleryBaseFolder()}/${slug}/${type}`;
}

export function getProjectCloudinaryFolder(slug: string, type: "featured" | "gallery") {
  return `${getProjectBaseFolder()}/${slug}/${type}`;
}

async function uploadImageToFolder(
  file: File,
  folder: string,
): Promise<UploadedImage> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, or AVIF images are allowed.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image must be 5MB or smaller.");
  }

  ensureCloudinaryConfig();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<UploadedImage>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        unique_filename: true,
        overwrite: false,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          width: uploadResult.width,
          height: uploadResult.height,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function uploadProjectFeaturedImage(file: File, slug: string) {
  return uploadImageToFolder(file, getProjectCloudinaryFolder(slug, "featured"));
}

export async function uploadProjectGalleryImage(file: File, slug: string) {
  return uploadImageToFolder(file, getProjectCloudinaryFolder(slug, "gallery"));
}

export async function uploadGalleryCoverImage(file: File, slug: string) {
  return uploadImageToFolder(file, getGalleryCloudinaryFolder(slug, "cover"));
}

export async function uploadGalleryImage(file: File, slug: string) {
  return uploadImageToFolder(file, getGalleryCloudinaryFolder(slug, "images"));
}

const DEFAULT_UPLOAD_CONCURRENCY = 4;

export async function uploadFilesConcurrent<T>(
  items: T[],
  upload: (item: T) => Promise<UploadedImage>,
  concurrency = DEFAULT_UPLOAD_CONCURRENCY,
): Promise<UploadedImage[]> {
  if (items.length === 0) return [];

  const results = new Array<UploadedImage>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await upload(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, items.length) },
      () => worker(),
    ),
  );

  return results;
}

export async function uploadHeroImage(file: File): Promise<UploadedImage> {
  return uploadImageToFolder(file, getHeroFolder());
}

export async function uploadHomeVideo(file: File): Promise<UploadedVideo> {
  if (!ALLOWED_VIDEO_TYPES.has(file.type)) {
    throw new Error("Only MP4 or WebM videos are allowed.");
  }

  if (file.size > HOME_VIDEO_SPECS.maxSizeBytes) {
    throw new Error(`Video must be ${HOME_VIDEO_SPECS.maxSizeMB}MB or smaller.`);
  }

  ensureCloudinaryConfig();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadedVideo>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: getHomeVideoFolder(),
        resource_type: "video",
        unique_filename: true,
        overwrite: false,
      },
      async (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary video upload failed."));
          return;
        }

        const durationSeconds = uploadResult.duration ?? 0;

        if (durationSeconds > HOME_VIDEO_SPECS.maxDurationSeconds) {
          try {
            await cloudinary.uploader.destroy(uploadResult.public_id, {
              resource_type: "video",
              invalidate: true,
            });
          } catch {
            // Best-effort cleanup after rejected upload.
          }

          reject(
            new Error(
              `Video must be ${HOME_VIDEO_SPECS.maxDurationLabel} or shorter.`,
            ),
          );
          return;
        }

        resolve({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          thumbnailUrl: buildVideoThumbnailUrl(uploadResult.public_id),
          durationSeconds,
        });
      },
    );

    stream.end(buffer);
  });

  return result;
}

import type { SignedUploadParams } from "@/lib/gallery-upload-client";

export function createSignedUploadParams(folder: string): SignedUploadParams {
  ensureCloudinaryConfig();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured.");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    apiSecret,
  );

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
  };
}

export async function deleteCloudinaryImage(publicId?: string | null) {
  if (!publicId) {
    return;
  }

  ensureCloudinaryConfig();

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });
}

export async function deleteCloudinaryVideo(publicId?: string | null) {
  if (!publicId) {
    return;
  }

  ensureCloudinaryConfig();

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
    invalidate: true,
  });
}
