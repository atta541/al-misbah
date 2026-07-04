import { NAV_TOP_BAR_SPACER_CLASS } from "@/lib/nav-layout";

type WebsiteMainProps = {
  children: React.ReactNode;
};

export function WebsiteMain({ children }: WebsiteMainProps) {
  return (
    <main className="flex-1">
      <div className={NAV_TOP_BAR_SPACER_CLASS} aria-hidden />
      {children}
    </main>
  );
}
