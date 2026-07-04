import type { HomeVideo } from "@/types";

type HomeVideoSectionProps = {
  video: HomeVideo | null;
};

export function HomeVideoSection({ video }: HomeVideoSectionProps) {
  if (!video) {
    return null;
  }

  const highlights = [video.highlightOne, video.highlightTwo].filter(
    (value): value is string => Boolean(value?.trim()),
  );

  return (
    <section className="border-t border-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-[1.75rem] bg-black shadow-[0_28px_60px_-28px_rgba(15,92,76,0.35)]">
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.thumbnailUrl ?? undefined}
              className="aspect-video w-full object-cover"
            >
              <source src={video.videoUrl} type="video/mp4" />
              <source src={video.videoUrl} type="video/webm" />
              Your browser does not support embedded videos.
            </video>
          </div>

          <div className="max-w-xl lg:max-w-none">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Our story
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {video.title}
            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-accent" />

            {video.description ? (
              <p className="mt-6 text-base leading-8 text-muted sm:text-[17px]">
                {video.description}
              </p>
            ) : null}

            {highlights.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-brand/15 bg-brand/5 px-4 py-2 text-sm font-medium text-brand"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
