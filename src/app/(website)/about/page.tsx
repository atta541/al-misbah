import { AboutPageContent } from "@/components/website/about-page-content";
import { aboutPageContent } from "@/content/about";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";

export const metadata = {
  title: `About | Al-Misbah Center`,
  description: aboutPageContent.lead,
};

export default function AboutPage() {
  return (
    <section className={`bg-white pb-16 sm:pb-24 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-[90rem] px-3 sm:px-5 lg:px-6">
        <AboutPageContent />
      </div>
    </section>
  );
}
