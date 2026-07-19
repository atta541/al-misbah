import { WebsiteNavbar } from "@/components/website/navbar";
import { projectService, siteSettingsService } from "@/services";

export async function WebsiteNavbarServer() {
  const [settings, projects] = await Promise.all([
    siteSettingsService.getOrCreate(),
    projectService.listForNav(),
  ]);

  return (
    <WebsiteNavbar
      settings={{
        websiteName: settings.websiteName,
        tagline: settings.tagline,
        logoUrl: settings.logoUrl,
        email: settings.email,
        address: settings.address,
        facebook: settings.facebook,
        instagram: settings.instagram,
        youtube: settings.youtube,
      }}
      projects={projects}
    />
  );
}
