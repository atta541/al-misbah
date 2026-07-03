import { PageShell } from "@/components/shared/page-shell";

export default function HomePage() {
  return (
    <PageShell
      title="Al-Misbah Center"
      description="Welcome to the NGO website. Hero slides, featured projects, and introduction video will render here."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
          Hero carousel section
        </div>
        <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
          Featured projects section
        </div>
        <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 sm:col-span-2">
          Home introduction video section
        </div>
      </div>
    </PageShell>
  );
}
