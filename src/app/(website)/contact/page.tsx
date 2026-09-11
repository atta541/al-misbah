import { PageShell } from "@/components/shared/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Al-Misbah Institute in Lahore, Pakistan. Reach our team about donations, project sponsorship, partnerships, or volunteer support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Contact form will submit to ContactMessage via server actions."
    />
  );
}
