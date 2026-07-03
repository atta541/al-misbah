import { PageShell } from "@/components/shared/page-shell";
import { HomeHeroSection } from "@/components/website/home-hero-section";
import { heroService } from "@/services/hero.service";

// ISR: homepage revalidates every hour; admin updates also trigger on-demand revalidation.
export const revalidate = 3600;

export default async function HomePage() {
  const slides = await heroService.listActive();

  return (
    <>
      <HomeHeroSection slides={slides} />

      <PageShell
        title="What we are building"
        description="Homepage sections will connect to your database — featured projects and introduction video."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {["Featured projects", "Introduction video", "Impact highlights"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted shadow-sm"
              >
                {item} section
              </div>
            ),
          )}
        </div>
      </PageShell>
    </>
  );
}
