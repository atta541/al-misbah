import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Smartphone } from "lucide-react";
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
    `© ${year} ${websiteName}. All rights reserved.`;

  const exploreLinks = websiteNavItems;
  const legalLinks = [
    { href: websiteRoutes.privacyPolicy, label: "Privacy Policy" },
    { href: websiteRoutes.terms, label: "Terms & Conditions" },
  ];

  const socialLinks = [
    { href: settings?.facebook, label: "Facebook", icon: FaFacebook },
    { href: settings?.instagram, label: "Instagram", icon: FaInstagram },
    { href: settings?.youtube, label: "YouTube", icon: FaYoutube },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));

  return (
    <footer className="relative mt-auto overflow-hidden bg-footer-bg text-footer-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.04),_transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Stay connected
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Join us in building hope across communities
            </h2>
            <p className="mt-3 text-sm leading-7 text-footer-muted sm:text-base">
              Support a project or reach out — every contribution creates lasting
              change.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={websiteRoutes.projects}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent-light"
            >
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={websiteRoutes.contact}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link
              href={websiteRoutes.home}
              className="inline-flex items-center gap-3"
            >
              {settings?.logoUrl ? (
                <span className="inline-flex rounded-2xl bg-white px-3 py-2 shadow-lg shadow-black/20">
                  <Image
                    src={settings.logoUrl}
                    alt={websiteName}
                    width={140}
                    height={44}
                    className="h-11 w-auto object-contain"
                  />
                </span>
              ) : (
                <span className="text-2xl font-bold tracking-tight text-white">
                  {websiteName}
                </span>
              )}
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-footer-muted">
              {description}
            </p>

            {socialLinks.length > 0 ? (
              <div className="mt-7 flex items-center gap-2.5">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent/50 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-footer-muted transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-accent transition-all group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-footer-muted transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-accent transition-all group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent transition group-hover:bg-accent/15">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="pt-2 leading-5">{email}</span>
                </a>
              </li>
              {phone ? (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="group flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent transition group-hover:bg-accent/15">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="pt-2 leading-5">{phone}</span>
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-sm text-footer-muted transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent transition group-hover:bg-accent/15">
                      <Smartphone className="h-4 w-4" />
                    </span>
                    <span className="pt-2 leading-5">{whatsapp}</span>
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3 text-sm text-footer-muted">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="pt-2 leading-5">{address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs text-footer-muted sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>{copyright}</p>
          <p className="text-white/35">Serving humanity with compassion</p>
        </div>
      </div>
    </footer>
  );
}
