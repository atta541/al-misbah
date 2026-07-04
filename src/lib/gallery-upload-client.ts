export type SignedUploadParams = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
};

export type CloudinaryDirectUploadResult = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
};

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const UPLOAD_CONCURRENCY = 6;

export function validateGalleryImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(`${file.name}: only JPG, PNG, WEBP, or AVIF allowed.`);
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`${file.name}: must be 5MB or smaller.`);
  }
}

export async function uploadImageDirectToCloudinary(
  file: File,
  params: SignedUploadParams,
): Promise<CloudinaryDirectUploadResult> {
  validateGalleryImageFile(file);

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", params.apiKey);
  body.append("timestamp", String(params.timestamp));
  body.append("signature", params.signature);
  body.append("folder", params.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`,
    { method: "POST", body },
  );

  const payload = (await response.json()) as CloudinaryDirectUploadResult & {
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Failed to upload ${file.name}`);
  }

  return payload;
}

export async function uploadImagesDirectToCloudinary(
  files: File[],
  getUploadParams: () => Promise<SignedUploadParams>,
  onProgress?: (completed: number, total: number) => void,
) {
  const results: CloudinaryDirectUploadResult[] = new Array(files.length);
  let nextIndex = 0;
  let completed = 0;
  let uploadParams = await getUploadParams();

  async function worker() {
    while (nextIndex < files.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex > 0 && currentIndex % 20 === 0) {
        uploadParams = await getUploadParams();
      }

      results[currentIndex] = await uploadImageDirectToCloudinary(
        files[currentIndex],
        uploadParams,
      );

      completed += 1;
      onProgress?.(completed, files.length);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(UPLOAD_CONCURRENCY, files.length) },
      () => worker(),
    ),
  );

  return results;
}
