import { websiteNavItems } from "@/components/website/nav-config";
import { NAV_MAIN_POSITION_CLASS } from "@/lib/nav-layout";

export function NavbarFallback() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 animate-pulse">
      <div className="min-h-[var(--nav-top-bar-height)] bg-accent/40 pb-[var(--nav-main-overlap)]" />
      <div className={NAV_MAIN_POSITION_CLASS}>
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 rounded-2xl rounded-bl-[1.75rem] rounded-tr-[1.75rem] bg-brand-dark/20 px-4 py-4">
          <div className="h-16 w-24 rounded-2xl bg-white/60" />
          <div className="hidden flex-1 justify-center gap-3 lg:flex">
            {websiteNavItems.map((item) => (
              <div key={item.href} className="h-4 w-16 rounded bg-white/20" />
            ))}
          </div>
          <div className="h-10 w-28 rounded-xl bg-white/20" />
        </div>
      </div>
    </header>
  );
}
