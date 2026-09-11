import { DonatePageContent } from "@/components/website/donate-page-content";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { donatePageContent } from "@/content/donate";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: donatePageContent.title,
  description: donatePageContent.description,
  path: "/donate",
});

export default function DonatePage() {
  return (
    <section className={`bg-white pb-16 sm:pb-24 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DonatePageContent />
      </div>
    </section>
  );
}
