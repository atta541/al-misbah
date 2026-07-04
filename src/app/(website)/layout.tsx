import { Suspense } from "react";
import { WebsiteFooter } from "@/components/website/header-footer";
import { NavbarFallback } from "@/components/website/navbar-fallback";
import { WebsiteMain } from "@/components/website/website-main";
import { WebsiteNavbarServer } from "@/components/website/website-navbar-server";
import { DynamicWebsiteTheme } from "@/components/website/dynamic-theme";
import { siteSettingsService } from "@/services";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await siteSettingsService.getOrCreate();

  return (
    <div className="website flex min-h-screen flex-col">
      <DynamicWebsiteTheme themePreset={settings.themePreset} />
      <Suspense fallback={<NavbarFallback />}>
        <WebsiteNavbarServer />
      </Suspense>
      <WebsiteMain>{children}</WebsiteMain>
      <WebsiteFooter
        settings={{
          websiteName: settings.websiteName,
          tagline: settings.tagline,
          logoUrl: settings.logoUrl,
          footerDescription: settings.footerDescription,
          copyrightText: settings.copyrightText,
          email: settings.email,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          address: settings.address,
          facebook: settings.facebook,
          instagram: settings.instagram,
          youtube: settings.youtube,
        }}
      />
    </div>
  );
}
