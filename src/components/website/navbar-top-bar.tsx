import { Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import type { NavbarSettings } from "@/components/website/navbar-types";

type NavbarTopBarProps = {
  settings: NavbarSettings;
};

const fallbackEmail = "info@almisbah.org";
const fallbackAddress = "Lahore, Punjab";

export function NavbarTopBar({ settings }: NavbarTopBarProps) {
  const email = settings.email || fallbackEmail;
  const address = settings.address || fallbackAddress;

  const socialLinks = [
    { href: settings.facebook, label: "Facebook", icon: FaFacebook },
    { href: settings.instagram, label: "Instagram", icon: FaInstagram },
    { href: settings.youtube, label: "YouTube", icon: FaYoutube },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));

  return (
    <div className="flex min-h-[var(--nav-top-bar-height)] items-center bg-accent pb-[var(--nav-main-overlap)] text-accent-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 sm:text-sm">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 transition hover:opacity-80"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span>{email}</span>
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{address}</span>
          </span>
        </div>

        {socialLinks.length > 0 ? (
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition hover:bg-black/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
