import { PageShell } from "@/components/shared/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Al-Misbah Institute collects, uses, and protects personal information when you donate, contact us, or use our website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="Content will load from the StaticPage model (slug: privacy-policy)."
    />
  );
}
