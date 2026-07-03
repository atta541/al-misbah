type AdminPageShellProps = {
  description?: string;
  children?: React.ReactNode;
};

export function AdminPageShell({
  description,
  children,
}: AdminPageShellProps) {
  return (
    <section className="space-y-6">
      {description ? (
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}
