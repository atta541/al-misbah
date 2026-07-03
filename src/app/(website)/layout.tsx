import { Suspense } from "react";
import { WebsiteFooter } from "@/components/website/header-footer";
import { NavbarFallback } from "@/components/website/navbar-fallback";
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
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
