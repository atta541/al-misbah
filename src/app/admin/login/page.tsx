import { PageShell } from "@/components/shared/page-shell";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <PageShell
          title="Admin Login"
          description="Authentication for the Admin model will be added here."
        />
      </div>
    </div>
  );
}
