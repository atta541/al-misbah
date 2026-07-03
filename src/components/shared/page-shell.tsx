type PageShellProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-base leading-7 text-zinc-600">{description}</p>
        ) : null}
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
