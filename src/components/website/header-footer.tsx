import Link from "next/link";
import { websiteNavItems } from "@/components/website/nav-config";
import { websiteRoutes } from "@/lib/routes";

export function WebsiteFooter() {
  return (
    <footer className="mt-auto bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-lg font-bold text-white">Al-Misbah Center</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-footer-muted">
              A non-profit organization dedicated to humanitarian work, community
              support, and lasting positive change.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {websiteNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-footer-muted transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Legal
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link
                href={websiteRoutes.privacyPolicy}
                className="text-footer-muted transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href={websiteRoutes.terms}
                className="text-footer-muted transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-footer-muted">
          © {new Date().getFullYear()} Al-Misbah Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
