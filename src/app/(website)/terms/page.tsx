import { PageShell } from "@/components/shared/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Al-Misbah Institute website, donations, project sponsorship, and related services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & Conditions"
      description="Content will load from the StaticPage model (slug: terms)."
    />
  );
}
