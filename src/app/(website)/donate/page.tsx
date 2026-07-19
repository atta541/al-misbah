import { DonatePageContent } from "@/components/website/donate-page-content";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { donatePageContent } from "@/content/donate";

export const metadata = {
  title: `${donatePageContent.title} | Al-Misbah Center`,
  description: donatePageContent.description,
};

export default function DonatePage() {
  return (
    <section className={`bg-white pb-16 sm:pb-24 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DonatePageContent />
      </div>
    </section>
  );
}
