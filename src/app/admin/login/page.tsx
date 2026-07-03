import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/auth";
import { adminRoutes } from "@/lib/routes";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect(adminRoutes.dashboard);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm text-zinc-500">Al-Misbah Center</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to manage website content.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
