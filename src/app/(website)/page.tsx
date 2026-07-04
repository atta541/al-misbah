import { HomeFeaturedProjectsSection } from "@/components/website/home-featured-projects";
import { HomeGoogleReviewsSection } from "@/components/website/home-google-reviews-section";
import { HomeHeroSection } from "@/components/website/home-hero-section";
import { HomeMissionVisionSection } from "@/components/website/home-mission-vision-section";
import { HomeVideoSection } from "@/components/website/home-video-section";
import { heroService } from "@/services/hero.service";
import { homeVideoService } from "@/services/home-video.service";
import { projectService } from "@/services/project.service";

export const revalidate = 3600;

export default async function HomePage() {
  const [slides, video, featuredProjects] = await Promise.all([
    heroService.listActive(),
    homeVideoService.getActive(),
    projectService.listFeatured(),
  ]);

  return (
    <>
      <HomeHeroSection slides={slides} />
      <HomeVideoSection video={video} />
      <HomeMissionVisionSection />
      <HomeFeaturedProjectsSection projects={featuredProjects} />
      <HomeGoogleReviewsSection />
    </>
  );
}
