import { WebsiteFooter, WebsiteHeader } from "@/components/website/header-footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebsiteHeader />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </>
  );
}
