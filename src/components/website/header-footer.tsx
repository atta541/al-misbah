import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { websiteNavItems } from "@/components/website/nav-config";
import { websiteRoutes } from "@/lib/routes";

export type FooterSettings = {
  websiteName: string;
  tagline?: string | null;
  logoUrl?: string | null;
  footerDescription?: string | null;
  copyrightText?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
};

type WebsiteFooterProps = {
  settings?: FooterSettings;
};

const fallbackDescription =
  "Transform lives with one act of kindness — nurturing communities through humanitarian aid, education, and serving humanity with compassion and charity.";

export function WebsiteFooter({ settings }: WebsiteFooterProps) {
  const websiteName = settings?.websiteName || "Al-Misbah Center";
  const description =
    settings?.footerDescription || settings?.tagline || fallbackDescription;
  const email = settings?.email || "info@almisbah.org";
  const phone = settings?.phone;
  const whatsapp = settings?.whatsapp;
  const address = settings?.address || "Lahore, Punjab, Pakistan";
  const year = new Date().getFullYear();
  const copyright =
    settings?.copyrightText ||
    `© ${year}, ${websiteName} | All Rights Reserved`;

  const quickLinks = [
    ...websiteNavItems,
    { href: websiteRoutes.privacyPolicy, label: "Privacy Policy" },
    { href: websiteRoutes.terms, label: "Terms & Conditions" },
  ];

  const socialLinks = [
    { href: settings?.facebook, label: "Facebook", icon: FaFacebook },
    { href: settings?.instagram, label: "Instagram", icon: FaInstagram },
    { href: settings?.youtube, label: "YouTube", icon: FaYoutube },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));

  return (
    <footer className="mt-auto bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-sm">
            <Link href={websiteRoutes.home} className="inline-flex items-center gap-3">
              {settings?.logoUrl ? (
                <Image
                  src={settings.logoUrl}
                  alt={websiteName}
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl font-bold tracking-tight text-white">
                  {websiteName}
                </span>
              )}
            </Link>
            <p className="mt-5 text-sm leading-7 text-footer-muted">
              {description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-footer-muted transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span>{email}</span>
                </a>
              </li>
              {phone ? (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span>{phone}</span>
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                  >
                    <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span>{whatsapp}</span>
                  </a>
                </li>
              ) : null}
              <li className="inline-flex items-start gap-3 text-sm text-footer-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{address}</span>
              </li>
            </ul>

            {socialLinks.length > 0 ? (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition hover:bg-accent-light"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-accent px-4 py-3.5 text-center text-sm font-medium text-accent-foreground sm:px-6">
        {copyright}
      </div>
    </footer>
  );
}
