import { PageShell } from "@/components/shared/page-shell";
import { getSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getSession();

  return (
    <PageShell
      title="Dashboard"
      description={
        session
          ? `Welcome back, ${session.fullName}. Manage projects, messages, and site content from here.`
          : "Overview of projects, messages, and site activity."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Hero slides",
          "Projects",
          "Gallery",
          "Static pages",
          "Site settings",
          "Contact messages",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 shadow-sm"
          >
            {item} management coming next.
          </div>
        ))}
      </div>
    </PageShell>
  );
}
