/** Homepage introduction video constraints. */
export const HOME_VIDEO_SPECS = {
  maxDurationSeconds: 120,
  maxDurationLabel: "2 minutes",
  maxSizeMB: 100,
  maxSizeBytes: 100 * 1024 * 1024,
  formats: "MP4 or WebM",
  allowedMimeTypes: ["video/mp4", "video/webm"] as const,
} as const;

export const HOME_VIDEO_UPLOAD_HINT = `Max ${HOME_VIDEO_SPECS.maxDurationLabel}, up to ${HOME_VIDEO_SPECS.maxSizeMB}MB. ${HOME_VIDEO_SPECS.formats} only. Uploads go directly to Cloudinary.`;
