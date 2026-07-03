import type { HomeVideo } from "@/types";

type HomeVideoSectionProps = {
  video: HomeVideo | null;
};

function HighlightPill({
  children,
  accent,
}: {
  children: string;
  accent?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium",
        accent
          ? "bg-white/10 text-accent"
          : "bg-white/15 text-white",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function HomeVideoSection({ video }: HomeVideoSectionProps) {
  if (!video) {
    return null;
  }

  const highlights = [video.highlightOne, video.highlightTwo].filter(
    (value): value is string => Boolean(value?.trim()),
  );

  return (
    <section className="border-t border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0">
          <div className="relative z-10 shrink-0 lg:w-[46%] lg:pr-0">
            <div className="overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
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
          </div>

          <div className="relative flex flex-1 items-center lg:-ml-10 lg:pl-16">
            <div className="w-full rounded-2xl bg-brand-dark px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[20rem] lg:rounded-bl-none lg:rounded-tl-none lg:rounded-tr-[2rem] lg:rounded-br-[2rem] lg:px-10 lg:py-12">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                {video.title}
              </h2>

              {video.description ? (
                <p className="mt-5 text-sm leading-7 text-white/90 sm:text-[15px] sm:leading-8">
                  {video.description}
                </p>
              ) : null}

              {highlights.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {highlights.map((label, index) => (
                    <HighlightPill key={label} accent={index === 1}>
                      {label}
                    </HighlightPill>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
