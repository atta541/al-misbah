import { HOME_VIDEO_SPECS } from "@/lib/home-video";
import type { SignedUploadParams } from "@/lib/gallery-upload-client";

export type CloudinaryDirectVideoUploadResult = {
  secure_url: string;
  public_id: string;
  duration?: number;
};

export function buildHomeVideoThumbnailUrl(
  cloudName: string,
  publicId: string,
) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/c_fill,g_auto,h_720,w_1280/${publicId}.jpg`;
}

export function validateHomeVideoFile(file: File) {
  if (
    !HOME_VIDEO_SPECS.allowedMimeTypes.includes(
      file.type as (typeof HOME_VIDEO_SPECS.allowedMimeTypes)[number],
    )
  ) {
    throw new Error("Only MP4 or WebM videos are allowed.");
  }

  if (file.size > HOME_VIDEO_SPECS.maxSizeBytes) {
    throw new Error(`Video must be ${HOME_VIDEO_SPECS.maxSizeMB}MB or smaller.`);
  }
}

export async function uploadVideoDirectToCloudinary(
  file: File,
  params: SignedUploadParams,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryDirectVideoUploadResult> {
  validateHomeVideoFile(file);

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", params.apiKey);
  body.append("timestamp", String(params.timestamp));
  body.append("signature", params.signature);
  body.append("folder", params.folder);

  const result = await new Promise<CloudinaryDirectVideoUploadResult>(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${params.cloudName}/video/upload`,
      );

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable || !onProgress) return;
        onProgress(Math.round((event.loaded / event.total) * 100));
      };

      xhr.onload = () => {
        let payload: CloudinaryDirectVideoUploadResult & {
          error?: { message?: string };
        };

        try {
          payload = JSON.parse(xhr.responseText) as typeof payload;
        } catch {
          reject(new Error("Cloudinary returned an invalid response."));
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(
            new Error(payload.error?.message ?? "Failed to upload video."),
          );
          return;
        }

        resolve(payload);
      };

      xhr.onerror = () => reject(new Error("Network error while uploading video."));
      xhr.send(body);
    },
  );

  if (
    typeof result.duration === "number" &&
    result.duration > HOME_VIDEO_SPECS.maxDurationSeconds
  ) {
    throw new Error(
      `Video must be ${HOME_VIDEO_SPECS.maxDurationLabel} or shorter.`,
    );
  }

  return result;
}
