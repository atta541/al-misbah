import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";

type PageShellProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section
      className={`mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 ${PAGE_CONTENT_OFFSET_CLASS}`}
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          Al-Misbah Center
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-base leading-7 text-muted">{description}</p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
