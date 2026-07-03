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

export async function uploadHeroImage(file: File): Promise<UploadedImage> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, or AVIF images are allowed.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image must be 5MB or smaller.");
  }

  ensureCloudinaryConfig();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadedImage>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: getHeroFolder(),
        resource_type: "image",
        unique_filename: true,
        overwrite: false,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        });
      },
    );

    stream.end(buffer);
  });

  return result;
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
