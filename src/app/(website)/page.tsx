import { PageShell } from "@/components/shared/page-shell";
import { HomeHeroSection } from "@/components/website/home-hero-section";
import { HomeMissionVisionSection } from "@/components/website/home-mission-vision-section";
import { HomeVideoSection } from "@/components/website/home-video-section";
import { heroService } from "@/services/hero.service";
import { homeVideoService } from "@/services/home-video.service";

// ISR: homepage revalidates every hour; admin updates also trigger on-demand revalidation.
export const revalidate = 3600;

export default async function HomePage() {
  const [slides, video] = await Promise.all([
    heroService.listActive(),
    homeVideoService.getActive(),
  ]);

  return (
    <>
      <HomeHeroSection slides={slides} />
      <HomeVideoSection video={video} />
      <HomeMissionVisionSection />

      <PageShell
        title="What we are building"
        description="More homepage sections will connect to your database — featured projects and impact highlights."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {["Featured projects", "Impact highlights"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted shadow-sm"
            >
              {item} section
            </div>
          ))}
        </div>
      </PageShell>
    </>
  );
}
