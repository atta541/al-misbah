import { websiteNavItems } from "@/components/website/nav-config";

export function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 animate-pulse">
      <div className="h-10 bg-accent/40" />
      <div className="px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl rounded-bl-[1.75rem] rounded-tr-[1.75rem] bg-brand-dark/20 px-4 py-4">
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
